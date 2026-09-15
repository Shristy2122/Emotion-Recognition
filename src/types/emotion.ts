export type EmotionType =
  | 'happy'
  | 'sad'
  | 'angry'
  | 'fear'
  | 'surprise'
  | 'disgust'
  | 'neutral';

export type ModalityType = 'face' | 'voice' | 'text' | 'combined';

export interface SignalScore {
  modality: 'face' | 'voice' | 'text';
  primaryEmotion: EmotionType;
  confidence: number;
  scores: Record<EmotionType, number>;
}

export interface CompoundEmotion {
  isCompound: boolean;
  name?: string;
  primary: EmotionType;
  secondary?: EmotionType;
  confidence: number;
}

export interface AnalysisRecord {
  id: string;
  timestamp: string;
  modality: ModalityType;
  overallEmotion: CompoundEmotion;
  signals?: {
    face?: SignalScore;
    voice?: SignalScore;
    text?: SignalScore;
  };
  agreementStatus: 'agreement' | 'conflict' | 'mixed';
  explainableInsight: string;
  summary: string;
}
