import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI:', err);
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// AI Chat Copilot endpoint
app.post('/api/gemini/chat', async (req, res) => {
  const { messages, topic, stage } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  if (!ai) {
    return res.status(503).json({
      error: 'Gemini API is not configured on the server. Falling back to offline engine.',
      offlineMode: true,
    });
  }

  try {
    const lastMessage = messages[messages.length - 1]?.content || '';
    const conversationContext = messages
      .slice(-6)
      .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Aspirant' : 'Mentor'}: ${m.content}`)
      .join('\n');

    const prompt = `You are the Lead Academic AI Mentor for UPSC ZONE AI.
Preparation Context:
- Target Stage: ${stage || 'Prelims & Mains Integrated'}
- Focused Subject: ${topic || 'General Studies'}

Recent Conversation:
${conversationContext}

Latest Question from Aspirant: "${lastMessage}"

Guidelines:
1. Provide an authoritative, structured, and crystal-clear response tailored for UPSC Civil Services examination.
2. Cite constitutional articles, committee recommendations, statutory acts, landmark Supreme Court cases, economic reports, or historical chronology where relevant.
3. Structure with headers, clear bullet points, and high-yield takeaway.
4. Keep the tone inspiring, academically rigorous, and supportive.
5. End with 2 actionable follow-up questions or related syllabus links to test their depth.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are UPSC ZONE AI Mentor, an elite Civil Services exam mentor specialized in UPSC CSE Prelims, Mains GS 1-4, and Essay.',
        temperature: 0.7,
      },
    });

    return res.json({
      reply: response.text || 'Unable to generate response at this time.',
      model: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    return res.status(500).json({
      error: error.message || 'Error communicating with Gemini model',
      offlineMode: true,
    });
  }
});

// Mains Answer Evaluation endpoint
app.post('/api/gemini/evaluate-answer', async (req, res) => {
  const { question, syllabusTopic, answer, wordLimit } = req.body;

  if (!answer || answer.trim().length < 30) {
    return res.status(400).json({ error: 'Answer must contain at least 30 characters' });
  }

  if (!ai) {
    return res.status(503).json({
      error: 'Gemini API key not configured. Using offline rubric evaluation.',
      offlineMode: true,
    });
  }

  try {
    const prompt = `Evaluate the following UPSC Mains descriptive answer strictly on UPSC standard criteria:

Question: "${question}"
Syllabus / Paper: "${syllabusTopic}"
Word Limit: ${wordLimit || 250} words

Aspirant Answer:
"""
${answer}
"""

Please evaluate and return a structured JSON response with:
1. score: number (out of 10)
2. wordCount: estimated number of words
3. introductionFeedback: string (strengths & improvements)
4. bodyDimensions: list of dimensions covered (e.g. Political, Economic, Environmental, International, Constitutional)
5. missingDimensions: list of 2-3 dimensions or government committees/schemes/articles missed
6. conclusionFeedback: string (way forward evaluation)
7. valueAdditionSuggestions: list of 3 specific data points/case laws/schemes to quote
8. overallAssessment: string (2-3 sentences summary)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Gemini answer evaluation error:', error);
    return res.status(500).json({
      error: error.message || 'Evaluation error',
      offlineMode: true,
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`UPSC ZONE AI full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
