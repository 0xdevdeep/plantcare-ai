import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Flame, 
  Users, 
  Target, 
  Sparkles, 
  Footprints, 
  Bike, 
  Mountain, 
  Trees, 
  Camera, 
  Flower2, 
  Feather, 
  Smile, 
  Compass, 
  Settings2,
  Cpu,
  Loader2,
  RefreshCw
} from 'lucide-react';

const ACTIVITIES = [
  { id: 'Walking', label: 'Walking', icon: Footprints },
  { id: 'Running', label: 'Running', icon: Flame },
  { id: 'Hiking', label: 'Hiking', icon: Mountain },
  { id: 'Cycling', label: 'Cycling', icon: Bike },
  { id: 'Gardening', label: 'Gardening', icon: Flower2 },
  { id: 'Birdwatching', label: 'Birdwatching', icon: Feather },
  { id: 'Nature exploration', label: 'Nature exploration', icon: Trees },
  { id: 'Photography', label: 'Photography', icon: Camera },
  { id: 'Relaxing outdoors', label: 'Relaxing outdoors', icon: Smile },
  { id: 'Surprise me', label: 'Surprise me', icon: Sparkles },
];

const DURATIONS = [
  { id: '30 minutes', label: '30 min', desc: 'Quick reset' },
  { id: '1 hour', label: '1 hour', desc: 'Standard walk' },
  { id: '2 hours', label: '2 hours', desc: 'Deep recharge' },
  { id: '3+ hours', label: '3+ hours', desc: 'Half-day trek' },
];

const DIFFICULTIES = [
  { id: 'Easy', label: 'Easy', color: 'border-emerald-500/50 text-emerald-300' },
  { id: 'Moderate', label: 'Moderate', color: 'border-amber-500/50 text-amber-300' },
  { id: 'Challenging', label: 'Challenging', color: 'border-rose-500/50 text-rose-300' },
];

const GROUPS = ['Alone', 'Friend', 'Group', 'Family'];

const GOALS = [
  { id: 'Relax', label: 'Relax' },
  { id: 'Exercise', label: 'Exercise' },
  { id: 'Explore', label: 'Explore' },
  { id: 'Clear my mind', label: 'Clear my mind' },
  { id: 'Nature', label: 'Nature immersion' },
  { id: 'Photography', label: 'Photography' },
  { id: 'Socialize', label: 'Socialize' },
];

const SAMPLE_LOCATIONS = [
  'Nagpur, Maharashtra',
  'Boulder, Colorado',
  'Kyoto, Japan',
  'Vancouver, BC',
  'Bengaluru, Karnataka',
  'Austin, Texas',
];

const LOADING_STEPS = [
  'Finding something worth leaving the house for...',
  'Querying open-weight model for nearby tree canopies...',
  'Checking natural daylight and outdoor calm score...',
  'Crafting step-by-step itinerary to minimize screen time...',
  'Assembling your real-world Touch Grass challenge...',
];

