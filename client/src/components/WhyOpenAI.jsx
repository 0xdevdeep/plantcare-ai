import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Shuffle, 
  Terminal, 
  FileCode, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  HardDrive, 
  Lock, 
  Code2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export function WhyOpenAI({ ollamaStatus, onOpenOllamaModal }) {
  const [activeTab, setActiveTab] = useState('architecture');

  return (
    <section id="why-open-ai" className="py-16 md:py-24 relative border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Open-Weight Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Open AI?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/75 leading-relaxed">
            Your outdoor plans shouldn’t require handing your personal activity schedules, locations, and daily rhythms to a black-box AI service.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          
          <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-900/50 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-3">
                <HardDrive className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-sm">Local-First</h3>
              <p className="text-xs text-emerald-100/60 mt-1 leading-relaxed">
                The architecture is designed to run locally using Ollama on consumer hardware (Mac, Windows, Linux).
              </p>
            </div>
            <div className="mt-4 text-[10px] text-emerald-400/80 font-mono">Zero cloud reliance</div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-900/50 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-3">
                <Lock className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-sm">Strict Privacy</h3>
              <p className="text-xs text-emerald-100/60 mt-1 leading-relaxed">
                Personal outdoor preferences, location history, and group profiles never leave your machine.
              </p>
            </div>
            <div className="mt-4 text-[10px] text-emerald-400/80 font-mono">100% on-device data</div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-900/50 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-3">
                <Shuffle className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-sm">Model Freedom</h3>
              <p className="text-xs text-emerald-100/60 mt-1 leading-relaxed">
                Not tied to any closed API provider. Swap seamlessly between Llama 3.2, Qwen 2.5, Gemma 2, or Mistral.
              </p>
            </div>
            <div className="mt-4 text-[10px] text-emerald-400/80 font-mono">No vendor lock-in</div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-900/50 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-3">
                <Code2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-sm">Auditable & Hackable</h3>
              <p className="text-xs text-emerald-100/60 mt-1 leading-relaxed">
                Developers can inspect prompts, fine-tune weights for local flora/fauna, and customize safety constraints.
              </p>
            </div>
            <div className="mt-4 text-[10px] text-emerald-400/80 font-mono">Open-source & transparent</div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-900/50 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-3">
                <Globe className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-sm">Universal Access</h3>
              <p className="text-xs text-emerald-100/60 mt-1 leading-relaxed">
                Works off-grid in remote parks, national reserves, and trailheads without paid API subscriptions or cell signals.
              </p>
            </div>
            <div className="mt-4 text-[10px] text-emerald-400/80 font-mono">Accessible anywhere</div>
          </div>

        </div>

        {/* Architecture Visualizer Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/25 nature-glow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span>TrailMate AI Architecture</span>
              </h3>
              <p className="text-xs text-emerald-200/70 mt-0.5">
                Clearly distinguishing implemented live features from optional local setups
              </p>
            </div>

            {/* Ollama Status CTA */}
            <button
              onClick={onOpenOllamaModal}
              className="px-4 py-2 rounded-xl bg-emerald-950/70 border border-emerald-500/30 hover:bg-emerald-900/60 text-emerald-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
            >
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Ollama Status & Setup</span>
            </button>
          </div>

          {/* Diagram 1: Active Implementation */}
          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                1. Standard Open-Weight Pipeline (Active)
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                Implemented & Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 items-center text-center">
              <div className="p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/20">
                <div className="text-xs font-bold text-white">User Input</div>
                <div className="text-[10px] text-emerald-200/60 mt-0.5">Time, Goal, Location</div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/20">
                <div className="text-xs font-bold text-white">TrailMate Server</div>
                <div className="text-[10px] text-emerald-200/60 mt-0.5">Modular AI Provider</div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/20">
                <div className="text-xs font-bold text-emerald-300">Open-Weight Model</div>
                <div className="text-[10px] text-emerald-200/60 mt-0.5">Llama 3.2 / Qwen 2.5</div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                <div className="text-xs font-bold text-emerald-200">Outdoor Plan</div>
                <div className="text-[10px] text-emerald-300/80 mt-0.5">Step-by-step & Touch Grass</div>
              </div>
            </div>
          </div>

          {/* Diagram 2: Optional 100% Localhost Setup */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/15 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                2. 100% Local Offline Daemon (Optional Setup)
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                localhost:11434
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 items-center text-center">
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/10">
                <div className="text-xs font-bold text-white">Browser UI</div>
                <div className="text-[10px] text-emerald-200/60 mt-0.5">React + Vite (port 5173)</div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/10">
                <div className="text-xs font-bold text-white">Backend Router</div>
                <div className="text-[10px] text-emerald-200/60 mt-0.5">Node Express (port 3001)</div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/10">
                <div className="text-xs font-bold text-amber-300">Ollama Daemon</div>
                <div className="text-[10px] text-emerald-200/60 mt-0.5">GGUF weights on GPU/CPU</div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/10">
                <div className="text-xs font-bold text-emerald-300">Zero Cloud Egress</div>
                <div className="text-[10px] text-emerald-200/60 mt-0.5">Total data sovereignty</div>
              </div>
            </div>

            {/* Quick command copy */}
            <div className="mt-3 p-3 rounded-xl bg-[#060c08] border border-emerald-500/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-emerald-300">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>$ ollama run llama3.2</span>
              </div>
              <span className="text-[11px] text-emerald-200/50">
                Runs Llama 3.2 locally in 3 seconds. TrailMate will auto-detect it.
              </span>
            </div>
          </div>

          {/* Bottom Manifesto Quote */}
          <div className="mt-8 text-center pt-6 border-t border-emerald-500/15">
            <blockquote className="text-base sm:text-lg font-medium text-white italic max-w-2xl mx-auto">
              “The goal isn’t to put more AI between people and the real world. <br className="hidden sm:inline" />
              It’s to use AI as the shortest possible bridge to it.”
            </blockquote>
          </div>

        </div>

      </div>
    </section>
  );
}
