import { EmotionType, ModalitySignal, DetailedAnalysisResult } from '../types/emotion';
import { evaluateSignalAlignment, generateExplainableInsight } from '../utils/analysisHelpers';
import { EMOTION_CONFIG } from '../utils/emotionColors';

// Emotion keyword lexicon supporting English and Hindi/Hinglish
const EMOTION_LEXICON: Record<EmotionType, string[]> = {
  happy: [
    'happy', 'smile', 'smiling', 'great', 'awesome', 'good', 'love', 'glad',
    'excited', 'joy', 'joyful', 'wonderful', 'best', 'fantastic', 'laugh',
    'khush', 'khushi', 'badhiya', 'acha', 'mast', 'shandar', 'sukoon', 'muskaan',
    'cheerful', 'delighted', 'pleased', 'positive'
  ],
  sad: [
    'sad', 'unhappy', 'cry', 'crying', 'down', 'depressed', 'grief', 'sorrow',
    'miss', 'lonely', 'bad', 'hurt', 'pain', 'broken', 'lost', 'tears',
    'udaas', 'dukh', 'dard', 'rona', 'chinta', 'afsos', 'tanha', 'pareshan',
    'melancholy', 'regret', 'gloomy'
  ],
  angry: [
    'angry', 'mad', 'furious', 'hate', 'annoyed', 'irritated', 'rage', 'crazy',
    'gussa', 'krodh', 'irritate', 'frustrated', 'shouting', 'temper'
  ],
  fear: [
    'fear', 'afraid', 'scared', 'darr', 'terrified', 'nervous', 'anxious',
    'panic', 'horrified', 'threatened', 'frightened', 'dar'
  ],
  surprise: [
    'surprise', 'surprised', 'wow', 'omg', 'shock', 'shocked', 'amazed',
    'astonished', 'unbelievable', 'arrey', 'kya', 'wonder'
  ],
  disgust: [
    'disgust', 'disgusted', 'gross', 'nasty', 'awful', 'terrible', 'sick', 'cheeh'
  ],
  neutral: [
    'okay', 'fine', 'normal', 'calm', 'regular', 'standard', 'thik', 'sahi',
    'average', 'routine', 'neutral'
  ],
};

/**
 * Real-time text sentiment & emotion extractor
 */
export function analyzeTextInRealTime(text: string): ModalitySignal {
  const clean = text.toLowerCase();
  const words = clean.split(/\s+/);

  const scores: Record<EmotionType, number> = {
    happy: 0.05,
    sad: 0.05,
    angry: 0.02,
    fear: 0.02,
    surprise: 0.03,
    disgust: 0.01,
    neutral: 0.2,
  };

  // Count keyword occurrences
  for (const word of words) {
    for (const [emotion, keywords] of Object.entries(EMOTION_LEXICON) as [EmotionType, string[]][]) {
      if (keywords.some((k) => word.includes(k))) {
        scores[emotion] += 0.35;
      }
    }
  }

  // Find dominant emotion
  let primaryEmotion: EmotionType = 'happy';
  let maxScore = 0;
  let sum = 0;

  for (const [emotion, score] of Object.entries(scores) as [EmotionType, number][]) {
    sum += score;
    if (score > maxScore) {
      maxScore = score;
      primaryEmotion = emotion;
    }
  }

  // Normalize scores between 0 and 1
  for (const key of Object.keys(scores) as EmotionType[]) {
    scores[key] = parseFloat((scores[key] / sum).toFixed(2));
  }

  const confidence = Math.min(0.95, Math.max(0.65, parseFloat(scores[primaryEmotion].toFixed(2))));

  return {
    modality: 'text',
    primaryEmotion,
    confidence,
    scores,
    explanationCue: `Spoken language contains prominent ${EMOTION_CONFIG[primaryEmotion].label.toLowerCase()} phrasing.`,
  };
}

/**
 * Real-time acoustic analysis based on live volume (RMS) and pitch frequency
 */
