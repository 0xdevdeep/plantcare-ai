# 🌱 TrailMate AI — Touch Grass Outdoor Companion

> **“Plan quickly → Leave the screen → Touch Grass.”**  
> An open-weight AI outdoor activity companion built for the **“Touch Grass” Open-Source AI Challenge**.

---

## 📖 Core Philosophy

People have endless apps engineered to maximize digital dwell time, infinite scrolling, and attention capture. Very few tools are intentionally designed to make the screen itself unnecessary.

**TrailMate AI takes the opposite approach:**  
Use open-weight AI for **30 seconds** so you can stop looking at your phone for the next **2 hours**.

Instead of trapping you in endless review comparison loops, TrailMate turns a simple intention:
> *“I have 2 hours this evening, I want something relaxing and I like nature.”*

Into a structured, realistic, and safe outdoor action plan:
- 🌿 **Curated Activity & Location**: Tailored to your local geography (e.g. Nagpur lake trails, forest tracks)
- ⏱️ **Timeline Itinerary**: Structured warm-up, exploration, sensory pause, and return
- 🎒 **Tactical Packing List**: Only the essentials
- 🌱 **Touch Grass Challenges**: Real-world sensory micro-quests (leaf inspection, bird spotting, soil touch)
- 📵 **Screen-Off Mode**: Minimal circular countdown and phone-down mantra to unplug immediately

---

## ⚡ Why Open AI?

Your outdoor plans and personal habits shouldn't require handing your locations, daily routines, and health goals to a proprietary, black-box AI service.

TrailMate AI is architected from the ground up around **open-weight models**:

