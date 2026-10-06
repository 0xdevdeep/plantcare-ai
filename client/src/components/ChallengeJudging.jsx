import React from 'react';
import { Sprout, PhoneOff, Globe, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export function ChallengeJudging() {
  return (
    <section className="py-16 md:py-24 relative border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Hackathon Submission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Touch Grass
          </h2>
          <p className="mt-3 text-sm sm:text-base text-emerald-100/70">
            A radical departure from addictive screens: built on open models, designed to be shut down.
          </p>
        </div>

        {/* 3 Core Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Open AI */}
          <div className="glass-panel p-8 rounded-3xl border border-emerald-500/25 space-y-4 nature-glow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Sprout className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">🌱 Open AI</h3>
            <p className="text-sm text-emerald-100/70 leading-relaxed">
              Built natively around open-weight AI. Powered by Ollama with seamless support for Llama 3.2, Qwen 2.5, Gemma 2, and Mistral. Runs locally on consumer GPUs with no surveillance telemetry.
            </p>
            <div className="pt-2 text-xs font-mono text-emerald-400/80">
              Model Agnostic • Zero Cloud Lock-in
            </div>
          </div>

          {/* Card 2: Less Screen Time */}
          <div className="glass-panel p-8 rounded-3xl border border-emerald-500/25 space-y-4 nature-glow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <PhoneOff className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white">📵 Less Screen Time</h3>
            <p className="text-sm text-emerald-100/70 leading-relaxed">
              The product intentionally gets out of your way. Generates plans in under 30 seconds, then transforms into a dedicated Screen-Off Mode with a circular timer so you can pocket your phone.
            </p>
            <div className="pt-2 text-xs font-mono text-emerald-400/80">
              Anti-Addiction • Intentional Void
            </div>
          </div>

          {/* Card 3: Real World */}
          <div className="glass-panel p-8 rounded-3xl border border-emerald-500/25 space-y-4 nature-glow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Globe className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">🌍 Real World</h3>
            <p className="text-sm text-emerald-100/70 leading-relaxed">
              Every generated output triggers an actual physical outdoor activity. Features real-world sensory challenges (finding leaf shapes, touching soil, identifying sounds) to recalibrate mental clarity.
            </p>
            <div className="pt-2 text-xs font-mono text-emerald-400/80">
              Physical Action • Nature Grounding
            </div>
          </div>

        </div>

        {/* The 4-step Banner: Plan -> Go -> Explore -> Return */}
        <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-around gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center font-mono">1</span>
            <span className="font-extrabold text-white text-base">Plan</span>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-500/40 hidden md:block" />

          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center font-mono">2</span>
            <span className="font-extrabold text-white text-base">Go</span>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-500/40 hidden md:block" />

          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center font-mono">3</span>
            <span className="font-extrabold text-white text-base">Explore</span>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-500/40 hidden md:block" />

          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center font-mono">4</span>
            <span className="font-extrabold text-emerald-400 text-base">Return</span>
          </div>
        </div>

      </div>
    </section>
  );
}
