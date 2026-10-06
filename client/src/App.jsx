import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemStory } from './components/ProblemStory';
import { PlannerForm } from './components/PlannerForm';
import { PlanResult } from './components/PlanResult';
import { ScreenOffMode } from './components/ScreenOffMode';
import { OutdoorChallenges } from './components/OutdoorChallenges';
import { WhyOpenAI } from './components/WhyOpenAI';
import { TakeItOutside } from './components/TakeItOutside';
import { ChallengeJudging } from './components/ChallengeJudging';
import { OllamaStatusModal } from './components/OllamaStatusModal';
import { AdventureLogModal } from './components/AdventureLogModal';
import { Footer } from './components/Footer';
import { 
  getSavedPlans, 
  savePlanToStorage, 
  removeSavedPlan, 
  getAdventureLogs, 
  addAdventureLog, 
  getCompletedChallenges, 
  toggleChallengeCompletion 
} from './utils/storage';

const INITIAL_FORM = {
  location: 'Nagpur, Maharashtra',
  activity: 'Walking',
  duration: '90 minutes',
  difficulty: 'Easy',
  group: 'Alone',
  goal: 'Relax',
  forceDemo: false,
  model: 'llama3.2',
};

export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Status & Modals
  const [ollamaStatus, setOllamaStatus] = useState(null);
  const [isOllamaModalOpen, setIsOllamaModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [screenOffMode, setScreenOffMode] = useState(false);

  // Challenges & Journal
  const [challenges, setChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [savedPlans, setSavedPlans] = useState([]);
  const [adventureLogs, setAdventureLogs] = useState([]);
  const [completedAdventureData, setCompletedAdventureData] = useState(null);

  // Fetch status, challenges, and localStorage on initial mount
  useEffect(() => {
    fetchStatus();
    fetchChallenges();
    setSavedPlans(getSavedPlans());
    setAdventureLogs(getAdventureLogs());
    setCompletedChallenges(getCompletedChallenges());
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setOllamaStatus({
          ...(data.ollama || {}),
          geminiConfigured: data.gemini?.configured,
          geminiModel: data.gemini?.model,
          activeProvider: data.activeProvider,
        });
      }
    } catch (e) {
      console.warn('Could not reach /api/status:', e.message);
    }
  };

  const fetchChallenges = async () => {
    try {
      const res = await fetch('/api/challenges');
      if (res.ok) {
        const data = await res.json();
        setChallenges(data.challenges || []);
      }
    } catch (e) {
      console.warn('Could not fetch challenges from server:', e.message);
    }
  };

  const generatePlan = async (customParams = null) => {
    setLoading(true);
    setError(null);
    const paramsToUse = customParams || formData;

    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paramsToUse),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned status ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.plan) {
        setPlan(data.plan);

        // Smooth scroll to result
        setTimeout(() => {
          const el = document.getElementById('plan-result');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);

        // Subtle celebration burst
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#22c55e', '#4ade80', '#10b981'],
        });
      } else {
        throw new Error('Invalid plan response from server');
      }
    } catch (err) {
      console.error('Plan generation failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePlan();
  };

  // Quick Demo Trigger
  const handleQuickDemo = () => {
    const demoParams = {
      location: 'Nagpur, Maharashtra',
      activity: 'Nature exploration',
      duration: '90 minutes',
      difficulty: 'Easy',
      group: 'Alone',
      goal: 'Relax',
      forceDemo: true,
      model: 'llama3.2',
    };
    setFormData(demoParams);
    generatePlan(demoParams);
  };

  // Save Plan
  const handleSavePlan = () => {
    if (!plan) return;
    savePlanToStorage(plan);
    setSavedPlans(getSavedPlans());
  };

  const isPlanSaved = plan && savedPlans.some(p => p.title === plan.title);

  const handleRemoveSavedPlan = (id) => {
    const updated = removeSavedPlan(id);
    setSavedPlans(updated);
  };

  const handleSelectSavedPlan = (saved) => {
    setPlan(saved);
    setTimeout(() => {
      const el = document.getElementById('plan-result');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Screen Off Mode handlers
  const handleStartAdventure = () => {
    setScreenOffMode(true);
  };

  const handleCompleteAdventure = (data) => {
    setScreenOffMode(false);
    setCompletedAdventureData(data);
    setTimeout(() => {
      const el = document.getElementById('take-it-outside');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  // Challenge completion handler
  const handleToggleChallenge = (id) => {
    const updated = toggleChallengeCompletion(id);
    setCompletedChallenges(updated);
  };

  // Log adventure handler
  const handleLogAdventure = (entry) => {
    const updated = addAdventureLog(entry);
    setAdventureLogs(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070f0a] text-[#edf6ee]">
      
      {/* Top Navigation */}
      <Navbar
        ollamaStatus={ollamaStatus}
        onOpenOllamaModal={() => setIsOllamaModalOpen(true)}
        onOpenLogModal={() => setIsLogModalOpen(true)}
        onQuickDemo={handleQuickDemo}
        activePlanCount={savedPlans.length}
      />

      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero
          onPlanClick={() => {
            document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onHowItWorksClick={() => {
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onQuickDemo={handleQuickDemo}
        />

        {/* 2. Problem & Philosophy Story */}
        <ProblemStory />

        {/* 3. AI Outdoor Planner Form */}
        <PlannerForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          loading={loading}
          ollamaStatus={ollamaStatus}
          onOpenOllamaModal={() => setIsOllamaModalOpen(true)}
        />

        {/* Error Notice */}
        {error && (
          <div className="max-w-4xl mx-auto px-4 mb-8">
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
              <span>Could not generate plan: {error}</span>
              <button
                onClick={() => generatePlan()}
                className="underline font-semibold hover:text-white"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* 4. AI Result Card (Visible once generated) */}
        {plan && (
          <PlanResult
            plan={plan}
            onStartAdventure={handleStartAdventure}
            onSavePlan={handleSavePlan}
            onGenerateAnother={() => generatePlan()}
            isSaved={isPlanSaved}
          />
        )}

        {/* 5. Touch Grass Challenges Section */}
        <OutdoorChallenges
          challenges={challenges}
          completedList={completedChallenges}
          onToggleComplete={handleToggleChallenge}
        />

        {/* 6. Why Open AI? Section */}
        <WhyOpenAI
          ollamaStatus={ollamaStatus}
          onOpenOllamaModal={() => setIsOllamaModalOpen(true)}
        />

        {/* 7. Take It Outside Section */}
        <TakeItOutside
          adventureLogs={adventureLogs}
          onLogAdventure={handleLogAdventure}
          completedAdventureData={completedAdventureData}
        />

        {/* 8. Built for Touch Grass Judging Section */}
        <ChallengeJudging />

      </main>

      {/* Screen-Off Mode Overlay */}
      {screenOffMode && (
        <ScreenOffMode
          plan={plan}
          onClose={() => setScreenOffMode(false)}
          onCompleteAdventure={handleCompleteAdventure}
        />
      )}

      {/* Ollama & Open Model Status Modal */}
      <OllamaStatusModal
        isOpen={isOllamaModalOpen}
        onClose={() => setIsOllamaModalOpen(false)}
        ollamaStatus={ollamaStatus}
        onRefreshStatus={fetchStatus}
        currentModel={formData.model}
        onSelectModel={(m) => setFormData(prev => ({ ...prev, model: m }))}
      />

      {/* Adventure Log / Journal Modal */}
      <AdventureLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        savedPlans={savedPlans}
        adventureLogs={adventureLogs}
        onSelectPlan={handleSelectSavedPlan}
        onRemovePlan={handleRemoveSavedPlan}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
