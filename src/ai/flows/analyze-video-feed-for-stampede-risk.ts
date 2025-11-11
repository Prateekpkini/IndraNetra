'use server';

/**
 * @fileOverview Analyzes video frames to assess stampede risk using a pre-trained AI model.
 *
 * - analyzeVideoFrame - Analyzes a single video frame and returns a stampede risk probability.
 * - AnalyzeVideoFrameInput - The input type for the analyzeVideoFrame function.
 * - AnalyzeVideoFrameOutput - The return type for the analyzeVideoFrame function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeVideoFrameInputSchema = z.object({
  videoFrameDataUri: z
    .string()
    .describe(
      "A single frame from a video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeVideoFrameInput = z.infer<typeof AnalyzeVideoFrameInputSchema>;

const AnalyzeVideoFrameOutputSchema = z.object({
  stampedeProbability: z
    .number()
    .describe(
      'The probability of a stampede occurring, as a value between 0 and 1.'
    ),
});
export type AnalyzeVideoFrameOutput = z.infer<typeof AnalyzeVideoFrameOutputSchema>;

export async function analyzeVideoFrame(
  input: AnalyzeVideoFrameInput
): Promise<AnalyzeVideoFrameOutput> {
  return analyzeVideoFrameFlow(input);
}

const analyzeVideoFramePrompt = ai.definePrompt({
  name: 'analyzeVideoFramePrompt',
  input: {schema: AnalyzeVideoFrameInputSchema},
  output: {schema: AnalyzeVideoFrameOutputSchema},
  prompt: `You are an AI model trained to detect the risk of stampedes in video frames.

  Analyze the provided video frame and determine the probability of a stampede occurring.
  Return a value between 0 and 1, where 0 indicates no risk and 1 indicates a high risk.

  Video Frame: {{media url=videoFrameDataUri}}
  `, // This uses the media helper function
});

const analyzeVideoFrameFlow = ai.defineFlow(
  {
    name: 'analyzeVideoFrameFlow',
    inputSchema: AnalyzeVideoFrameInputSchema,
    outputSchema: AnalyzeVideoFrameOutputSchema,
  },
  async input => {
    const {output} = await analyzeVideoFramePrompt(input);
    return output!;
  }
);
