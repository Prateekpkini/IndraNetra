'use client';

import Image from 'next/image';
import { Video, Wifi, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VideoFeedProps {
  imageUrl?: string;
  panicLevel: number;
  isAnalyzing: boolean;
}

export function VideoFeed({
  imageUrl,
  panicLevel,
  isAnalyzing,
}: VideoFeedProps) {
  const heatmapOpacity = panicLevel / 150; // Max opacity around 0.66
  const heatmapColor = panicLevel > 75 ? '255, 0, 0' : '255, 165, 0'; // red or orange

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Video className="w-6 h-6" />
          Live Feed - Camera 01
        </CardTitle>
        <div className="flex items-center gap-2">
          {isAnalyzing ? (
            <Badge variant="secondary" className="animate-pulse">
              <Wifi className="w-4 h-4 mr-1 text-accent" /> Analyzing...
            </Badge>
          ) : (
            <Badge variant="secondary">
              <Wifi className="w-4 h-4 mr-1" /> Connected
            </Badge>
          )}
          <Badge variant="destructive" className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
            REC
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 relative overflow-hidden rounded-b-lg">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt="Live video feed of a crowd"
              fill
              className="object-cover"
              data-ai-hint="crowd event"
              priority
            />
            <div
              className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
              style={{
                opacity: heatmapOpacity,
                background: `radial-gradient(circle at center, rgba(${heatmapColor}, 0.5) 0%, rgba(${heatmapColor}, 0) 70%)`,
              }}
              aria-label="Crowd density heatmap"
            />
          </>
        ) : (
          <div className="w-full h-full bg-muted flex flex-col items-center justify-center">
            <WifiOff className="w-16 h-16 text-muted-foreground" />
            <p className="text-muted-foreground mt-4">Video feed unavailable</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
