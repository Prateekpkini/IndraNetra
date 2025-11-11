# **App Name**: IndraView Dashboard

## Core Features:

- Live Video Feed Display: Display a live video feed (or pre-recorded video) on the dashboard.
- Panic Level Gauge: Display a real-time Panic Level gauge (0-100) based on AI analysis of the video feed.
- Crowd Density Heatmap: Overlay a crowd density heatmap on the video feed.
- Alert Log: Maintain a log of alerts triggered when the Panic Level exceeds a threshold; allows administrators of the app to respond with appropriate tools.
- Video Frame Analysis: Backend service which pre-processes each video frame and passes it to the pre-trained AI model for risk analysis, serving as a tool which performs video risk evaluations using multi-column CNN at scale, updating a stampede probability

## Style Guidelines:

- Primary color: Deep Blue (#1A237E), representing authority and safety.
- Background color: Light Gray (#E0E0E0), provides a neutral backdrop for the interface.
- Accent color: Bright Red (#D32F2F), for alerts and critical information, draws the user's attention.
- Body and headline font: 'Inter', a grotesque-style sans-serif for a modern, machined, neutral look.
- Use clear, simple icons to represent different alerts and functions within the dashboard.
- Divide the dashboard into distinct sections for the video feed, Panic Level gauge, heatmap, and alert log.
- Subtle transitions and animations to provide feedback on user interactions and status updates.