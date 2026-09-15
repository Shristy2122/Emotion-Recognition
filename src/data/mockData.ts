import { DetailedAnalysisResult } from '../types/emotion';
import { SEED_COMBINED_RESULT, analysisService } from '../services/analysisService';

export const MOCK_ANALYSIS_RESULT: DetailedAnalysisResult = SEED_COMBINED_RESULT;

export const MOCK_HISTORY_LIST: DetailedAnalysisResult[] = analysisService.getHistory();
