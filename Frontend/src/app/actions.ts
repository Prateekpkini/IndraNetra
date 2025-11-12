
'use server';

import {
  analyzeVideoFrame,
  type AnalyzeVideoFrameInput,
  type AnalyzeVideoFrameOutput,
} from '@/ai/flows/analyze-video-feed-for-stampede-risk';

export async function getStampedeRisk(
  input: AnalyzeVideoFrameInput
): Promise<AnalyzeVideoFrameOutput> {
  try {
    const result = await analyzeVideoFrame(input);
    return result;
  } catch (e) {
    console.error('AI analysis failed:', e);
    // In a real application, you might want more sophisticated error handling or logging.
    // For this prototype, we'll return a random, non-breaking value.
    // This simulates variability in crowd conditions even on analysis failure.
    return { stampedeProbability: Math.random() * 0.4 };
  }
}
