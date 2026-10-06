import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, CheckCircle, X, Sparkles, PhoneOff } from 'lucide-react';
import { toggleAmbientSound, isAmbientPlaying, stopAmbientSound } from '../utils/audioSynth';

export function ScreenOffMode({ 
  plan, 
  onClose, 
  onCompleteAdventure 
}) {
  // Parse total duration in minutes (default to 45 min for next check-in or half of plan duration)
  const rawMinutes = parseInt(plan?.duration, 10) || 45;
  const initialSeconds = rawMinutes * 60;

  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  const [soundPlaying, setSoundPlaying] = useState(false);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((sec) => sec - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  const handleToggleSound = () => {
    const nextState = toggleAmbientSound((state) => setSoundPlaying(state));
    setSoundPlaying(nextState);
  };

  const handleToggleTimer = () => {
    setIsActive(!isActive);
  };

  // Format MM:SS
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  // Progress percentage
  const progressPct = ((initialSeconds - secondsRemaining) / initialSeconds) * 100;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPct / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 bg-[#050a06] text-[#e0fae3] flex flex-col justify-between items-center p-6 sm:p-10 select-none animate-fade-in overflow-hidden">
      
      {/* Top minimal header */}
      <div className="w-full max-w-xl flex items-center justify-between text-xs text-emerald-400/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-mono uppercase tracking-widest text-[11px] text-emerald-300">Active Adventure</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Ambient Sound Generator Button */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              soundPlaying 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400' 
                : 'bg-emerald-950/40 text-emerald-400/50 border-emerald-500/20 hover:text-emerald-300'
            }`}
            title="Toggle synthesized gentle forest wind"
          >
            {soundPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Exit without logging */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400/50 hover:text-emerald-200 hover:border-emerald-500/40 transition-all cursor-pointer"
            title="Exit Screen-Off Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Centerpiece: Minimal intentional void */}
      <div className="my-auto text-center flex flex-col items-center max-w-md space-y-8">
        
        {/* The Core Directive */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white flex items-center justify-center gap-3">
            <span>🌱</span>
            <span>GO OUTSIDE.</span>
          </h1>
          <p className="text-base sm:text-lg text-emerald-300/80 font-medium">
            Your adventure has started.
          </p>
        </div>

        {/* Circular Timer Ring */}
        <div className="relative w-56 h-56 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="112"
              cy="112"
              r={radius}
              stroke="rgba(16, 50, 26, 0.5)"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Active progress ring */}
            <circle
              cx="112"
              cy="112"
              r={radius}
              stroke="#22c55e"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          {/* Digital Time Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold tracking-tight font-mono text-white">
              {formattedTime}
            </span>
            <span className="text-xs uppercase tracking-wider text-emerald-400/60 font-semibold mt-1">
              Next Check-In: {Math.max(1, Math.round(mins))} min
            </span>
          </div>
        </div>

        {/* The Screen-Off Rule */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/15 max-w-xs text-center space-y-1">
          <div className="text-base font-bold text-emerald-300 flex items-center justify-center gap-2">
            <PhoneOff className="w-4 h-4 text-emerald-400" />
            <span>📵 Phone down. Look around.</span>
          </div>
          <p className="text-xs text-emerald-200/50">
            {plan?.screen_off_message || 'The real world is right here in front of you.'}
          </p>
        </div>

        {/* Subtle Quest Reminder */}
        {plan?.touch_grass_challenge?.[0] && (
          <div className="text-xs text-emerald-300/70 italic flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Task: {plan.touch_grass_challenge[0]}</span>
          </div>
        )}

      </div>

      {/* Bottom control bar */}
      <div className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-3">
        
        {/* Pause/Resume Timer */}
        <button
          onClick={handleToggleTimer}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-950/60 border border-emerald-500/25 hover:bg-emerald-900/50 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isActive ? 'Pause Timer' : 'Resume Timer'}</span>
        </button>

        {/* I'm Back / Complete Adventure -> Triggers checklist */}
        <button
          onClick={() => {
            stopAmbientSound();
            onCompleteAdventure({
              minutesElapsed: Math.max(5, Math.round((initialSeconds - secondsRemaining) / 60)),
              planTitle: plan?.title || 'Outdoor Activity',
              location: plan?.location || 'Local Trail',
            });
          }}
          className="w-full sm:w-auto flex-1 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <CheckCircle className="w-4 h-4" />
          <span>I'm Back (Touch Grass Done)</span>
        </button>

      </div>

    </div>
  );
}
