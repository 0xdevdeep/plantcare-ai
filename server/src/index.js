import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateOutdoorPlan, checkAiStatus } from './services/aiService.js';
import { getChallenges } from './services/challengeService.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config(); // fallback to current working directory

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Root & Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'TrailMate AI Server',
    challenge: 'Touch Grass Open-Source AI Challenge',
    timestamp: new Date().toISOString(),
  });
});

// AI, Ollama & Cloud API Status
app.get('/api/status', async (req, res) => {
  try {
    const status = await checkAiStatus();
    res.json({
      success: true,
      ...status,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate Outdoor Plan
app.post('/api/plan', async (req, res) => {
  try {
    const { location, activity, duration, difficulty, group, goal, forceDemo, model, provider } = req.body;

    // Basic validation
    if (!location || !activity) {
      return res.status(400).json({
        success: false,
        error: 'Location and Activity are required fields.',
      });
    }

    const plan = await generateOutdoorPlan({
      location,
      activity,
      duration: duration || '1 hour',
      difficulty: difficulty || 'Easy',
      group: group || 'Alone',
      goal: goal || 'Relax',
      forceDemo: Boolean(forceDemo),
      model,
      provider,
    });

    res.json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error('Error generating plan:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate outdoor plan: ' + error.message,
    });
  }
});

// Challenges
app.get('/api/challenges', (req, res) => {
  const challenges = getChallenges(8);
  res.json({
    success: true,
    challenges,
  });
});

app.listen(PORT, () => {
  console.log(`🌿 TrailMate AI Server running on http://localhost:${PORT}`);
  console.log(`📡 Checking Ollama host at ${process.env.OLLAMA_HOST || 'http://localhost:11434'}`);
  console.log(`✨ Cloud AI API key configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
});
