*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)*

# 🌿 TrailMate AI — Touch Grass. Let AI Handle the Planning.

> **“Plan quickly → Leave the screen → Touch Grass.”**  
> *Use AI for 30 seconds so you can stop looking at your phone for the next 2 hours.*

---

## What I Built

Modern apps are engineered with infinite scrolls, notification traps, and gamified dopamine loops designed to maximize screen dwell time. Very few tools are intentionally designed to make the screen itself unnecessary.

**TrailMate AI** is an open-weight AI outdoor companion built for people suffering from digital fatigue. Instead of trapping you in endless review comparisons, TrailMate takes a simple intention:

> *“I have 2 hours this evening, I want something relaxing and I like nature.”*

...and turns it into a practical, safe outdoor adventure within seconds:

1. **AI Outdoor Planner**: Input your location (city/area with zero GPS tracking), movement preference (walking, hiking, cycling, birdwatching, nature exploration), available time, difficulty, group type, and primary goal.
2. **Actionable Itinerary Card**: Generates a 4-step outdoor timeline (Start & Warm Up, Immersive Exploration, Touch Grass Challenge, Gentle Return), an essential packing list, safety tips, and local condition notices.
3. **📵 Screen-Off Mode**: Once you tap **“Start Adventure”**, the app turns into a distraction-free, minimal void displaying `# 🌱 GO OUTSIDE.`, a circular check-in countdown timer, and **“📵 Phone down. Look around.”** It even includes a native browser Web Audio ambient nature synthesizer generating gentle forest breeze without any external audio files.
4. **Touch Grass Micro-Quests**: Real-world sensory challenges designed to ground your nervous system (e.g., *Find 3 leaf shapes*, *Spot 2 birds*, *20-minute digital detox*, *Touch natural soil or river rocks*).
5. **“Take It Outside” Checklist & Journal**: A contract with the physical world (Leave house → Put phone away → Complete activity → Touch grass → Come back) followed by a quick post-adventure reflection rating (😊 Great, 🌿 Peaceful, 🏃 Energizing, 😐 Okay, 😴 Tiring) that logs cumulative time spent off screens.

### Who Is It For?
- Remote workers and developers feeling burnt out by screen glare.
- Anyone struggling with doomscrolling who wants a quick, friction-free push to step outside.
- Families, friends, or solo explorers looking for spontaneous outdoor activities without hours of research.

---

## Demo

