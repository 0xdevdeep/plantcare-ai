import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Sparkles, 
  Send, 
  History, 
  MapPin, 
  Clock, 
  Calendar, 
  Flame,
  Award,
  CheckCircle2,
  Trees
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CHECKLIST_ITEMS = [
  'Leave the house',
  'Put your phone away',
  'Complete the activity',
  'Touch grass',
  'Come back',
];

const RATINGS = [
  { emoji: '😊', label: 'Great', key: 'great' },
  { emoji: '🌿', label: 'Peaceful', key: 'peaceful' },
  { emoji: '🏃', label: 'Energizing', key: 'energizing' },
  { emoji: '😐', label: 'Okay', key: 'okay' },
  { emoji: '😴', label: 'Tiring', key: 'tiring' },
];

export function TakeItOutside({ 
  adventureLogs = [], 
  onLogAdventure,
  completedAdventureData 
}) {
  const [checkedSteps, setCheckedSteps] = useState([false, false, false, false, false]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [reflectionNote, setReflectionNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleStep = (idx) => {
    const updated = [...checkedSteps];
    updated[idx] = !updated[idx];
    setCheckedSteps(updated);

    // If all 5 checked, trigger confetti
    if (updated.every(Boolean)) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#10b981', '#34d399', '#f59e0b'],
      });
    }
  };

  const allChecked = checkedSteps.every(Boolean);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!selectedRating) return;

    onLogAdventure({
      activity: completedAdventureData?.planTitle || 'Outdoor Trek',
      location: completedAdventureData?.location || 'Local Park',
      durationMinutes: completedAdventureData?.minutesElapsed || 45,
      rating: selectedRating,
      note: reflectionNote,
      allChecklistDone: allChecked,
    });

    setSubmitted(true);
    confetti({
      particleCount: 90,
      spread: 90,
      origin: { y: 0.5 },
    });

    setTimeout(() => {
      setSubmitted(false);
      setCheckedSteps([false, false, false, false, false]);
      setSelectedRating(null);
      setReflectionNote('');
    }, 4000);
  };

  // Calculate total outdoor minutes logged
  const totalMinutes = adventureLogs.reduce((acc, cur) => acc + (parseInt(cur.durationMinutes, 10) || 45), 0);

  return (
    <section id="take-it-outside" className="py-16 md:py-24 relative border-t border-emerald-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Trees className="w-3.5 h-3.5" />
            <span>Real-World Action</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Don’t just generate a plan. <br />
            <span className="text-emerald-400">Go do it.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-emerald-100/70">
            Digital tools are worthless if you don’t cross the front door threshold. Check off your actual journey below.
          </p>
        </div>

        {/* Main 2-column Card: The Checklist + Post-Activity Feedback */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Column 1: The 5-Step Take It Outside Checklist */}
          <div className="md:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/25 nature-glow space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-white">The Outdoor Contract</h3>
                <span className="text-xs font-mono text-emerald-300">
                  {checkedSteps.filter(Boolean).length}/5 Done
                </span>
              </div>
              <p className="text-xs text-emerald-200/60 mt-1">
                Tick each step as you physically execute it in the real world:
              </p>
            </div>

            <div className="space-y-3">
              {CHECKLIST_ITEMS.map((item, idx) => {
                const isDone = checkedSteps[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 select-none ${
                      isDone
                        ? 'bg-emerald-950/70 border-emerald-400/40 text-emerald-200'
                        : 'bg-emerald-950/30 border-emerald-500/15 text-emerald-100/70 hover:bg-emerald-950/50 hover:text-white'
                    }`}
                  >
                    <button type="button" className="text-emerald-400 shrink-0">
                      {isDone ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-emerald-500/40" />
                      )}
                    </button>
                    <span className={`text-sm font-medium ${isDone ? 'line-through text-emerald-400/60 font-normal' : ''}`}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>

            {allChecked && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-xs text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>You completed the full circle! Touch grass achievement unlocked.</span>
              </div>
            )}
          </div>

          {/* Column 2: How was it? Post-Activity Feedback */}
          <div className="md:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/25 space-y-6">
            <div>
              <h3 className="font-bold text-lg text-white">How was it?</h3>
              <p className="text-xs text-emerald-200/60 mt-1">
                Help future AI recommendations adapt to what felt restorative or draining.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center rounded-2xl bg-emerald-950/60 border border-emerald-500/30 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-lg text-white">Adventure Logged!</h4>
                <p className="text-xs text-emerald-200/70">
                  Great work reconnecting with nature. Your grass-touched streak continues.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-5">
                
                {/* Rating Buttons */}
                <div className="grid grid-cols-5 gap-2">
                  {RATINGS.map((r) => {
                    const isSelected = selectedRating?.key === r.key;
                    return (
                      <button
                        type="button"
                        key={r.key}
                        onClick={() => setSelectedRating(r)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/30 border-emerald-400 scale-105 shadow-md shadow-emerald-950'
                            : 'bg-emerald-950/30 border-emerald-500/15 text-emerald-200/70 hover:bg-emerald-900/40'
                        }`}
                      >
                        <span className="text-2xl">{r.emoji}</span>
                        <span className="text-[10px] font-semibold text-emerald-100">{r.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Reflection Note */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-emerald-200">
                    Quick Outdoor Reflection (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={reflectionNote}
                    onChange={(e) => setReflectionNote(e.target.value)}
                    placeholder="e.g. Felt great leaving my notifications behind. The evening breeze by the lake was worth the walk."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white placeholder-emerald-200/30 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!selectedRating}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-40 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log Adventure & Calibrate AI</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Adventure Log Summary Banner */}
        <div className="glass-card p-6 rounded-2xl border border-emerald-500/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Your Outdoor Impact</h4>
                <p className="text-xs text-emerald-200/60">
                  {adventureLogs.length} total adventures logged • {totalMinutes} cumulative minutes spent off screens
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                🌱 {totalMinutes} min outside
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