export function PlannerForm({ 
  formData, 
  setFormData, 
  onSubmit, 
  loading, 
  ollamaStatus,
  onOpenOllamaModal 
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);

  // Rotate loading step messages for realistic feel
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingStepIdx((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [loading]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuickLocation = (loc) => {
    setFormData((prev) => ({ ...prev, location: loc }));
  };

  return (
    <section id="planner" className="py-12 md:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Planner Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>AI Outdoor Planner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tell TrailMate your mood. <br className="hidden sm:block" />
            <span className="text-emerald-400">We'll get you outside in 60 seconds.</span>
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/70 mt-2 max-w-xl mx-auto">
            No precise GPS tracking required. Completely private, realistic outdoor planning powered by open-weight AI.
          </p>
        </div>

        {/* Main Planner Card */}
        <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl relative nature-glow border border-emerald-500/25">
          
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 z-20 rounded-3xl bg-[#08110b]/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl animate-bounce">🌱</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Generating Outdoor Itinerary...
              </h3>
              <p className="text-sm text-emerald-300 max-w-md h-12 flex items-center justify-center font-medium transition-all duration-300">
                “{LOADING_STEPS[loadingStepIdx]}”
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-emerald-200/50">
                <Cpu className="w-3.5 h-3.5" />
                <span>
                  {formData.forceDemo ? 'Open-Weights Demo Engine' : (ollamaStatus?.online ? `Inference via Ollama (${formData.model})` : 'Auto-fallback Engine')}
                </span>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-8">
            
            {/* 1. Location Input */}
            <div className="space-y-2.5">
              <label className="flex items-center justify-between text-sm font-semibold text-white">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Where are you?</span>
                </span>
                <span className="text-xs font-normal text-emerald-300/60">City, town, or area</span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g. Nagpur, Maharashtra"
                  className="w-full px-4 py-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white placeholder-emerald-100/30 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-sm transition-all shadow-inner"
                />
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-emerald-300/60 mr-1">Quick examples:</span>
                {SAMPLE_LOCATIONS.map((loc) => (
                  <button
                    type="button"
                    key={loc}
                    onClick={() => handleQuickLocation(loc)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      formData.location === loc
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold'
                        : 'bg-emerald-950/40 text-emerald-200/60 border-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-200'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Activity Type */}
            <div className="space-y-2.5">
              <label className="flex items-center justify-between text-sm font-semibold text-white">
                <span className="flex items-center gap-2">
                  <Trees className="w-4 h-4 text-emerald-400" />
                  <span>What do you want to do?</span>
                </span>
                <span className="text-xs font-normal text-emerald-300/60">Pick your movement</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {ACTIVITIES.map((act) => {
                  const Icon = act.icon;
                  const isSelected = formData.activity === act.id;
                  return (
                    <button
                      type="button"
                      key={act.id}
                      onClick={() => handleChange('activity', act.id)}
                      className={`p-3 rounded-xl border text-left flex flex-col items-start gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600/20 border-emerald-400 text-white shadow-md shadow-emerald-950'
                          : 'bg-emerald-950/30 border-emerald-500/15 text-emerald-200/70 hover:bg-emerald-950/60 hover:text-white hover:border-emerald-500/30'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-emerald-300/60'}`} />
                      <span className="text-xs font-medium leading-tight">{act.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Time & Difficulty in 2 cols */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* How much time */}
              <div className="space-y-2.5">
                <label className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>How much time do you have?</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {DURATIONS.map((dur) => {
                    const isSelected = formData.duration === dur.id;
                    return (
                      <button
                        type="button"
                        key={dur.id}
                        onClick={() => handleChange('duration', dur.id)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600/25 border-emerald-400 text-white font-bold'
                            : 'bg-emerald-950/30 border-emerald-500/15 text-emerald-200/70 hover:bg-emerald-950/50'
                        }`}
                      >
                        <div className="text-sm font-semibold">{dur.label}</div>
                        <div className="text-[10px] text-emerald-300/60">{dur.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty */}
              <div className="space-y-2.5">
                <label className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Flame className="w-4 h-4 text-emerald-400" />
                  <span>Difficulty Level</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {DIFFICULTIES.map((diff) => {
                    const isSelected = formData.difficulty === diff.id;
                    return (
                      <button
                        type="button"
                        key={diff.id}
                        onClick={() => handleChange('difficulty', diff.id)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? `bg-emerald-600/20 border-emerald-400 font-bold text-white shadow-sm`
                            : 'bg-emerald-950/30 border-emerald-500/15 text-emerald-200/70 hover:bg-emerald-950/50'
                        }`}
                      >
                        <div className="text-xs font-semibold">{diff.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* 4. Group & Goal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Who are you going with? */}
              <div className="space-y-2.5">
                <label className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Who are you going with?</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {GROUPS.map((grp) => {
                    const isSelected = formData.group === grp;
                    return (
                      <button
                        type="button"
                        key={grp}
                        onClick={() => handleChange('group', grp)}
                        className={`py-2.5 px-2 rounded-xl border text-center text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600/25 border-emerald-400 text-white font-bold'
                            : 'bg-emerald-950/30 border-emerald-500/15 text-emerald-200/70 hover:bg-emerald-950/50'
                        }`}
                      >
                        {grp}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* What is your goal? */}
              <div className="space-y-2.5">
                <label className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span>What is your primary goal?</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {GOALS.map((g) => {
                    const isSelected = formData.goal === g.id;
                    return (
                      <button
                        type="button"
                        key={g.id}
                        onClick={() => handleChange('goal', g.id)}
                        className={`px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/25 border-emerald-400 text-white font-semibold'
                            : 'bg-emerald-950/30 border-emerald-500/15 text-emerald-200/70 hover:border-emerald-500/30'
                        }`}
                      >
                        {g.label}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* AI Architecture & Engine Drawer toggle */}
            <div className="pt-2 border-t border-emerald-500/15">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-1.5 text-xs text-emerald-300/70 hover:text-emerald-300 transition-colors"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>AI Inference Settings ({formData.forceDemo ? 'Demo Mode' : (ollamaStatus?.online ? 'Ollama Local' : 'Auto Fallback')})</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenOllamaModal}
                  className="text-xs text-emerald-400/80 hover:text-emerald-300 underline underline-offset-2 flex items-center gap-1"
                >
                  <Cpu className="w-3 h-3" />
                  <span>Configure Ollama</span>
                </button>
              </div>

              {showAdvanced && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20 space-y-3">
                  <div className="flex items-center justify-between text-xs text-emerald-100/80">
                    <span>Engine Mode:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleChange('forceDemo', false)}
                        className={`px-2.5 py-1 rounded text-xs ${
                          !formData.forceDemo
                            ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 font-semibold'
                            : 'bg-emerald-950 text-emerald-400/60'
                        }`}
                      >
                        Local Ollama (Auto)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChange('forceDemo', true)}
                        className={`px-2.5 py-1 rounded text-xs ${
                          formData.forceDemo
                            ? 'bg-amber-500/30 text-amber-300 border border-amber-400/40 font-semibold'
                            : 'bg-emerald-950 text-emerald-400/60'
                        }`}
                      >
                        Judge Demo Mode
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-emerald-100/80">
                    <span>Target Open Model:</span>
                    <select
                      value={formData.model || 'llama3.2'}
                      onChange={(e) => handleChange('model', e.target.value)}
                      className="bg-emerald-900/60 border border-emerald-500/30 rounded px-2 py-1 text-white text-xs focus:outline-none"
                    >
                      <option value="llama3.2">Llama 3.2 (Recommended 3B)</option>
                      <option value="llama3">Llama 3 (8B)</option>
                      <option value="qwen2.5">Qwen 2.5 (7B)</option>
                      <option value="gemma2">Gemma 2 (9B)</option>
                      <option value="mistral">Mistral (7B)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-400 text-emerald-950 font-extrabold text-lg shadow-xl shadow-emerald-950/80 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>🌱 Get Me Outside</span>
              </button>
              <p className="text-center text-[11px] text-emerald-300/50 mt-2">
                Generates a safe outdoor route, packing list, and Touch Grass quest in seconds.
              </p>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
