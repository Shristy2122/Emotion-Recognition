import { DetailedAnalysisResult } from '../types/emotion';

const STORAGE_KEY = 'emotia_analysis_history_v1';

export const SEED_COMBINED_RESULT: DetailedAnalysisResult = {
  id: 'rec_combined_flagship',
  timestamp: 'Just now',
  createdAt: new Date().toISOString(),
  modality: 'combined',
  primaryEmotion: 'sad',
  secondaryEmotion: 'happy',
  isCompound: true,
  compoundName: 'Sad · Happy',
  confidence: 0.82,
  transcript: "I'm happy today, but I still feel a little sad.",
  distribution: [
    { emotion: 'sad', percentage: 76 },
    { emotion: 'happy', percentage: 69 },
    { emotion: 'neutral', percentage: 12 },
    { emotion: 'surprise', percentage: 8 },
  ],
  signals: {
    face: {
      modality: 'face',
      primaryEmotion: 'sad',
      confidence: 0.76,
      scores: {
        sad: 0.76,
        happy: 0.12,
        neutral: 0.06,
        fear: 0.02,
        angry: 0.02,
        surprise: 0.01,
        disgust: 0.01,
      },
      explanationCue: 'Facial cues indicate a stronger sadness signal with subtle corner eye tension.',
    },
    voice: {
      modality: 'voice',
      primaryEmotion: 'happy',
      confidence: 0.69,
      scores: {
        happy: 0.69,
        sad: 0.15,
        neutral: 0.08,
        surprise: 0.04,
        fear: 0.02,
        angry: 0.01,
        disgust: 0.01,
      },
      explanationCue: 'Vocal tone, pitch variation, and upbeat energy suggest a more positive emotional state.',
    },
    text: {
      modality: 'text',
      primaryEmotion: 'sad',
      confidence: 0.72,
      scores: {
        sad: 0.72,
        happy: 0.16,
        neutral: 0.06,
        fear: 0.03,
        surprise: 0.01,
        angry: 0.01,
        disgust: 0.01,
      },
      explanationCue: 'The transcribed words contain stronger sadness-related emotional nuances ("still feel a little sad").',
    },
  },
  alignment: {
    type: 'conflict',
    headline: 'Your signals tell different stories.',
    description:
      'Face and words suggest sadness, while your voice carries a more positive tone. Emotia recognizes a compound bittersweet state.',
  },
  whyExplanation: {
    faceCue: 'Facial cues indicate a stronger sadness signal.',
    voiceCue: 'Vocal tone and energy suggest a more positive emotional state.',
    textCue: 'The words contain stronger sadness-related emotional cues.',
    aiSynthesis:
      'Your facial expression and words suggest sadness, while your voice carries a more positive emotional tone. Together, these signals suggest a mixed emotional state.',
  },
  timeline: [
    {
      timestamp: '00s',
      seconds: 0,
      overallEmotionLabel: 'Neutral',
      primaryEmotion: 'neutral',
      isCompound: false,
      signals: {
        face: { emotion: 'neutral', confidence: 0.88 },
        voice: { emotion: 'neutral', confidence: 0.85 },
        text: { emotion: 'neutral', confidence: 0.9 },
      },
    },
    {
      timestamp: '10s',
      seconds: 10,
      overallEmotionLabel: 'Happy',
      primaryEmotion: 'happy',
      isCompound: false,
      signals: {
        face: { emotion: 'happy', confidence: 0.78 },
        voice: { emotion: 'happy', confidence: 0.82 },
        text: { emotion: 'happy', confidence: 0.75 },
      },
    },
    {
      timestamp: '20s',
      seconds: 20,
      overallEmotionLabel: 'Sad · Happy (Mixed)',
      primaryEmotion: 'sad',
      secondaryEmotion: 'happy',
      isCompound: true,
      signals: {
        face: { emotion: 'sad', confidence: 0.74 },
        voice: { emotion: 'happy', confidence: 0.7 },
        text: { emotion: 'sad', confidence: 0.71 },
      },
    },
    {
      timestamp: '30s',
      seconds: 30,
      overallEmotionLabel: 'Happy',
      primaryEmotion: 'happy',
      isCompound: false,
      signals: {
        face: { emotion: 'happy', confidence: 0.81 },
        voice: { emotion: 'happy', confidence: 0.79 },
        text: { emotion: 'neutral', confidence: 0.65 },
      },
    },
  ],
};

const INITIAL_HISTORY: DetailedAnalysisResult[] = [
  SEED_COMBINED_RESULT,
  {
    id: 'rec_face_only_1',
    timestamp: 'Today · 10:42 PM',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    modality: 'face',
    primaryEmotion: 'sad',
    isCompound: false,
    confidence: 0.78,
    distribution: [
      { emotion: 'sad', percentage: 78 },
      { emotion: 'happy', percentage: 18 },
      { emotion: 'neutral', percentage: 4 },
    ],
  },
  {
    id: 'rec_voice_only_1',
    timestamp: 'Yesterday · 06:31 PM',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    modality: 'voice',
    primaryEmotion: 'happy',
    isCompound: false,
    confidence: 0.71,
    distribution: [
      { emotion: 'happy', percentage: 71 },
      { emotion: 'sad', percentage: 14 },
      { emotion: 'angry', percentage: 8 },
      { emotion: 'neutral', percentage: 7 },
    ],
  },
  {
    id: 'rec_text_only_1',
    timestamp: 'Sep 13 · 04:15 PM',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    modality: 'text',
    primaryEmotion: 'neutral',
    isCompound: false,
    confidence: 0.86,
    distribution: [
      { emotion: 'neutral', percentage: 86 },
      { emotion: 'happy', percentage: 9 },
      { emotion: 'sad', percentage: 5 },
    ],
  },
];

export const analysisService = {
  // Retrieve history list
  getHistory(): DetailedAnalysisResult[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_HISTORY;
  },

  // Save new result
  saveResult(result: DetailedAnalysisResult): void {
    const history = this.getHistory();
    const updated = [result, ...history.filter((r) => r.id !== result.id)];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  },

  // Clear history
  clearHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  },

  // Get single result by ID
  getResultById(id: string): DetailedAnalysisResult {
    const list = this.getHistory();
    const found = list.find((item) => item.id === id);
    return found || SEED_COMBINED_RESULT;
  },

  // Get current flagship result
  getLatestCombinedResult(): DetailedAnalysisResult {
    return SEED_COMBINED_RESULT;
  },
};
