import { EmotionType } from '../types/emotion';

export const EMOTION_CONFIG: Record<
  EmotionType,
  {
    label: string;
    color: string;
    bgClass: string;
    borderClass: string;
    textClass: string;
    emoji: string;
  }
> = {
  happy: {
    label: 'Happy',
    color: '#FCD34D',
    bgClass: 'bg-[#FCD34D]/10',
    borderClass: 'border-[#FCD34D]/30',
    textClass: 'text-[#FCD34D]',
    emoji: '😊',
  },
  sad: {
    label: 'Sad',
    color: '#60A5FA',
    bgClass: 'bg-[#60A5FA]/10',
    borderClass: 'border-[#60A5FA]/30',
    textClass: 'text-[#60A5FA]',
    emoji: '😢',
  },
  angry: {
    label: 'Angry',
    color: '#F87171',
    bgClass: 'bg-[#F87171]/10',
    borderClass: 'border-[#F87171]/30',
    textClass: 'text-[#F87171]',
    emoji: '😠',
  },
  fear: {
    label: 'Fear',
    color: '#C084FC',
    bgClass: 'bg-[#C084FC]/10',
    borderClass: 'border-[#C084FC]/30',
    textClass: 'text-[#C084FC]',
    emoji: '😨',
  },
  surprise: {
    label: 'Surprise',
    color: '#FB923C',
    bgClass: 'bg-[#FB923C]/10',
    borderClass: 'border-[#FB923C]/30',
    textClass: 'text-[#FB923C]',
    emoji: '😲',
  },
  disgust: {
    label: 'Disgust',
    color: '#4ADE80',
    bgClass: 'bg-[#4ADE80]/10',
    borderClass: 'border-[#4ADE80]/30',
    textClass: 'text-[#4ADE80]',
    emoji: '🤢',
  },
  neutral: {
    label: 'Neutral',
    color: '#94A3B8',
    bgClass: 'bg-[#94A3B8]/10',
    borderClass: 'border-[#94A3B8]/30',
    textClass: 'text-[#94A3B8]',
    emoji: '😐',
  },
};