1. **Local-First & Offline Ready**: Runs on-device with zero internet connection required using [Ollama](https://ollama.com).
2. **Strict Privacy**: Location strings and group dynamics never leave your local hardware.
3. **Model Freedom**: Easily swap between **Llama 3.2 (3B)**, **Qwen 2.5 (7B)**, **Gemma 2 (9B)**, or **Mistral (7B)**.
4. **Hackable & Auditable**: Modify system prompts, temperature parameters, and safety rules without closed-source constraints.
5. **No Subscription Paywalls**: Zero token fees, zero rate limits, and zero tracking cookies.

> *“The goal isn’t to put more AI between people and the real world. It’s to use AI as the shortest possible bridge to it.”*

---

## 🏛️ System Architecture

```text
┌────────────────────────────────────────────────────────┐
│                   BROWSER FRONTEND                     │
│         (React 18 + Vite + Tailwind CSS + Lucide)      │
│  • Nature-inspired UI     • Screen-Off Mode Countdown  │
│  • Touch Grass Challenges • LocalStorage Adventure Log │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTP / JSON (Proxy /api)
                           ▼
┌────────────────────────────────────────────────────────┐
│                   BACKEND API ROUTER                   │
│             (Node.js + Express on Port 3001)           │
│  • Modular AI Provider Engine (/api/plan)              │
│  • Ollama Healthcheck & Model Discovery (/api/status)  │
│  • Micro-Quests Catalog (/api/challenges)              │
└──────────────┬──────────────────────────┬──────────────┘
               │                          │
       (If Ollama Online)         (If Offline or Demo Mode)
               ▼                          ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│        LOCAL OLLAMA          │ │   OPEN-WEIGHT DEMO ENGINE    │
│    (http://localhost:11434)  │ │ (Heuristic Open Intelligence)│
│  • Llama 3.2 (3B GGUF)       │ │ • Instant judge evaluation   │
│  • Qwen 2.5 / Gemma 2        │ │ • Rich realistic geography   │
│  • Strict JSON Schema Prompt │ │ • Transparent badge metadata │
└──────────────────────────────┘ └──────────────────────────────┘
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node)
- *(Optional, for live local neural inference)*: [Ollama](https://ollama.com)

---

### Step 1: Install Dependencies

From the project root:

```bash
# Install root orchestration tools
npm install

# Install client and server dependencies
npm run install:all
```

Or individually:
```bash
cd server && npm install
cd ../client && npm install
```

---

### Step 2: Start Development Servers

You can launch both the frontend and backend concurrently with one command from the project root:

```bash
npm run dev
```

Or start them in separate terminals:

**Terminal 1 (Backend API):**
```bash
cd server
npm start
# Runs on http://localhost:3001
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# Runs on http://localhost:5173
```

Open your browser at **`http://localhost:5173`**.

---

## 🦙 Running with Local Ollama (100% On-Device AI)

TrailMate AI is designed to seamlessly auto-detect a local Ollama instance running on your machine.

### 1. Install Ollama
Download and install Ollama from [ollama.com](https://ollama.com).

### 2. Pull & Run an Open-Weight Model
Run any of the following open models in your terminal:

```bash
# Recommended: Fast, high accuracy, lightweight
ollama run llama3.2

# Alternatively:
ollama run qwen2.5
ollama run gemma2
ollama run mistral
```

### 3. Verify Connection
- Open TrailMate AI at `http://localhost:5173`.
- Click the **AI Status pill** in the navbar.
- The modal will confirm `Ollama Daemon Connected` at `http://localhost:11434` and display your downloaded models.
- Any generated plans will display the live badge: `⚡ Generated via Ollama (llama3.2)`.

---

## 🎯 Demo Mode for Judges & Evaluators

If Ollama is not installed on the evaluation machine:
- Click the **“Try Demo”** button in the header or hero section.
- TrailMate AI pre-fills a realistic outdoor request (**Nagpur, Maharashtra**, Nature Exploration, 90 min, Easy, Relax).
- The built-in **Open Demo Engine** instantly generates a detailed itinerary without breaking or hanging.
- The output is clearly labeled with metadata (`provider: demo-engine`) maintaining complete transparency.

---

## 📱 Key Features Walkthrough

### 1. AI Outdoor Planner
- **Manual City / Region Input**: Works for any location without tracking your GPS coordinates.
- **Activity Pickers**: Walking, Running, Hiking, Cycling, Gardening, Birdwatching, Nature exploration, Photography, Relaxing outdoors, Surprise me.
- **Time Constraints**: 30 min, 1 hour, 2 hours, 3+ hours.
- **Difficulty & Goal Alignment**: Adapts pace and sensory prompts to your exact intention.

### 2. Outdoor Activity Plan Card
- **Structured Timeline**: Minute-by-minute breakdown (Start & warm-up, Explore, Touch Grass Challenge, Return).
- **Pack List**: Interactive checkboxes for essentials (water, shoes, towel).
- **Touch Grass Challenge**: 3 real-world observation quests tailored to the environment.
- **Local Conditions Warning**: Safety reminders to check daylight and weather before departing.

### 3. 📵 Screen-Off Mode
- Triggered by clicking **“Start Adventure”**.
- Turns the phone into an intentional void:
  - Heading: `# 🌱 GO OUTSIDE.`
  - **Your adventure has started.**
  - **Next check-in countdown timer** with animated circular ring.
  - **Phone down. Look around.**
  - Native Web Audio synthesizer for ambient forest breeze.
  - Quick button to mark adventure complete.

### 4. 🌱 Touch Grass Challenges
- Micro-quests: Finding 3 leaf shapes, 2 bird species, 20-minute digital detox, observing unseen insects, sound mapping, tree sitting.
- Category filters (Flora, Fauna, Presence, Sensory, Rest, Exploration).
- Interactive completion tracking saved in `localStorage`.

### 5. 🥾 “Take It Outside” Checklist & Journal
- Physical execution checklist:
  - ☑ Leave the house
  - ☑ Put your phone away
  - ☑ Complete the activity
  - ☑ Touch grass
  - ☑ Come back
- Post-adventure reflection rating: 😊 Great, 🌿 Peaceful, 🏃 Energizing, 😐 Okay, 😴 Tiring.
- Tracks cumulative outdoor minutes and grass-touched streaks.

---

## ⚙️ Environment Variables

Create `server/.env` (or use the included default):

```env
PORT=3001
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

---

## 🛡️ Safety & Responsible AI Guidelines

- **No Trespassing**: Prompts explicitly forbid trespassing on private property or restricted reserves.
- **No Hallucinated Guarantees**: Does not simulate fake live satellite/weather feeds; explicitly displays *"Check current local conditions before heading out."*
- **Hydration & Daylight**: Automatically enforces water and daylight warnings.
- **Suggestion Disclaimer**: All routes are marked as conceptual guides rather than turn-by-turn navigation.

---

## 📜 License

MIT License — Built with pride for the **“Touch Grass” Open-Source AI Challenge**.