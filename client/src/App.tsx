import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bot, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [status, setStatus] = useState<string>("connecting");

  useEffect(() => {
    // Ping the FastAPI Backend
    axios.get('http://127.0.0.1:8000/health')
      .then(() => setStatus("connected"))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      
      {/* Animated Logo */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <Bot size={40} className="text-black" />
        </div>

        <h1 className="text-4xl font-light tracking-tight">VERBA</h1>
        <p className="text-zinc-500 uppercase tracking-widest text-xs">AI Career Analyst</p>
      </motion.div>

      {/* Connection Status Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-12 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md w-full max-w-sm"
      >
        <div className="flex items-center gap-4">
          {status === 'connected' ? (
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
              <CheckCircle2 size={20} />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
              <AlertCircle size={20} />
            </div>
          )}
          
          <div>
            <p className="text-sm font-medium text-white">System Status</p>
            <p className="text-xs text-zinc-400">
              {status === 'connected' 
                ? "Backend Online & Ready" 
                : "Cannot connect to FastAPI"}
            </p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

export default App;