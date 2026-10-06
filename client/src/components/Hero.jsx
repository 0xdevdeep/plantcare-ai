import React from 'react';
import { ArrowDown, Sparkles, Smartphone, Compass, ShieldCheck, TreePine, Timer } from 'lucide-react';

export function Hero({ onPlanClick, onHowItWorksClick, onQuickDemo }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background radial gradients for organic glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-lime-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Challenge Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/25 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>“Touch Grass” Open-Source AI Challenge</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Touch Grass. <br />
              <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-lime-400 bg-clip-text text-transparent">
                Let AI Handle the Planning.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-emerald-100/75 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              An open-AI outdoor companion that turns a few minutes of planning into hours outside.
              Plan quickly &rarr; Leave the screen &rarr; <span className="text-emerald-300 font-semibold underline decoration-emerald-500/40 underline-offset-4">Touch Grass</span>.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onPlanClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-emerald-950 font-bold text-base shadow-lg shadow-emerald-900/40 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🌱 Plan My Adventure</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onHowItWorksClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-card hover:bg-emerald-900/30 text-emerald-200 hover:text-white font-medium text-base border border-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>How It Works</span>
              </button>

              <button
                onClick={onQuickDemo}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-amber-300 text-sm font-semibold border border-amber-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Nagpur Demo</span>
              </button>
            </div>

            {/* Micro Pillars */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/10 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Timer className="w-3.5 h-3.5" />
                  <span>&lt; 60s Screen Time</span>
                </div>
                <p className="text-[11px] text-emerald-200/60 mt-1">Shortest digital visit possible</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/10 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Open AI</span>
                </div>
                <p className="text-[11px] text-emerald-200/60 mt-1">Ollama & open weights ready</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/10 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <TreePine className="w-3.5 h-3.5" />
                  <span>Screen-Off Mode</span>
                </div>
                <p className="text-[11px] text-emerald-200/60 mt-1">Focus on the outdoors</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual showing phone left behind on bench */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-950/60 group">
              <img
                src="/assets/hero_nature.jpg"
                alt="A hiker walking forward into a sunlit forest trail while leaving their phone behind on a wooden bench"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              
              {/* Subtle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08110b] via-transparent to-transparent opacity-80" />

              {/* Floating Overlay Badge: Phone left behind */}
              <div className="absolute top-4 left-4 max-w-[calc(100%-2rem)] sm:max-w-xs glass-panel p-2.5 sm:p-3 rounded-2xl border border-emerald-400/30 shadow-2xl backdrop-blur-md flex items-center gap-2.5 transition-all hover:border-emerald-400/50">
                <div className="w-8 h-8 rounded-xl bg-emerald-950/90 border border-emerald-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-white tracking-tight">Phone Left on the Bench</span>
                    <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded-md">📵 Unplugged</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/80 leading-tight mt-0.5">
                    The destination is right ahead in the sunlit woods.
                  </p>
                </div>
              </div>

              {/* Floating Overlay Card 2: Touch grass motto */}
              <div className="absolute bottom-4 left-4 right-4 glass-card p-3.5 rounded-xl border border-emerald-500/30">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    TrailMate Philosophy
                  </span>
                  <span className="text-[11px] text-emerald-200/60 font-mono">Real-world first</span>
                </div>
                <p className="text-xs text-white/90 mt-1 italic">
                  “The screen should be the shortest part of the experience.”
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
