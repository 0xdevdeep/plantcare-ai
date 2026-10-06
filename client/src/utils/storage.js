// storage.js - LocalStorage utilities for TrailMate adventures and challenges

const SAVED_PLANS_KEY = 'trailmate_saved_plans';
const ADVENTURE_LOGS_KEY = 'trailmate_adventure_logs';
const COMPLETED_CHALLENGES_KEY = 'trailmate_completed_challenges';

export function getSavedPlans() {
  try {
    const raw = localStorage.getItem(SAVED_PLANS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePlanToStorage(plan) {
  try {
    const plans = getSavedPlans();
    const planWithId = {
      ...plan,
      savedId: 'plan_' + Date.now(),
      savedAt: new Date().toISOString(),
    };
    const updated = [planWithId, ...plans.filter(p => p.title !== plan.title)].slice(0, 20);
    localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(updated));
    return planWithId;
  } catch (e) {
    console.error('Failed to save plan:', e);
    return plan;
  }
}

export function removeSavedPlan(savedId) {
  try {
    const plans = getSavedPlans().filter(p => p.savedId !== savedId);
    localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(plans));
    return plans;
  } catch {
    return [];
  }
}

export function getAdventureLogs() {
  try {
    const raw = localStorage.getItem(ADVENTURE_LOGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addAdventureLog(entry) {
  try {
    const logs = getAdventureLogs();
    const newEntry = {
      id: 'log_' + Date.now(),
      completedAt: new Date().toISOString(),
      ...entry,
    };
    const updated = [newEntry, ...logs];
    localStorage.setItem(ADVENTURE_LOGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to log adventure:', e);
    return [];
  }
}

export function getCompletedChallenges() {
  try {
    const raw = localStorage.getItem(COMPLETED_CHALLENGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleChallengeCompletion(challengeId) {
  try {
    const completed = getCompletedChallenges();
    let updated;
    if (completed.includes(challengeId)) {
      updated = completed.filter(id => id !== challengeId);
    } else {
      updated = [...completed, challengeId];
    }
    localStorage.setItem(COMPLETED_CHALLENGES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
