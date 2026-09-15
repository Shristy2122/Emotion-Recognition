import { EmotionType, AlignmentType, ModalitySignal } from '../types/emotion';
import { EMOTION_CONFIG } from './emotionColors';

/**
 * Calculates a horizontal position on the Emotional Spectrum (0% to 100%)
 * Left is negative affect (Sad/Angry/Fear/Disgust), Center is Neutral, Right is positive (Happy/Surprise)
 */
export function getSpectrumPosition(emotion: EmotionType, confidence: number): number {
  switch (emotion) {
    case 'sad':
      return Math.max(8, Math.round(50 - confidence * 42)); // ~8% to ~25%
    case 'angry':
      return Math.max(10, Math.round(50 - confidence * 38));
    case 'fear':
      return Math.max(15, Math.round(50 - confidence * 32));
    case 'disgust':
      return Math.max(18, Math.round(50 - confidence * 30));
    case 'neutral':
      return 50;
    case 'surprise':
      return Math.min(85, Math.round(50 + confidence * 30));
    case 'happy':
      return Math.min(92, Math.round(50 + confidence * 42)); // ~75% to ~92%
    default:
      return 50;
  }
}

/**
 * Dynamically evaluates cross-signal alignment across face, voice, and text
 */
export function evaluateSignalAlignment(
  face: ModalitySignal,
  voice: ModalitySignal,
  text: ModalitySignal
): { type: AlignmentType; headline: string; description: string } {
  const emotions = [face.primaryEmotion, voice.primaryEmotion, text.primaryEmotion];
  const uniqueEmotions = Array.from(new Set(emotions));

  if (uniqueEmotions.length === 1) {
    const emotionName = EMOTION_CONFIG[uniqueEmotions[0]].label;
    return {
      type: 'agreement',
      headline: 'Strong emotional agreement',
      description: `All three signals point in a harmonious direction: consistent cues of ${emotionName} observed across facial micro-expressions, vocal prosody, and linguistic content.`,
    };
  }

  // Conflict / Mixed signal
  const faceLabel = EMOTION_CONFIG[face.primaryEmotion].label;
  const voiceLabel = EMOTION_CONFIG[voice.primaryEmotion].label;
  const textLabel = EMOTION_CONFIG[text.primaryEmotion].label;

  if (face.primaryEmotion === text.primaryEmotion && voice.primaryEmotion !== face.primaryEmotion) {
    return {
      type: 'conflict',
      headline: 'Your signals tell different stories.',
      description: `Face and words suggest ${faceLabel.toLowerCase()}, while your voice carries a more ${voiceLabel.toLowerCase()} tone. Emotia identifies this as a blended affective state.`,
    };
  }

  if (face.primaryEmotion !== voice.primaryEmotion && voice.primaryEmotion === text.primaryEmotion) {
    return {
      type: 'conflict',
      headline: 'Your signals tell different stories.',
      description: `Vocal inflection and spoken statements suggest ${voiceLabel.toLowerCase()}, while subtle facial cues convey an underlying ${faceLabel.toLowerCase()} expression.`,
    };
  }

  return {
    type: 'mixed',
    headline: 'Multifaceted emotional signals.',
    description: `Subtle variations detected between what is shown (${faceLabel}), how it sounds (${voiceLabel}), and what is said (${textLabel}).`,
  };
}

/**
 * Generates an explainable AI insight dynamically from three signals
 */
export function generateExplainableInsight(
  face: ModalitySignal,
  voice: ModalitySignal,
  text: ModalitySignal
): {
  faceCue: string;
  voiceCue: string;
  textCue: string;
  aiSynthesis: string;
} {
  const faceConfig = EMOTION_CONFIG[face.primaryEmotion];
  const voiceConfig = EMOTION_CONFIG[voice.primaryEmotion];
  const textConfig = EMOTION_CONFIG[text.primaryEmotion];

  return {
    faceCue:
      face.explanationCue ||
      `Facial cues indicate a stronger ${faceConfig.label.toLowerCase()} signal with ${Math.round(
        face.confidence * 100
      )}% prominence.`,
    voiceCue:
      voice.explanationCue ||
      `Vocal tone and pitch cadence suggest a ${voiceConfig.label.toLowerCase()} emotional state.`,
    textCue:
      text.explanationCue ||
      `The words spoken contain distinct ${textConfig.label.toLowerCase()}-related semantic markers.`,
    aiSynthesis:
      face.primaryEmotion === voice.primaryEmotion && voice.primaryEmotion === text.primaryEmotion
        ? `All three sensory modalities independently confirm ${faceConfig.label.toLowerCase()}. Confidence is heightened due to full cross-signal agreement.`
        : `Your facial expression and words suggest ${faceConfig.label.toLowerCase()}, while your voice carries a more ${voiceConfig.label.toLowerCase()} emotional tone. Together, these signals suggest a mixed or compound emotional state.`,
  };
}
