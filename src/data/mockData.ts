import { AnalysisRecord } from '../types/emotion';

export const MOCK_ANALYSIS_RESULT: AnalysisRecord = {
  id: 'rec_92819',
  timestamp: 'Just now',
  modality: 'combined',
  overallEmotion: {
    isCompound: true,
    name: 'Sad · Happy (Bittersweet Nostalgia)',
    primary: 'sad',
    secondary: 'happy',
    confidence: 0.88,
  },
  signals: {
    face: {
      modality: 'face',
      primaryEmotion: 'happy',
      confidence: 0.69,
      scores: {
        happy: 0.69,
        sad: 0.15,
        angry: 0.02,
        fear: 0.01,
        surprise: 0.08,
        disgust: 0.01,
        neutral: 0.04,
      },
    },
    voice: {
      modality: 'voice',
      primaryEmotion: 'sad',
      confidence: 0.76,
      scores: {
        happy: 0.1,
        sad: 0.76,
        angry: 0.04,
        fear: 0.03,
        surprise: 0.02,
        disgust: 0.01,
        neutral: 0.04,
      },
    },
    text: {
      modality: 'text',
      primaryEmotion: 'sad',
      confidence: 0.72,
      scores: {
        happy: 0.08,
        sad: 0.72,
        angry: 0.05,
        fear: 0.06,
        surprise: 0.02,
        disgust: 0.01,
        neutral: 0.06,
      },
    },
  },
  agreementStatus: 'mixed',
  explainableInsight:
    'Vocal frequency patterns and linguistic sentiment reflect sadness and grief, while micro-facial movements express a warm nostalgic smile. Emotia resolves these conflicting signals into a compound bittersweet emotional state.',
  summary:
    'Emotional divergence detected: Facial cue (Happy smile, 69%) conflicts with Vocal tonality (Sad, 76%) and Textual sentiment (Sad, 72%).',
};

export const MOCK_HISTORY_LIST: AnalysisRecord[] = [
  MOCK_ANALYSIS_RESULT,
  {
    id: 'rec_81231',
    timestamp: '2 hours ago',
    modality: 'face',
    overallEmotion: { isCompound: false, primary: 'happy', confidence: 0.94 },
    agreementStatus: 'agreement',
    explainableInsight:
      'Genuine Duchenne smile detected with high certainty and relaxed ocular markers.',
    summary: 'Positive affective state detected through facial visual analysis.',
  },
  {
    id: 'rec_72891',
    timestamp: 'Yesterday',
    modality: 'voice',
    overallEmotion: { isCompound: false, primary: 'neutral', confidence: 0.89 },
    agreementStatus: 'agreement',
    explainableInsight:
      'Even cadence, standard acoustic pitch distribution with minimal frequency variance.',
    summary: 'Calm, steady communication detected in acoustic waveform.',
  },
  {
    id: 'rec_61042',
    timestamp: '3 days ago',
    modality: 'text',
    overallEmotion: { isCompound: false, primary: 'surprise', confidence: 0.86 },
    agreementStatus: 'agreement',
    explainableInsight:
      'Exclamatory syntax and unexpected semantic orientation indicating astonishment.',
    summary: 'Spontaneous surprise identified from written statement.',
  },
];
