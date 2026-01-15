import { useState } from 'react';
import axios from 'axios';
import { Upload, Briefcase, ArrowRight, CheckCircle2, Loader2, AlertCircle, Bot, XCircle } from 'lucide-react';

// Define the shape of our data
interface AnalysisResult {
  match_score: number;
  summary: string;
  missing_skills: string[];
  good_match: string[];
}

function App() {
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [status, setStatus] = useState<string>("idle");
  
  // Store the parsed JSON result here
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/extract-resume", formData);
      setResumeText(response.data.full_text);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText || !jobDesc) return;
    setStatus("analyzing");
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze", {
        resume_text: resumeText,
        job_desc: jobDesc
      });
      
      // The backend now returns a JSON object directly
      setResult(response.data.analysis);
      setStatus("done");
      
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  // Helper to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400 border-green-500";
    if (score >= 50) return "text-yellow-400 border-yellow-500";
    return "text-red-400 border-red-500";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">
      
      {/* HEADER */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">V</span>
            </div>
            <span className="font-medium tracking-tight">Verba</span>
          </div>
          <button onClick={() => window.location.reload()} className="text-xs font-medium text-zinc-500 hover:text-white transition">
             RESET
          </button>
        </div>
      </header>

      {/* INPUT SECTION (Hide when done) */}
      {status !== 'done' && (
        <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
          
          {/* UPLOAD */}
          <section className="space-y-6">
            <h2 className="text-2xl font-light">1. Upload Resume</h2>
            <div className={`relative border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center gap-4 transition-all group overflow-hidden
              ${status === 'success' || status === 'analyzing' ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 bg-white/5'}`}
            >
              <input type="file" accept=".pdf" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              {status === 'success' || status === 'analyzing' ? (
                <div className="text-center">
                  <CheckCircle2 className="mx-auto text-green-400 mb-2" size={32} />
                  <p className="text-white">{fileName}</p>
                </div>
              ) : status === 'uploading' ? (
                <Loader2 className="animate-spin text-blue-400" size={32} />
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto text-zinc-400 mb-2" size={24} />
                  <p className="text-zinc-300">Upload PDF</p>
                </div>
              )}
            </div>
          </section>

          {/* JOB DESC */}
          <section className="space-y-6">
            <h2 className="text-2xl font-light">2. Job Description</h2>
            <textarea 
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              className="w-full h-64 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 text-sm text-zinc-300 focus:outline-none focus:border-white/20 resize-none font-mono"
              placeholder="Paste job description here..."
            ></textarea>
          </section>
        </main>
      )}

      {/* RESULTS DASHBOARD (Only shows when done) */}
      {status === 'done' && result && (
        <main className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
          
          {/* SCORE CARD */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-zinc-900/50 border border-white/10 p-8 rounded-3xl mb-8">
            <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center ${getScoreColor(result.match_score)}`}>
              <span className="text-4xl font-bold">{result.match_score}%</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">Match Analysis</h2>
              <p className="text-zinc-400 leading-relaxed">{result.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* MISSING SKILLS */}
            <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4 text-red-400">
                <AlertCircle size={24} />
                <h3 className="font-bold">Missing Skills</h3>
              </div>
              <ul className="space-y-3">
                {result.missing_skills.map((skill, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-300">
                    <XCircle size={16} className="text-red-500/50" />
                    {skill}
                  </li>
                ))}
                {result.missing_skills.length === 0 && <li className="text-zinc-500 italic">No missing skills detected!</li>}
              </ul>
            </div>

            {/* MATCHING SKILLS */}
            <div className="bg-green-500/5 border border-green-500/20 p-6 rounded-2xl">
               <div className="flex items-center gap-3 mb-4 text-green-400">
                <CheckCircle2 size={24} />
                <h3 className="font-bold">Good Match</h3>
              </div>
              <ul className="space-y-3">
                {result.good_match.map((skill, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 size={16} className="text-green-500/50" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </main>
      )}

      {/* FOOTER ACTION */}
      {status !== 'done' && (
        <div className="fixed bottom-0 left-0 w-full border-t border-white/10 bg-black/80 backdrop-blur-md p-6 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-end">
              <button 
                onClick={handleAnalyze}
                disabled={!resumeText || !jobDesc || status === 'analyzing'}
                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                  {status === 'analyzing' ? <Loader2 className="animate-spin" /> : <ArrowRight size={18} />}
                  <span>{status === 'analyzing' ? "Analyzing..." : "Analyze Match"}</span>
              </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;