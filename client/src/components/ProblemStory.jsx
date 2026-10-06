import React from 'react';
import { Smartphone, Sparkles, ArrowRight, XCircle, CheckCircle2, Shield, Eye, Flame } from 'lucide-react';

export function ProblemStory() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 relative border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Project Story & Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Problem: Apps Want Your Attention. <br />
            <span className="text-emerald-400">We Want You to Leave.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/70 leading-relaxed">
            People have endless apps for productivity, entertainment, and mindless scrolling.
            Very few tools are designed to make the screen itself unnecessary.
          </p>
        </div>

        {/* Contrast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Traditional Apps */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-rose-500/20 relative overflow-hidden bg-gradient-to-b from-rose-950/10 to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Traditional AI & Social Apps</h3>
                <p className="text-xs text-rose-300/70">Engineered for infinite screen dwell time</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-emerald-100/70 mt-6">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold mt-0.5">&times;</span>
                <span>Infinite feeds and gamified engagement loops to trap attention.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold mt-0.5">&times;</span>
                <span>User data and personal locations uploaded to closed proprietary AI clouds.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold mt-0.5">&times;</span>
                <span>Hours spent comparing hundreds of reviews instead of stepping outside.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold mt-0.5">&times;</span>
                <span>Creates digital fatigue, eye strain, and disconnection from physical nature.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: TrailMate AI */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-500/30 relative overflow-hidden bg-gradient-to-b from-emerald-950/30 to-emerald-950/10 nature-glow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">TrailMate AI (Touch Grass)</h3>
                <p className="text-xs text-emerald-300/80">Engineered to get out of your way</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-emerald-100/85 mt-6">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">&#10003;</span>
                <span><strong>Use AI for 30 seconds</strong> to stop using your phone for the next 2 hours.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">&#10003;</span>
                <span><strong>Open-weight AI</strong> running locally on your hardware with zero tracking.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">&#10003;</span>
                <span><strong>Dedicated Screen-Off Mode</strong> that turns the phone into a minimal circular countdown.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">&#10003;</span>
                <span><strong>Real-world sensory quests</strong> (leaf observation, bird spotting, soil grounding).</span>
              </li>
            </ul>
          </div>

        </div>

        {/* The 4-step Flow banner */}
        <div className="p-6 sm:p-8 rounded-2xl glass-card border border-emerald-500/20 text-center">
          <p className="text-xs uppercase tracking-wider font-semibold text-emerald-400 mb-3">The TrailMate Loop</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/10">
              <span className="text-2xl font-black text-emerald-500 font-mono">01</span>
              <h4 className="font-bold text-white text-sm mt-1">Plan Quickly</h4>
              <p className="text-xs text-emerald-200/60 mt-1">Input time & mood in under 30 seconds.</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/10">
              <span className="text-2xl font-black text-emerald-500 font-mono">02</span>
              <h4 className="font-bold text-white text-sm mt-1">Leave The Screen</h4>
              <p className="text-xs text-emerald-200/60 mt-1">Screen-Off mode dims notifications.</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/10">
              <span className="text-2xl font-black text-emerald-500 font-mono">03</span>
              <h4 className="font-bold text-white text-sm mt-1">Touch Grass</h4>
              <p className="text-xs text-emerald-200/60 mt-1">Complete micro-quests in the real outdoors.</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/10">
              <span className="text-2xl font-black text-emerald-500 font-mono">04</span>
              <h4 className="font-bold text-white text-sm mt-1">Log & Recharge</h4>
              <p className="text-xs text-emerald-200/60 mt-1">Return feeling energized, clear-minded.</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-emerald-200/80 italic text-center sm:text-left">
              “The goal isn’t to put more AI between people and the real world. It’s to use AI as the shortest possible bridge to it.”
            </p>
            <span className="text-xs font-mono px-3 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 whitespace-nowrap">
              Open Innovation Manifesto
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
