import { useState } from 'react';
import { MOCK_RESPONSE } from '../data/constants';

export const useAnalysis = () => {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [analysisState, setAnalysisState] = useState('idle'); 
  const [scanStage, setScanStage] = useState(0);
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!file || !jobDesc) return;
    setAnalysisState('analyzing');
    setScanStage(0);
    setTimeout(() => setScanStage(1), 1200);
    setTimeout(() => setScanStage(2), 2400);
    setTimeout(() => {
      setResult(MOCK_RESPONSE);
      setAnalysisState('complete');
    }, 3600);
  };

  const resetAnalysis = (scrollFn) => {
    setAnalysisState('idle');
    setFile(null);
    setJobDesc("");
    if (scrollFn) scrollFn('input-engine');
  };

  return {
    file, setFile, jobDesc, setJobDesc, 
    analysisState, scanStage, result, 
    handleAnalyze, resetAnalysis
  };
};