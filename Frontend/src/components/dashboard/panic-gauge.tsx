'use client';

import { TrendingUp } from 'lucide-react';
import { PolarGrid, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

interface PanicGaugeProps {
  level: number;
}

export function PanicGauge({ level }: PanicGaugeProps) {
  const getRiskColor = (l: number) => {
    if (l > 75) return 'hsl(var(--destructive))';
    if (l > 40) return 'hsl(var(--chart-2))';
    return 'hsl(var(--primary))';
  };

  const getRiskLabel = (l: number) => {
    if (l > 75) return 'High Risk';
    if (l > 40) return 'Moderate Risk';
    return 'Low Risk';
  };

  const chartData = [{ name: 'level', value: level, fill: getRiskColor(level) }];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-2">
        <CardTitle>Panic Level</CardTitle>
        <CardDescription>{getRiskLabel(level)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="relative flex items-center justify-center w-full h-[200px]">
          <ChartContainer config={{}} className="absolute inset-0">
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={-270}
              innerRadius="80%"
              outerRadius="100%"
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="value" background cornerRadius={10} />
            </RadialBarChart>
          </ChartContainer>
          <div className="flex flex-col items-center justify-center">
            <span
              className="text-5xl font-bold"
              style={{ color: getRiskColor(level) }}
            >
              {level}
            </span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pt-8">
        <div className="flex items-center gap-2 font-medium leading-none">
          Updated every 8 seconds <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Real-time video feed analysis
        </div>
      </CardFooter>
    </Card>
  );
}
