import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Flame, 
  CheckCircle2, 
  Circle, 
  Backpack, 
  ShieldAlert, 
  Sparkles, 
  Play, 
  Bookmark, 
  RotateCcw, 
  Share2, 
  Cpu, 
  Leaf, 
  SunMedium, 
  Check
} from 'lucide-react';

export function PlanResult({ 
  plan, 
  onStartAdventure, 
  onSavePlan, 
  onGenerateAnother,
  isSaved 
}) {
  const [checkedItems, setCheckedItems] = useState({});
  const [copied, setCopied] = useState(false);

  if (!plan) return null;

  const toggleItem = (idx) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleShare = () => {
    const text = `🌿 ${plan.title}\n📍 Location: ${plan.location}\n⏱️ Duration: ${plan.duration}\n🎯 Best for: ${plan.best_for}\n\nGenerated with TrailMate AI (Touch Grass Open AI Companion)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLiveOllama = plan.metadata?.provider === 'ollama';
  const isLiveGemini = plan.metadata?.provider === 'gemini';

  return (
    <section id="plan-result" className="py-10 md:py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Main Result Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border border-emerald-500/30 nature-glow relative overflow-hidden">
          
          {/* Top Banner & Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-emerald-500/15">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>Generated Outdoor Itinerary</span>
              </span>

              {/* Provider Badge */}
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono border flex items-center gap-1 ${
                isLiveOllama 
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' 
                  : isLiveGemini
                  ? 'bg-emerald-950/90 text-emerald-200 border-emerald-400/50 shadow-sm'
                  : 'bg-amber-950/50 text-amber-300 border-amber-500/30'
              }`}>
                <Cpu className="w-3 h-3 text-emerald-400" />
                <span>
                  {isLiveOllama 
                    ? `Ollama (${plan.metadata?.model})` 
                    : isLiveGemini
                    ? `Live AI (${plan.metadata?.model || 'Gemini Flash'})`
                    : 'Open Demo Engine'}
                </span>
                {plan.metadata?.latencyMs && (
                  <span className="opacity-60 text-[10px] ml-0.5">• {plan.metadata.latencyMs}ms</span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-500/20 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy itinerary summary"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={onSavePlan}
                className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  isSaved
                    ? 'bg-emerald-600/30 text-emerald-300 border-emerald-400/40 font-semibold'
                    : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-200 border-emerald-500/20'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isSaved ? 'Saved' : 'Save Plan'}</span>
              </button>
            </div>
          </div>

          {/* Heading & Meta Pill Bar */}
          <div className="mt-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{plan.title}</span>
            </h2>

            {plan.summary && (
              <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed font-normal">
                {plan.summary}
              </p>
            )}

            {/* Quick Meta Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/15">
                <span className="text-[11px] text-emerald-300/60 block">Location</span>
                <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1 mt-0.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{plan.location}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/15">
                <span className="text-[11px] text-emerald-300/60 block">Duration</span>
                <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{plan.duration}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/15">
                <span className="text-[11px] text-emerald-300/60 block">Difficulty</span>
                <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1 mt-0.5">
                  <Flame className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{plan.difficulty}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/15">
                <span className="text-[11px] text-emerald-300/60 block">Best For</span>
                <span className="text-xs sm:text-sm font-semibold text-white truncate block mt-0.5">
                  {plan.best_for}
                </span>
              </div>
            </div>

            {plan.route_idea && (
              <div className="p-3 rounded-xl bg-emerald-900/20 border border-emerald-500/20 text-xs text-emerald-200/80 flex items-start gap-2">
                <Compass className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300">Route Concept: </strong>
                  {plan.route_idea}
                </div>
              </div>
            )}
          </div>

          {/* Step-by-Step Timeline Plan */}
          <div className="mt-8 pt-6 border-t border-emerald-500/15">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Your Step-by-Step Plan</span>
            </h3>

            <div className="space-y-3.5 relative pl-2">
              {/* Vertical connector line */}
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-emerald-500/20" />

              {plan.steps && plan.steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4 group">
                  <div className="relative z-10 w-9 h-9 rounded-xl bg-emerald-900/80 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-xs shrink-0 shadow-md">
                    {step.step || idx + 1}
                  </div>
                  <div className="flex-1 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/15 group-hover:border-emerald-500/30 transition-all">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-bold text-sm text-white">
                        {step.title}
                      </h4>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300">
                        {step.duration_min} min
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🎒 Bring & 🌱 Touch Grass Challenges Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-emerald-500/15">
            
            {/* Bring / Packing List */}
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/15 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Backpack className="w-4 h-4 text-emerald-400" />
                <span>🎒 What to Bring</span>
              </div>
              <ul className="space-y-2">
                {plan.packing_list && plan.packing_list.map((item, idx) => {
                  const isChecked = !!checkedItems[idx];
                  return (
                    <li 
                      key={idx}
                      onClick={() => toggleItem(idx)}
                      className="flex items-start gap-2.5 text-xs text-emerald-100/80 cursor-pointer select-none hover:text-white"
                    >
                      <button type="button" className="mt-0.5 text-emerald-400">
                        {isChecked ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-emerald-400/40" />
                        )}
                      </button>
                      <span className={isChecked ? 'line-through text-emerald-400/50' : ''}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 🌱 AI Touch Grass Challenge */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-green-950/40 border border-emerald-400/30 space-y-3 nature-glow">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>🌱 AI Touch Grass Challenge</span>
              </div>
              <p className="text-[11px] text-emerald-200/70 italic">
                Micro-quests to ground your senses in the physical world:
              </p>
              <ul className="space-y-2.5">
                {plan.touch_grass_challenge && plan.touch_grass_challenge.map((ch, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Safety & Local Conditions Notice */}
          <div className="mt-6 p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-200/80">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-amber-300">
                {plan.weather_note || 'Check current local conditions before heading out.'}
              </p>
              <p className="text-[11px] text-amber-200/60">
                Stay on marked paths, stay hydrated, respect private property, and inform someone of your route if exploring remote trails.
              </p>
            </div>
          </div>

          {/* Call-to-Action Bar */}
          <div className="mt-8 pt-6 border-t border-emerald-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="w-full sm:w-auto">
              {/* PRIMARY CTA: Start Adventure -> Triggers Screen-Off Mode */}
              <button
                onClick={onStartAdventure}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-green-500 to-lime-500 hover:from-emerald-300 hover:to-green-400 text-emerald-950 font-extrabold text-base shadow-xl shadow-emerald-950/80 flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-emerald-950" />
                <span>Start Adventure (Screen-Off Mode)</span>
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onGenerateAnother}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl glass-card hover:bg-emerald-900/40 text-emerald-200 text-xs font-semibold border border-emerald-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Generate Another</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
