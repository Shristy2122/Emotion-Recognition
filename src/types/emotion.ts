export type EmotionType =
  | 'happy'
  | 'sad'
  | 'angry'
  | 'fear'
  | 'surprise'
  | 'disgust'
  | 'neutral';

export type ModalityType = 'face' | 'voice' | 'text' | 'combined';

export type AlignmentType = 'agreement' | 'conflict' | 'mixed';

export interface ModalitySignal {
  modality: 'face' | 'voice' | 'text';
  primaryEmotion: EmotionType;
  confidence: number; // 0 to 1
  scores: Record<EmotionType, number>;
  valence?: number; // -1 (negative) to +1 (positive) for spectrum positioning
  explanationCue?: string;
}

export interface TimelineMilestone {
  timestamp: string; // e.g. "00s", "10s", "20s", "30s"
  seconds: number;
  overallEmotionLabel: string;
  primaryEmotion: EmotionType;
  secondaryEmotion?: EmotionType;
  isCompound: boolean;
  signals: {
    face: { emotion: EmotionType; confidence: number };
    voice: { emotion: EmotionType; confidence: number };
    text: { emotion: EmotionType; confidence: number };
  };
}

export interface DetailedAnalysisResult {
  id: string;
  timestamp: string;
  createdAt: string;
  modality: ModalityType;
  primaryEmotion: EmotionType;
  secondaryEmotion?: EmotionType;
  isCompound: boolean;
  compoundName?: string;
  confidence: number;
  distribution: Array<{
    emotion: EmotionType;
    percentage: number;
  }>;
  signals?: {
    face?: ModalitySignal;
    voice?: ModalitySignal;
    text?: ModalitySignal;
  };
  alignment?: {
    type: AlignmentType;
    headline: string;
    description: string;
  };
  whyExplanation?: {
    faceCue: string;
    voiceCue: string;
    textCue: string;
    aiSynthesis: string;
  };
  timeline?: TimelineMilestone[];
  transcript?: string;
}

export type AnalysisRecord = DetailedAnalysisResult;
