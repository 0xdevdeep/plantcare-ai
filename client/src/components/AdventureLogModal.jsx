import React, { useState } from 'react';
import { X, BookOpen, Trash2, ExternalLink, Calendar, MapPin, Clock, Award, CheckCircle2 } from 'lucide-react';

export function AdventureLogModal({ 
  isOpen, 
  onClose, 
  savedPlans = [], 
  adventureLogs = [], 
  onSelectPlan, 
  onRemovePlan 
}) {
  const [tab, setTab] = useState('saved');

  if (!isOpen) return null;

  const totalMin = adventureLogs.reduce((acc, c) => acc + (parseInt(c.durationMinutes, 10) || 45), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl glass-panel rounded-3xl border border-emerald-500/30 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Outdoor Adventure Journal</h3>
              <p className="text-xs text-emerald-200/60">Saved Itineraries & Grass Touched History</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-300/60 hover:text-white hover:bg-emerald-950/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Pill */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/15">
            <div className="text-[11px] text-emerald-300/60">Total Outdoor Time</div>
            <div className="text-lg font-black text-white font-mono mt-0.5">{totalMin} Minutes</div>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/15">
            <div className="text-[11px] text-emerald-300/60">Adventures Logged</div>
            <div className="text-lg font-black text-white font-mono mt-0.5">{adventureLogs.length} Completed</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-emerald-500/20 text-xs font-semibold">
          <button
            onClick={() => setTab('saved')}
            className={`pb-2.5 px-4 border-b-2 transition-all cursor-pointer ${
              tab === 'saved'
                ? 'border-emerald-400 text-emerald-300 font-bold'
                : 'border-transparent text-emerald-200/60 hover:text-emerald-100'
            }`}
          >
            Saved Plans ({savedPlans.length})
          </button>
          <button
            onClick={() => setTab('history')}
            className={`pb-2.5 px-4 border-b-2 transition-all cursor-pointer ${
              tab === 'history'
                ? 'border-emerald-400 text-emerald-300 font-bold'
                : 'border-transparent text-emerald-200/60 hover:text-emerald-100'
            }`}
          >
            Completed History ({adventureLogs.length})
          </button>
        </div>

        {/* Tab 1: Saved Plans */}
        {tab === 'saved' && (
          <div className="space-y-3">
            {savedPlans.length === 0 ? (
              <div className="py-8 text-center text-xs text-emerald-200/50">
                No saved plans yet. Generate an itinerary and click "Save Plan" to keep it here.
              </div>
            ) : (
              savedPlans.map((plan) => (
                <div
                  key={plan.savedId || plan.title}
                  className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/15 flex items-center justify-between gap-3 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-white truncate">{plan.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200/60 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span className="truncate">{plan.location}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>{plan.duration}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        onSelectPlan(plan);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-emerald-950 text-xs font-bold hover:bg-emerald-400 transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onRemovePlan(plan.savedId)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors"
                      title="Delete saved plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Completed History */}
        {tab === 'history' && (
          <div className="space-y-3">
            {adventureLogs.length === 0 ? (
              <div className="py-8 text-center text-xs text-emerald-200/50">
                No completed adventures recorded yet. Use Screen-Off Mode or check off the "Take It Outside" list to log an adventure.
              </div>
            ) : (
              adventureLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/15 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{log.rating?.emoji || '🌿'}</span>
                      <h4 className="font-bold text-sm text-white">{log.activity}</h4>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300">
                      {log.durationMinutes} min
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-emerald-200/60">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{log.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      <span>{new Date(log.completedAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  {log.note && (
                    <p className="text-xs text-emerald-100/70 italic bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-500/10">
                      “{log.note}”
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          Close
        </button>

      </div>
    </div>
  );
}
