import React, { useState } from 'react';
import { 
  Leaf, 
  Feather, 
  PhoneOff, 
  Eye, 
  Ear, 
  TreePine, 
  Compass, 
  Sprout, 
  CheckCircle2, 
  Circle, 
  Sparkles,
  Trophy,
  Shuffle
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  Leaf,
  Feather,
  SmartphoneOff: PhoneOff,
  PhoneOff,
  Eye,
  Ear,
  TreePine,
  Compass,
  Sprout,
};

export function OutdoorChallenges({ 
  challenges = [], 
  completedList = [], 
  onToggleComplete 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Flora', 'Fauna', 'Presence', 'Mindfulness', 'Sensory', 'Rest', 'Exploration', 'Grounding'];

  const filtered = selectedCategory === 'All' 
    ? challenges 
    : challenges.filter(c => c.category === selectedCategory);

  const handleToggle = (id) => {
    const isNowDone = !completedList.includes(id);
    onToggleComplete(id);
    if (isNowDone) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#22c55e', '#4ade80', '#10b981', '#f59e0b'],
      });
    }
  };

  const completedCount = completedList.length;

  return (
    <section id="challenges" className="py-16 md:py-24 relative border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Real-World Micro-Quests</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Touch Grass Challenges
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/70 mt-2 max-w-xl">
              Micro-experiments designed to awaken your physical senses, break the screen trance, and connect directly with living ecosystems.
            </p>
          </div>

          {/* Gamified progress badge */}
          <div className="p-4 rounded-2xl glass-panel border border-emerald-500/30 flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-xs text-emerald-300/70 font-medium">Challenges Completed</div>
              <div className="text-xl font-black text-white font-mono flex items-center gap-1">
                <span>{completedCount}</span>
                <span className="text-emerald-400/50 text-sm font-normal">/ {challenges.length} Done</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-emerald-950 font-bold shadow-md shadow-emerald-950'
                  : 'bg-emerald-950/40 text-emerald-200/70 border border-emerald-500/15 hover:border-emerald-500/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const Icon = ICON_MAP[item.icon] || Sprout;
            const isCompleted = completedList.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleToggle(item.id)}
                className={`group p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none ${
                  isCompleted
                    ? 'bg-emerald-950/50 border-emerald-400/40 shadow-lg shadow-emerald-950/60'
                    : 'glass-card border-emerald-500/15 hover:border-emerald-400/30 hover:translate-y-[-2px]'
                }`}
              >
                <div>
                  {/* Top Bar with Icon & Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isCompleted ? 'bg-emerald-500 text-emerald-950' : 'bg-emerald-900/40 text-emerald-300 group-hover:text-emerald-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/20">
                        {item.timeEstimate}
                      </span>
                      <button type="button" className="text-emerald-400">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-emerald-500/30 group-hover:text-emerald-400/70" />
                        )}
                      </button>
                    </div>
                  </div>

                  <h3 className={`font-bold text-sm tracking-tight ${
                    isCompleted ? 'text-emerald-300 line-through' : 'text-white'
                  }`}>
                    {item.title}
                  </h3>

                  <p className="text-xs text-emerald-100/70 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="pt-4 mt-3 border-t border-emerald-500/10 flex items-center justify-between text-[11px] text-emerald-300/50">
                  <span>Category: {item.category}</span>
                  <span className={isCompleted ? 'text-emerald-400 font-bold' : ''}>
                    {isCompleted ? 'Completed ✓' : 'Tap when done'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Organic quote card with tactile imagery */}
        <div className="mt-12 rounded-3xl overflow-hidden glass-panel border border-emerald-500/20 grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-8 p-6 sm:p-10 space-y-3">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">The Sensory Antidote</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Direct tactile feedback resets the nervous system.
            </h3>
            <p className="text-sm text-emerald-100/75 leading-relaxed">
              When your hands touch natural dew, soil, bark, or river pebbles, your sensory receptors send calming parasympathetic signals to your brain.
              No notification or screen brightness can replicate the feeling of cool morning grass.
            </p>
          </div>
          <div className="md:col-span-4 h-48 md:h-full relative overflow-hidden">
            <img 
              src="/assets/macro_grass.jpg" 
              alt="Close up photography of morning grass with crystal dew droplets"
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-[#0b1b10] opacity-60" />
          </div>
        </div>

      </div>
    </section>
  );
}
