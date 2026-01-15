import { useState } from 'react';
import axios from 'axios';
import { Upload, Briefcase, ArrowRight, CheckCircle2, FileText, Loader2, AlertCircle } from 'lucide-react';

function App() {
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [fileName, setFileName] = useState<string>("");

  // FUNCTION: Handle File Upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Send to FastAPI
      const response = await axios.post("http://127.0.0.1:8000/extract-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Save the extracted text
      setResumeText(response.data.full_text);
      setStatus("success");
      console.log("Extracted Text:", response.data.full_text); // Check Console to see it!
      
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
        
        {/* LEFT COLUMN: RESUME UPLOAD */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-light">1. Upload Resume</h2>
            <p className="text-zinc-500 text-sm">PDF format recommended.</p>
          </div>

          {/* Upload Box with State Handling */}
          <div className={`relative border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center gap-4 transition-all group overflow-hidden
            ${status === 'error' ? 'border-red-500/50 bg-red-500/5' : 
              status === 'success' ? 'border-green-500/50 bg-green-500/5' : 
              'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'}`}
          >
            {/* Hidden Input Field */}
            <input 
              type="file" 
              accept=".pdf"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            {/* UI STATE: LOADING */}
            {status === 'uploading' && (
              <div className="flex flex-col items-center gap-3 animate-pulse">
                <Loader2 className="animate-spin text-blue-400" size={32} />
                <p className="text-sm text-zinc-400">Extracting text...</p>
              </div>
            )}

            {/* UI STATE: SUCCESS */}
            {status === 'success' && (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <CheckCircle2 size={32} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-white">{fileName}</p>
                  <p className="text-xs text-zinc-500 mt-1">Ready for analysis</p>
                </div>
              </div>
            )}

            {/* UI STATE: ERROR */}
            {status === 'error' && (
              <div className="flex flex-col items-center gap-3">
                <AlertCircle className="text-red-400" size={32} />
                <p className="text-sm text-red-400">Upload failed. Try again.</p>
              </div>
            )}

            {/* UI STATE: DEFAULT (IDLE) */}
            {status === 'idle' && (
              <>
                <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="text-zinc-400 group-hover:text-white" size={24} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-zinc-300">Click or Drag PDF</p>
                  <p className="text-xs text-zinc-600 mt-1">We'll extract the text automatically</p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: JOB DESCRIPTION */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-light">2. Add Job Description</h2>
            <p className="text-zinc-500 text-sm">Paste the full job post here.</p>
          </div>

          <div className="relative h-64">
            <textarea 
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              className="w-full h-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 text-sm text-zinc-300 focus:outline-none focus:border-white/20 resize-none placeholder:text-zinc-700 font-mono leading-relaxed"
              placeholder="Paste job description here..."
            ></textarea>
            <div className="absolute top-4 right-4 text-zinc-700">
              <Briefcase size={16} />
            </div>
          </div>
        </section>

      </main>

      {/* ACTION BAR (Bottom) */}
      <div className="fixed bottom-0 left-0 w-full border-t border-white/10 bg-black/80 backdrop-blur-md p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${resumeText ? 'bg-green-500' : 'bg-zinc-700'}`}></div>
              <span className="text-zinc-500 text-sm">
                 {resumeText ? "Resume Loaded" : "Waiting for Resume..."}
              </span>
            </div>

            <button 
              disabled={!resumeText || !jobDesc}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span>Analyze Match</span>
                <ArrowRight size={18} />
            </button>
        </div>
      </div>

    </div>
  );
}

export default App;