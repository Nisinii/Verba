import { useState } from 'react';

export const useAnalysis = () => {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [analysisState, setAnalysisState] = useState('idle'); 
  const [scanStage, setScanStage] = useState(0);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!file || !jobDesc) return;
    
    setAnalysisState('analyzing');
    setScanStage(0);

    try {
      // STEP 1: Extract Text from PDF
      setScanStage(1); // Update UI stage
      const formData = new FormData();
      formData.append('file', file);

      const extractResponse = await fetch('http://localhost:8000/extract-resume', {
        method: 'POST',
        body: formData,
      });

      if (!extractResponse.ok) throw new Error("Failed to extract PDF text");
      const extractData = await extractResponse.json();
      const resumeText = extractData.full_text;

      // STEP 2: Send Text to Gemini for Analysis
      setScanStage(2); // Update UI stage
      const analyzeResponse = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume_text: resumeText,
          job_desc: jobDesc
        }),
      });

      if (!analyzeResponse.ok) throw new Error("Analysis failed");
      const finalData = await analyzeResponse.json();

      // Mapping Backend JSON keys to your Frontend component keys
      // Note: Your backend uses snake_case, frontend uses camelCase
      const analysis = finalData.analysis;
      setResult({
        matchScore: analysis.match_score,
        summary: analysis.summary,
        missingKeywords: analysis.missing_skills,
        suggestedChanges: analysis.suggested_rewrites.map(item => `${item.section}: ${item.improved}`),
        // You can add more fields like interview_prep if you update AnalysisView.jsx
      });

      setAnalysisState('complete');
    } catch (error) {
      console.error("Kairos Engine Error:", error);
      alert("Analysis failed. Is the Python backend running?");
      setAnalysisState('idle');
    }
  };

  const resetAnalysis = (scrollFn) => {
    setAnalysisState('idle');
    setFile(null);
    setJobDesc("");
    setResult(null);
    if (scrollFn) scrollFn('input-engine');
  };

  return {
    file, setFile, jobDesc, setJobDesc, 
    analysisState, scanStage, result, 
    handleAnalyze, resetAnalysis
  };
};