export function analyzeAcousticsInRealTime(volume: number, pitchHz: number): ModalitySignal {
  let primaryEmotion: EmotionType = 'happy';
  let confidence = 0.78;

  // Higher vocal energy (>0.12) and elevated pitch (>200Hz) indicate happiness / positive excitement
  if (volume > 0.08 && pitchHz > 170) {
    primaryEmotion = 'happy';
    confidence = Math.min(0.92, 0.72 + volume * 0.5);
  } else if (volume > 0.3) {
    // Extremely loud speech indicates anger
    primaryEmotion = 'angry';
    confidence = 0.84;
  } else if (volume < 0.04 && pitchHz < 140) {
    // Very quiet, low frequency voice indicates sadness
    primaryEmotion = 'sad';
    confidence = 0.76;
  } else if (pitchHz > 250) {
    // Sudden high pitch spike indicates surprise
    primaryEmotion = 'surprise';
    confidence = 0.81;
  } else {
    // Standard speaking voice
    primaryEmotion = 'happy';
    confidence = 0.75;
  }

  const scores: Record<EmotionType, number> = {
    happy: 0.1,
    sad: 0.08,
    angry: 0.04,
    fear: 0.03,
    surprise: 0.05,
    disgust: 0.01,
    neutral: 0.09,
  };
  scores[primaryEmotion] = confidence;

  return {
    modality: 'voice',
    primaryEmotion,
    confidence,
    scores,
    explanationCue: `Vocal pitch (${Math.round(pitchHz)} Hz) and acoustic energy reflect a ${EMOTION_CONFIG[primaryEmotion].label.toLowerCase()} state.`,
  };
}

/**
 * Dynamically synthesizes 3 live sensory modalities into an explainable result
 */
export function synthesizeLiveMultimodalSession(
  face: ModalitySignal,
  voice: ModalitySignal,
  text: ModalitySignal,
  transcript: string
): DetailedAnalysisResult {
  const alignment = evaluateSignalAlignment(face, voice, text);
  const whyExplanation = generateExplainableInsight(face, voice, text);

  const isAgreement = face.primaryEmotion === voice.primaryEmotion && voice.primaryEmotion === text.primaryEmotion;

  let primaryEmotion: EmotionType = face.primaryEmotion;
  let secondaryEmotion: EmotionType | undefined = undefined;
  let isCompound = false;
  let compoundName = EMOTION_CONFIG[primaryEmotion].label;

  if (isAgreement) {
    isCompound = false;
    compoundName = EMOTION_CONFIG[primaryEmotion].label;
  } else {
    // Check dominant pair
    isCompound = true;
    if (face.primaryEmotion === text.primaryEmotion) {
      primaryEmotion = face.primaryEmotion;
      secondaryEmotion = voice.primaryEmotion;
    } else {
      primaryEmotion = face.primaryEmotion;
      secondaryEmotion = voice.primaryEmotion;
    }
    compoundName = `${EMOTION_CONFIG[primaryEmotion].label} · ${EMOTION_CONFIG[secondaryEmotion].label}`;
  }

  const avgConfidence = parseFloat(
    ((face.confidence + voice.confidence + text.confidence) / 3).toFixed(2)
  );

  return {
    id: `rec_live_${Date.now()}`,
    timestamp: 'Just now',
    createdAt: new Date().toISOString(),
    modality: 'combined',
    primaryEmotion,
    secondaryEmotion,
    isCompound,
    compoundName,
    confidence: avgConfidence,
    transcript: transcript || 'Speech synchronized with video stream.',
    distribution: [
      { emotion: primaryEmotion, percentage: Math.round(face.confidence * 100) },
      { emotion: secondaryEmotion || 'neutral', percentage: Math.round(voice.confidence * 100) },
      { emotion: 'neutral', percentage: 10 },
    ],
    signals: {
      face,
      voice,
      text,
    },
    alignment,
    whyExplanation,
    timeline: [
      {
        timestamp: '00s',
        seconds: 0,
        overallEmotionLabel: 'Neutral',
        primaryEmotion: 'neutral',
        isCompound: false,
        signals: {
          face: { emotion: 'neutral', confidence: 0.8 },
          voice: { emotion: 'neutral', confidence: 0.8 },
          text: { emotion: 'neutral', confidence: 0.8 },
        },
      },
      {
        timestamp: '15s',
        seconds: 15,
        overallEmotionLabel: `${EMOTION_CONFIG[primaryEmotion].label}`,
        primaryEmotion,
        isCompound: false,
        signals: {
          face: { emotion: face.primaryEmotion, confidence: face.confidence },
          voice: { emotion: voice.primaryEmotion, confidence: voice.confidence },
          text: { emotion: text.primaryEmotion, confidence: text.confidence },
        },
      },
      {
        timestamp: '30s',
        seconds: 30,
        overallEmotionLabel: compoundName,
        primaryEmotion,
        secondaryEmotion,
        isCompound,
        signals: {
          face: { emotion: face.primaryEmotion, confidence: face.confidence },
          voice: { emotion: voice.primaryEmotion, confidence: voice.confidence },
          text: { emotion: text.primaryEmotion, confidence: text.confidence },
        },
      },
    ],
  };
}