- **Live Code Repository**: [https://github.com/0xdevdeep/plantcare-ai](https://github.com/0xdevdeep/plantcare-ai)
- **Built-In Demo Mode**: The application includes a 1-click **“Try Demo”** button pre-configured with a realistic outdoor scenario (Nagpur, Maharashtra — Lake and Forest Trail Exploration, 90 mins, Easy) so judges can evaluate the complete flow in seconds even without local models installed.

### Video / Visual Walkthrough
The interface is crafted with a forest/moss aesthetic, subtle glassmorphism, responsive controls, and high-resolution thematic art representing the core concept: a smartphone left behind on a wooden bench while stepping into the sunlit woods.

---

## Code

{% github 0xdevdeep/plantcare-ai %}

**GitHub Repository**: [https://github.com/0xdevdeep/plantcare-ai](https://github.com/0xdevdeep/plantcare-ai)

### Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend API**: Node.js, Express, dotenv, CORS.
- **AI Core**: Ollama local inference daemon (`llama3.2`, `qwen2.5`, `gemma2`) with multi-tier fallback support to Google Gemini API (`gemini-3.1-flash-lite`) and an offline heuristic engine.
- **Synthesizer**: Web Audio API pink/brown noise biquad-filtered nature sound synthesis.

---

## How I Built It

TrailMate AI was architected around the belief that **AI should be the shortest possible bridge to the real world, not a wall between you and it**.

### 1. Multi-Tier Open AI Architecture

The application avoids reliance on closed black-box AI providers through a clean 3-tier architecture:

* **Tier 1 (Local-First with Ollama)**: The backend proactively monitors `http://localhost:11434`. When an open-weight model like **Llama 3.2 (3B)** or **Qwen 2.5** is active, prompts are routed directly through Ollama on-device. Zero data leaves your computer.
* **Tier 2 (Open Architecture Cloud Inference)**: If local inference is unavailable on the user's current device, the backend routes to cloud neural inference via Google AI (`gemini-3.1-flash-lite` / Gemma family) using strict JSON schema outputs.
* **Tier 3 (Resilient Heuristic Fallback)**: If disconnected from the internet and Ollama is stopped, the app provides tailored fallback plans based on local geographical knowledge (e.g. Ambazari Lake, Seminary Hills forestry tracks) ensuring zero crashes or infinite spinners during judging.

### 2. Structured JSON Prompt Engineering

The system prompt enforces strict schema validation:
```json
{
  "title": "🌿 Evening Nature Walk",
  "location": "Ambazari Lake Garden Trail",
  "route_idea": "Waterside promenade with mature trees and birdwatching viewpoints",
  "duration": "90 minutes",
  "difficulty": "Easy",
  "best_for": "Relaxation • Light Exercise",
  "steps": [
    { "step": 1, "title": "Start & Acclimate", "duration_min": 10, "description": "Begin at an easy pace. Put phone on silent inside your pack." },
    { "step": 2, "title": "Immersive Exploration", "duration_min": 40, "description": "Follow the perimeter path and observe tree canopies." },
    { "step": 3, "title": "Touch Grass Challenge", "duration_min": 15, "description": "Sit quietly on a shaded bench. Touch cool soil or grass blades." },
    { "step": 4, "title": "Gentle Return", "duration_min": 25, "description": "Wind down cadence and return to start." }
  ],
  "packing_list": ["Water bottle", "Comfortable walking shoes", "Hand towel"],
  "safety_tips": ["Stay on marked footpaths", "Hydrate regularly", "Check daylight hours"],
  "touch_grass_challenge": ["Find 3 leaf shapes", "Spot 2 birds", "15 minutes phone-free"],
  "screen_off_message": "Phone down. Look around. The real world is right in front of you.",
  "weather_note": "Check current local conditions before heading out."
}
```

### 3. Screen-Off Mode Engineering
Most web applications try to retain you on their site. In TrailMate AI, clicking **“Start Adventure”** launches a full-screen mode that intentionally strips away all complex UI. It provides only what is strictly necessary: a circular SVG countdown ring indicating when your activity ends, a toggle for gentle wind noise, and a reminder to leave your phone in your pocket.

---

## Why Does Open Innovation Matter?

Your personal schedule, mental wellness goals, and real-time geographic whereabouts shouldn't be surrendered to proprietary corporate servers just to plan a 1-hour walk.

1. **True Privacy & Data Sovereignty**: By utilizing open-weight models running on Ollama, your outdoor intentions and locations remain 100% on your machine.
2. **Model Freedom**: We are not locked into any single proprietary vendor. If Llama 3.2 is too light, swap to Qwen 2.5 (7B) or Gemma 2 (9B) with one terminal command: `ollama run qwen2.5`.
3. **Offline & Edge Capability**: Nature happens where cellular towers often don't reach. Open-weight models running locally mean you can generate itineraries and micro-quests at an off-grid trailhead or campground.
4. **Hackable & Auditable**: Developers can customize prompts, adjust temperature parameters, or fine-tune models on local biodiversity and national park datasets.

> **“The goal isn’t to put more AI between people and the real world. It’s to use AI as the shortest possible bridge to it.”**

---

## My Agent Session

This project was built and tested with an agentic pair-programming workflow:
* Scaffolding the React + Vite frontend and Node.js Express backend.
* Crafting the nature-inspired design system with Tailwind CSS and glassmorphism tokens.
* Designing the Web Audio API synthesizer for offline ambient sound.
* Integrating the multi-tier inference engine with Ollama and cloud fallbacks.
* Writing clean, production-ready code with safe git hygiene and zero leaked credentials.

---

## Prize Categories

- **Main Track**: Touch Grass Open-Source AI Challenge
- **Open-Source AI / Local Inference**: Ollama & Open-Weight Model Integration
- **Wellness & Real-World Impact**: Anti-Screen Time Innovation
