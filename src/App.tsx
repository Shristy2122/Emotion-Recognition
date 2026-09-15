import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { LandingPage } from './pages/LandingPage';
import { AnalyzeSelectionPage } from './pages/AnalyzeSelectionPage';
import { FaceAnalysisPage } from './pages/FaceAnalysisPage';
import { VoiceAnalysisPage } from './pages/VoiceAnalysisPage';
import { TextAnalysisPage } from './pages/TextAnalysisPage';
import { CombinedAnalysisPage } from './pages/CombinedAnalysisPage';
import { ResultPage } from './pages/ResultPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProfilePage } from './pages/ProfilePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="analyze" element={<AnalyzeSelectionPage />} />
          <Route path="analyze/face" element={<FaceAnalysisPage />} />
          <Route path="analyze/voice" element={<VoiceAnalysisPage />} />
          <Route path="analyze/text" element={<TextAnalysisPage />} />
          <Route path="analyze/combined" element={<CombinedAnalysisPage />} />
          <Route path="result" element={<ResultPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
