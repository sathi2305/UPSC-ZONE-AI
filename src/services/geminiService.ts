import { curatedCopilotResponses } from '../data/mockData';

export interface ChatApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
  isAiGenerated: boolean;
  modelUsed: string;
}

export interface MainsEvaluationResult {
  score: number;
  wordCount: number;
  introductionFeedback: string;
  bodyDimensions: string[];
  missingDimensions: string[];
  conclusionFeedback: string;
  valueAdditionSuggestions: string[];
  overallAssessment: string;
  isAiGenerated: boolean;
}

export async function sendChatMessage(
  messages: ChatApiMessage[],
  topic?: string,
  stage?: string
): Promise<ChatResponse> {
  const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase().trim() || '';

  try {
    const response = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        topic,
        stage,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reply) {
        return {
          reply: data.reply,
          isAiGenerated: true,
          modelUsed: data.model || 'Gemini 3.8 Flash',
        };
      }
    }
  } catch (err) {
    console.warn('Backend Gemini endpoint unavailable, falling back to curated UPSC repository', err);
  }

  // Graceful smart educational fallback based on curated repository
  for (const [key, val] of Object.entries(curatedCopilotResponses)) {
    if (lastUserMessage.includes(key) || key.includes(lastUserMessage)) {
      return {
        reply: val,
        isAiGenerated: false,
        modelUsed: 'UPSC ZONE Curated Knowledge Base (Demo Mode)',
      };
    }
  }

  // If general question
  const fallbackReply = `### UPSC ZONE Academic Guidance

Thank you for your question on **"${messages[messages.length - 1]?.content}"**.

#### Core Preparation Guidance:
1. **Syllabus Linkage:** Identify whether this topic falls under **Prelims GS 1** or **Mains GS 1/2/3/4**.
2. **Standard Reference Books:**
   - For Polity: *Indian Polity by M. Laxmikanth* & Bare Act.
   - For Economy: *Nitin Singhania / Ramesh Singh* & latest Economic Survey.
   - For Environment: *Shankar IAS / PMFIAS* & DownToEarth.
3. **Structured Framework for Mains Answers:**
   - **Introduction (15%):** Definition, constitutional article, or recent context.
   - **Body (70%):** Multi-dimensional analysis (Political, Economic, Social, Environmental, Administrative). Use point format with subheadings.
   - **Conclusion (15%):** Way forward, committee recommendation (e.g. 2nd ARC, NITI Aayog Strategy @75), or constitutional vision.

*Note: For live real-time AI responses, ensure your Gemini API Key is configured in the environment.*`;

  return {
    reply: fallbackReply,
    isAiGenerated: false,
    modelUsed: 'UPSC ZONE Academic Engine (Demo Mode)',
  };
}

export async function evaluateMainsAnswer(
  question: string,
  syllabusTopic: string,
  answer: string,
  wordLimit: number = 250
): Promise<MainsEvaluationResult> {
  const words = answer.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  try {
    const response = await fetch('/api/gemini/evaluate-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        syllabusTopic,
        answer,
        wordLimit,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.score !== undefined) {
        return {
          ...data,
          isAiGenerated: true,
        };
      }
    }
  } catch (err) {
    console.warn('Backend evaluation unavailable, using rubric evaluation', err);
  }

  // Curated rubric-based assessment
  let score = 5.5;
  if (wordCount >= 180 && wordCount <= 270) score += 1.5;
  if (/article\s*\d+|constitution|commission|amendment/i.test(answer)) score += 1.0;
  if (/however|on the other hand|furthermore|challenges|way forward/i.test(answer)) score += 1.0;
  score = Math.min(score, 9.0);

  return {
    score: Math.round(score * 10) / 10,
    wordCount,
    introductionFeedback: wordCount < 50 
      ? 'Introduction is too brief. Define the primary subject or quote the constitutional article right away.'
      : 'Good start. Ensure the opening paragraph directly addresses the directive verb (e.g. Critically Examine).',
    bodyDimensions: [
      'Constitutional / Legal Framework',
      'Fiscal & Economic Implications',
      'Administrative & Implementation Realities'
    ],
    missingDimensions: [
      'Comparative international precedents or interstate variations',
      'Recent Supreme Court rulings or 15th Finance Commission recommendations'
    ],
    conclusionFeedback: 'Add a forward-looking conclusion aligning with Cooperative Federalism or Vision 2047.',
    valueAdditionSuggestions: [
      'Quote Article 280 (Finance Commission terms) and Article 275 (Grants-in-aid)',
      'Include a small horizontal flow-diagram depicting Vertical vs Horizontal tax devolution',
      'Mention NITI Aayog’s Fiscal Roadmap recommendations'
    ],
    overallAssessment: `Answer shows commendable understanding of the core topic with a word count of ${wordCount} words. Enhancing multi-dimensional subheadings and quoting official reports will push your score into the top percentile.`,
    isAiGenerated: false
  };
}
