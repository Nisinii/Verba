import { Upload, FileText, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';

function App() {
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
            <p className="text-zinc-500 text-sm">PDF format recommended. Max 5MB.</p>
          </div>

          {/* Upload Box (Visual Only for now) */}
          <div className="border-2 border-dashed border-white/10 rounded-2xl h-64 flex flex-col items-center justify-center gap-4 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="text-zinc-400 group-hover:text-white" size={24} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-300">Click or Drag to Upload</p>
              <p className="text-xs text-zinc-600 mt-1">PDF documents only</p>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: JOB DESCRIPTION */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-light">2. Add Job Description</h2>
            <p className="text-zinc-500 text-sm">Paste the full job post here for analysis.</p>
          </div>

          <div className="relative h-64">
            <textarea 
              className="w-full h-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 text-sm text-zinc-300 focus:outline-none focus:border-white/20 resize-none placeholder:text-zinc-700"
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
            <div className="text-zinc-500 text-sm">
                Ready to analyze compatibility.
            </div>
            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors">
                <span>Start Analysis</span>
                <ArrowRight size={18} />
            </button>
        </div>
      </div>

    </div>
  );
}

export default App;