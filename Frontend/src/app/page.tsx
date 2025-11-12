'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/dashboard/header';
import { VideoFeed } from '@/components/dashboard/video-feed';
import { PanicGauge } from '@/components/dashboard/panic-gauge';
import { AlertLog, type Alert } from '@/components/dashboard/alert-log';
import { getStampedeRisk } from '@/app/actions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const ALERT_THRESHOLD = 75;

export default function DashboardPage() {
  const { toast } = useToast();
  const [panicLevel, setPanicLevel] = useState(32);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const videoFeedPlaceholder = PlaceHolderImages.find(
    (img) => img.id === 'video-feed-1'
  );
  const videoFeedUrl = videoFeedPlaceholder?.imageUrl;

  const handleUpdateAlertStatus = useCallback((id: number, status: Alert['status']) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, status } : alert
      )
    );
    toast({
      title: 'Alert Updated',
      description: `Alert #${id} status changed to ${status}.`,
    });
  }, [toast]);

  const analyzeFrame = useCallback(async () => {
    if (isAnalyzing || !videoFeedUrl) return;
    setIsAnalyzing(true);

    try {
      const response = await fetch(videoFeedUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        if (!base64data) {
          setIsAnalyzing(false);
          return;
        }

        const result = await getStampedeRisk({ videoFrameDataUri: base64data });

        const newPanicLevel = Math.round(result.stampedeProbability * 100);
        setPanicLevel(newPanicLevel);

        if (newPanicLevel > ALERT_THRESHOLD) {
          const newAlert: Alert = {
            id: new Date().getTime(),
            timestamp: new Date(),
            level: newPanicLevel,
            status: 'New',
          };
          setAlerts((prevAlerts) => [newAlert, ...prevAlerts].slice(0, 10));
          toast({
            variant: 'destructive',
            title: 'High Panic Level Detected!',
            description: `Risk level at ${newPanicLevel}%. Immediate attention required.`,
          });
        }
        setIsAnalyzing(false);
      };
      reader.onerror = () => {
        console.error('FileReader error');
        setIsAnalyzing(false);
      };
    } catch (error) {
      console.error('Analysis failed:', error);
      setPanicLevel(Math.floor(Math.random() * 20)); // Reset to low on error
      setIsAnalyzing(false);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Could not analyze the video frame. Displaying simulated data.',
      });
    }
  }, [isAnalyzing, videoFeedUrl, toast]);

  useEffect(() => {
    // Initial analysis on load
    analyzeFrame();
    const intervalId = setInterval(analyzeFrame, 8000); // Analyze every 8 seconds
    return () => clearInterval(intervalId);
  }, [analyzeFrame]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 overflow-hidden">
        <div className="lg:col-span-2 min-h-0">
          <VideoFeed
            imageUrl={videoFeedUrl}
            panicLevel={panicLevel}
            isAnalyzing={isAnalyzing}
          />
        </div>
        <div className="flex flex-col gap-4 lg:gap-6 min-h-0">
          <PanicGauge level={panicLevel} />
          <div className="flex-1 min-h-0">
            <AlertLog alerts={alerts} onUpdateAlertStatus={handleUpdateAlertStatus} />
          </div>
        </div>
      </main>
    </div>
  );
}
