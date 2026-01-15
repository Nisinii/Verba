import { useState } from 'react';
import axios from 'axios';
import { Upload, Briefcase, ArrowRight, CheckCircle2, Loader2, AlertCircle, Bot } from 'lucide-react';

function App() {
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  
  // States: idle -> uploading -> success (resume ready) -> analyzing -> done
  const [status, setStatus] = useState<string>("idle");
  const [result, setResult] = useState<string>("");

  // 1. Handle File Upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/extract-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResumeText(response.data.full_text);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  // 2. Handle Analysis
  const handleAnalyze = async () => {
    if (!resumeText || !jobDesc) return;
    
    setStatus("analyzing");
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze", {
        resume_text: resumeText,
        job_desc: jobDesc
      });
      
      // We get a JSON string from Gemini, let's just show it raw for today
      setResult(response.data.analysis);
      setStatus("done");
      
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
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
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
             <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
             SYSTEM ONLINE
          </div>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: RESUME */}
        <section className="space-y-6">
          <h2 className="text-2xl font-light">1. Upload Resume</h2>
          <div className={`relative border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center gap-4 transition-all group overflow-hidden
            ${status === 'success' || status === 'analyzing' || status === 'done' ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 bg-white/5'}`}
          >
            <input type="file" accept=".pdf" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            
            {status === 'uploading' ? (
              <Loader2 className="animate-spin text-blue-400" size={32} />
            ) : status === 'success' || status === 'analyzing' || status === 'done' ? (
              <div className="text-center">
                <CheckCircle2 className="mx-auto text-green-400 mb-2" size={32} />
                <p className="text-white">{fileName}</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto text-zinc-400 mb-2" size={24} />
                <p className="text-zinc-300">Upload PDF</p>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: JOB DESC */}
        <section className="space-y-6">
          <h2 className="text-2xl font-light">2. Add Job Description</h2>
          <textarea 
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            className="w-full h-64 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 text-sm text-zinc-300 focus:outline-none focus:border-white/20 resize-none font-mono"
            placeholder="Paste job description here..."
          ></textarea>
        </section>

      </main>

      {/* RESULTS AREA (Only shows when done) */}
      {status === 'done' && (
        <section className="max-w-6xl mx-auto px-6 pb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
           <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="text-white" size={24}/>
                  </div>
                  <h3 className="text-2xl font-bold">Verba Analysis</h3>
              </div>
              
              {/* RAW JSON DISPLAY (For Day 3 Testing) */}
              <div className="bg-black p-6 rounded-xl overflow-x-auto font-mono text-sm text-green-400 border border-white/5">
                <pre>{result}</pre>
              </div>
           </div>
        </section>
      )}

      {/* ACTION BAR */}
      <div className="fixed bottom-0 left-0 w-full border-t border-white/10 bg-black/80 backdrop-blur-md p-6 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="text-zinc-500 text-sm">{status === 'analyzing' ? "Consulting Gemini AI..." : "Ready to analyze."}</span>
            <button 
              onClick={handleAnalyze}
              disabled={!resumeText || !jobDesc || status === 'analyzing'}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === 'analyzing' ? <Loader2 className="animate-spin" /> : <ArrowRight size={18} />}
                <span>{status === 'analyzing' ? "Analyzing..." : "Analyze Match"}</span>
            </button>
        </div>
      </div>

    </div>
  );
}

export default App;