import React, { useState } from 'react';
import { X, Cpu, RefreshCw, Terminal, CheckCircle2, AlertCircle, ExternalLink, ShieldCheck, Copy, Check } from 'lucide-react';

export function OllamaStatusModal({ 
  isOpen, 
  onClose, 
  ollamaStatus, 
  onRefreshStatus, 
  currentModel, 
  onSelectModel 
}) {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [testing, setTesting] = useState(false);

  if (!isOpen) return null;

  const pullCmd = `ollama run ${currentModel || 'llama3.2'}`;

  const copyCommand = () => {
    navigator.clipboard.writeText(pullCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleTestConnection = async () => {
    setTesting(true);
    await onRefreshStatus();
    setTesting(false);
  };

  const isOnline = Boolean(ollamaStatus?.online);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-xl glass-panel rounded-3xl border border-emerald-500/30 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">AI Inference Engine</h3>
              <p className="text-xs text-emerald-200/60">Ollama Local & Open-Weight Configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-300/60 hover:text-white hover:bg-emerald-950/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cloud AI Status Card */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          ollamaStatus?.geminiConfigured
            ? 'bg-emerald-950/60 border-emerald-400/40 text-emerald-200'
            : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${ollamaStatus?.geminiConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Cloud AI Engine</span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                  {ollamaStatus?.geminiConfigured ? 'Live Key Active' : 'Unconfigured'}
                </span>
              </div>
              <div className="text-[11px] opacity-70">
                {ollamaStatus?.geminiConfigured
                  ? `Powered by Google AI (${ollamaStatus.geminiModel || 'gemini-3.1-flash-lite'}) • Real-time live inference`
                  : 'Add GEMINI_API_KEY in server/.env for cloud fallback.'}
              </div>
            </div>
          </div>
          <button
            onClick={handleTestConnection}
            disabled={testing}
            className="p-2 rounded-lg bg-emerald-950 border border-emerald-500/20 hover:bg-emerald-900/60 text-emerald-300 transition-colors"
            title="Probe connection"
          >
            <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Local Ollama Status Indicator Card */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          isOnline
            ? 'bg-emerald-950/60 border-emerald-400/40 text-emerald-200'
            : 'bg-emerald-950/30 border-emerald-500/20 text-emerald-100/70'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-700'}`} />
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Local Ollama Daemon</span>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">
                  {isOnline ? 'Connected' : 'Offline (Optional)'}
                </span>
              </div>
              <div className="text-[11px] opacity-70">
                {isOnline 
                  ? `Listening at ${ollamaStatus.host} • ${ollamaStatus.models?.length || 1} model(s) detected` 
                  : 'Run Ollama to keep 100% of activity planning on your local GPU/CPU.'}
              </div>
            </div>
          </div>
        </div>

        {/* How to run locally in 3 steps */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>How to run Ollama locally</span>
          </h4>

          <div className="p-4 rounded-2xl bg-[#050c07] border border-emerald-500/20 space-y-3 text-xs font-mono">
            <div className="flex items-start gap-2 text-emerald-200/80">
              <span className="text-emerald-400 font-bold">1.</span>
              <div>
                <span>Install Ollama from </span>
                <a 
                  href="https://ollama.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300 inline-flex items-center gap-0.5"
                >
                  ollama.com <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2 text-emerald-200/80">
              <span className="text-emerald-400 font-bold">2.</span>
              <div className="flex-1">
                <span>Start open model in your terminal:</span>
                <div className="mt-1.5 p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-between">
                  <span className="text-emerald-300 select-all">{pullCmd}</span>
                  <button
                    onClick={copyCommand}
                    className="p-1 hover:text-white text-emerald-400 transition-colors"
                    title="Copy command"
                  >
                    {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 text-emerald-200/80">
              <span className="text-emerald-400 font-bold">3.</span>
              <div>
                <span>TrailMate AI automatically detects </span>
                <code className="text-emerald-400">http://localhost:11434</code>
                <span> and routes all prompts on-device.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Model Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-white block">Preferred Open-Weight Model</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'llama3.2', name: 'Llama 3.2 (3B)', note: 'Fast & lightweight' },
              { id: 'llama3', name: 'Llama 3 (8B)', note: 'Detailed itineraries' },
              { id: 'qwen2.5', name: 'Qwen 2.5 (7B)', note: 'High precision' },
              { id: 'gemma2', name: 'Gemma 2 (9B)', note: 'Google open weights' },
            ].map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => onSelectModel(m.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  currentModel === m.id
                    ? 'bg-emerald-600/30 border-emerald-400 text-white font-bold'
                    : 'bg-emerald-950/40 border-emerald-500/15 text-emerald-200/70 hover:bg-emerald-900/40'
                }`}
              >
                <div>{m.name}</div>
                <div className="text-[10px] text-emerald-300/50 font-normal">{m.note}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/15 text-[11px] text-emerald-200/70 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            With Ollama running locally, zero personal prompt data, location names, or user habits leave your laptop. 
            No accounts, no credit cards, no subscription walls.
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          Close & Return to Planner
        </button>

      </div>
    </div>
  );
}
