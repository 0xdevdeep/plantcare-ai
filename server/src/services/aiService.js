import dotenv from 'dotenv';
dotenv.config();

const getOllamaHost = () => process.env.OLLAMA_HOST || 'http://localhost:11434';
const getDefaultModel = () => process.env.OLLAMA_MODEL || 'llama3.2';
const getGeminiKey = () => process.env.GEMINI_API_KEY || '';
const getGeminiModel = () => process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';

/**
 * Check if Ollama is available locally and list available models.
 */
export async function checkOllamaHealth() {
  const host = getOllamaHost();
  const defaultModel = getDefaultModel();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${host}/api/tags`, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const models = (data.models || []).map((m) => m.name);
      return {
        online: true,
        host,
        models,
        defaultModel,
        recommendedPullCommand: `ollama run ${defaultModel}`,
      };
    }
    return {
      online: false,
      host,
      models: [],
      defaultModel,
      error: `Status ${res.status}: ${res.statusText}`,
      recommendedPullCommand: `ollama run ${defaultModel}`,
    };
  } catch (err) {
    return {
      online: false,
      host,
      models: [],
      defaultModel,
      error: err.name === 'AbortError' ? 'Connection timed out' : 'Ollama not running at ' + host,
      recommendedPullCommand: `ollama run ${defaultModel}`,
    };
  }
}

/**
 * Check overall AI status including Cloud API and Local Ollama.
 */
export async function checkAiStatus() {
  const ollama = await checkOllamaHealth();
  const key = getGeminiKey();
  const geminiConfigured = Boolean(key && key.length > 10);

  return {
    ollama,
    gemini: {
      configured: geminiConfigured,
      model: getGeminiModel(),
    },
    activeProvider: ollama.online ? 'ollama' : (geminiConfigured ? 'gemini' : 'demo-engine'),
    supportedModels: ['llama3.2', 'llama3', 'mistral', 'qwen2.5', 'gemma2', 'gemini-3.1-flash-lite'],
    fallbackAvailable: true,
  };
}

/**
 * Main function to generate an outdoor plan.
 */
export async function generateOutdoorPlan(params) {
  const startTime = Date.now();
  const {
    location = 'Nagpur, Maharashtra',
    activity = 'Walking',
    duration = '90 minutes',
    difficulty = 'Easy',
    group = 'Alone',
    goal = 'Relax',
    forceDemo = false,
    model = getDefaultModel(),
    provider = 'auto',
  } = params;

  // 1. Try Local Ollama if not forcing demo and provider is auto/ollama
  if (!forceDemo && (provider === 'auto' || provider === 'ollama')) {
    try {
      const ollamaHealth = await checkOllamaHealth();
      if (ollamaHealth.online) {
        const plan = await callOllamaModel({
          location,
          activity,
          duration,
          difficulty,
          group,
          goal,
          model,
        });

        if (plan) {
          return {
            ...plan,
            metadata: {
              provider: 'ollama',
              model: model,
              host: getOllamaHost(),
              latencyMs: Date.now() - startTime,
              isLiveLocalAi: true,
              generatedAt: new Date().toISOString(),
            },
          };
        }
      }
    } catch (ollamaErr) {
      console.warn('Ollama call failed or timed out, trying Cloud Gemini API:', ollamaErr.message);
    }
  }

  // 2. Try Live Gemini Cloud API if configured and not forcing demo
  const cloudKey = getGeminiKey();
  if (!forceDemo && cloudKey) {
    try {
      const plan = await callGeminiModel({
        location,
        activity,
        duration,
        difficulty,
        group,
        goal,
      });

      if (plan) {
        return {
          ...plan,
          metadata: {
            provider: 'gemini',
            model: getGeminiModel(),
            host: 'Google AI Cloud',
            latencyMs: Date.now() - startTime,
            isLiveCloudAi: true,
            notice: 'Generated via live AI neural inference using Google AI Studio API.',
            generatedAt: new Date().toISOString(),
          },
        };
      }
    } catch (geminiErr) {
      console.warn('Gemini API call failed, falling back to local heuristic engine:', geminiErr.message);
    }
  }

  // 3. Fallback / Demo Mode
  const fallbackPlan = generateFallbackPlan({
    location,
    activity,
    duration,
    difficulty,
    group,
    goal,
  });

  return {
    ...fallbackPlan,
    metadata: {
      provider: 'demo-engine',
      model: 'open-weights-curated-llama3.2',
      host: 'local-in-app',
      latencyMs: Date.now() - startTime,
      isLiveLocalAi: false,
      notice: 'Generated via TrailMate Fallback Engine (Demo mode requested or models offline).',
      generatedAt: new Date().toISOString(),
    },
  };
}

/**
 * Calls Gemini API with JSON generation config
 */
async function callGeminiModel({ location, activity, duration, difficulty, group, goal }) {
  const prompt = `
You are TrailMate AI, an outdoor companion designed for the "Touch Grass" open-source AI challenge.
Your core philosophy is: "Plan quickly -> Leave the screen -> Touch Grass."
The user wants to get outside. Create a realistic, safe, concise outdoor plan.

User Details:
- Location: ${location}
- Activity: ${activity}
- Available Time: ${duration}
- Difficulty: ${difficulty}
- Group Type: ${group}
- Goal: ${goal}

IMPORTANT SAFETY RULES:
- Do NOT recommend trespassing or restricted property.
- Suggest carrying water, comfortable shoes, and sun protection when relevant.
- Remind the user to check local daylight and weather conditions.
- Keep activities realistic within the available time.

Respond ONLY with a valid, clean JSON object matching this schema:
{
  "title": "Short catchy nature title (e.g., '🌿 Evening Nature Walk')",
  "location": "${location}",
  "route_idea": "Brief realistic path or trail idea in or near ${location}",
  "duration": "${duration}",
  "difficulty": "${difficulty}",
  "best_for": "${goal} • ${activity}",
  "summary": "1-2 sentence motivating summary",
  "steps": [
    { "step": 1, "title": "Start & Warm Up", "duration_min": 10, "description": "Brief instruction" },
    { "step": 2, "title": "Main Trail Exploration", "duration_min": 40, "description": "Brief instruction" },
    { "step": 3, "title": "Touch Grass Challenge", "duration_min": 15, "description": "Put phone away, observe surroundings" },
    { "step": 4, "title": "Return Walk", "duration_min": 25, "description": "Wind down and head back" }
  ],
  "packing_list": ["Water bottle", "Comfortable walking shoes", "Small towel"],
  "safety_tips": ["Stay on marked footpaths", "Inform someone of your intended route", "Check daylight before venturing far"],
  "touch_grass_challenge": [
    "Find 3 different leaf shapes",
    "Spot 2 birds in the canopy",
    "Spend 10 minutes without looking at your phone"
  ],
  "screen_off_message": "Phone down. Look around. Breathe deeply.",
  "weather_note": "Check current local conditions before heading out."
}
`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${getGeminiModel()}:generateContent?key=${getGeminiKey()}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: controller.signal,
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    }),
  });

  clearTimeout(timeout);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API returned status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!rawText) throw new Error('Empty response from Gemini API');

  const parsed = JSON.parse(rawText);
  if (parsed && parsed.title && parsed.steps) {
    return parsed;
  }
  throw new Error('Parsed response missing required schema properties');
}

/**
 * Calls local Ollama API with structured prompt expecting valid JSON.
 */
async function callOllamaModel({ location, activity, duration, difficulty, group, goal, model }) {
  const prompt = `
You are TrailMate AI, an outdoor companion designed for the "Touch Grass" open-source AI challenge.
Your core philosophy is: "Plan quickly -> Leave the screen -> Touch Grass."
The user wants to get outside. Create a realistic, safe, concise outdoor plan.

User Details:
- Location: ${location}
- Activity: ${activity}
- Available Time: ${duration}
- Difficulty: ${difficulty}
- Group Type: ${group}
- Goal: ${goal}

IMPORTANT SAFETY RULES:
- Do NOT recommend trespassing or restricted property.
- Suggest carrying water, comfortable shoes, and sun protection when relevant.
- Remind the user to check local daylight and weather conditions.
- Keep activities realistic within the available time.

Respond ONLY with a valid, clean JSON object matching this structure without Markdown fences or commentary:
{
  "title": "Short catchy nature title (e.g., '🌿 Evening Nature Walk')",
  "location": "${location}",
  "route_idea": "Brief path concept in ${location}",
  "duration": "${duration}",
  "difficulty": "${difficulty}",
  "best_for": "${goal} + ${activity}",
  "summary": "1-2 sentence motivating summary",
  "steps": [
    { "step": 1, "title": "Start & Warm Up", "duration_min": 10, "description": "Brief instruction" },
    { "step": 2, "title": "Main Trail Exploration", "duration_min": 40, "description": "Brief instruction" },
    { "step": 3, "title": "Touch Grass Challenge", "duration_min": 15, "description": "Put phone away, observe surroundings" },
    { "step": 4, "title": "Return Walk", "duration_min": 25, "description": "Wind down and head back" }
  ],
  "packing_list": ["Water bottle", "Comfortable walking shoes", "Small towel", "Sun hat"],
  "safety_tips": ["Stay on marked footpaths", "Inform someone of your intended route", "Check daylight before venturing far"],
  "touch_grass_challenge": [
    "Find 3 different leaf shapes",
    "Spot 2 birds in the canopy",
    "Spend 10 minutes without looking at your phone"
  ],
  "screen_off_message": "Phone down. Look around. Breathe deeply.",
  "weather_note": "Check current local conditions before heading out."
}
`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  const response = await fetch(`${getOllamaHost()}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: controller.signal,
    body: JSON.stringify({
      model: model || getDefaultModel(),
      prompt: prompt,
      format: 'json',
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
      },
    }),
  });

  clearTimeout(timeout);

  if (!response.ok) {
    throw new Error(`Ollama returned status ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.response?.trim();

  let parsed = null;
  try {
    parsed = JSON.parse(rawText);
  } catch (parseErr) {
    const cleaned = rawText.replace(/```json\s*/gi, '').replace(/```\s*$/gi, '').trim();
    parsed = JSON.parse(cleaned);
  }

  if (parsed && parsed.title && parsed.steps) {
    return parsed;
  }
  throw new Error('AI output missing required schema properties');
}

/**
 * Intelligent local fallback generator that creates rich, contextual plans
 * based on the user's actual input parameters.
 */
function generateFallbackPlan({ location, activity, duration, difficulty, group, goal }) {
  const isNagpur = location.toLowerCase().includes('nagpur');
  
  let spotName = `${location} Green Corridor`;
  let routeIdea = `Loop around local tree-lined avenues and public green spaces in ${location}`;
  
  if (isNagpur) {
    const nagpurSpots = [
      { name: 'Ambazari Lake & Garden Trail', desc: 'Tranquil lakeside promenade lined with gulmohar trees and birdwatching points' },
      { name: 'Seminary Hills Forestry Track', desc: 'Lush elevated wooded paths near Japanese Garden with gentle slopes' },
      { name: 'Gorewada Nature Trail', desc: 'Protected biodiversity area with acacia thickets and waterbody viewpoints' },
      { name: 'Telankhedi (Futala) Lakeside Walk', desc: 'Breezy waterside promenade ideal for sunset reflections and open air' },
    ];
    const picked = nagpurSpots[Math.floor(Math.random() * nagpurSpots.length)];
    spotName = picked.name;
    routeIdea = picked.desc;
  } else {
    spotName = `${location} Community Nature Sanctuary & Trail`;
    routeIdea = `Accessible perimeter path featuring mature trees, shaded resting benches, and minimal vehicle traffic in ${location}`;
  }

  let totalMinutes = 90;
  if (duration.includes('30')) totalMinutes = 30;
  else if (duration.includes('1 hour') || duration.includes('60')) totalMinutes = 60;
  else if (duration.includes('2 hour') || duration.includes('120')) totalMinutes = 120;
  else if (duration.includes('3+')) totalMinutes = 180;

  const warmupMin = Math.max(5, Math.round(totalMinutes * 0.12));
  const challengeMin = Math.max(10, Math.round(totalMinutes * 0.18));
  const returnMin = Math.max(10, Math.round(totalMinutes * 0.25));
  const exploreMin = Math.max(10, totalMinutes - warmupMin - challengeMin - returnMin);

  return {
    title: `🌿 ${getNatureAdjective(goal)} ${activity}`,
    location: spotName,
    route_idea: routeIdea,
    duration: `${totalMinutes} minutes`,
    difficulty: difficulty,
    best_for: `${goal} • ${group} • ${activity}`,
    summary: `A restorative ${duration.toLowerCase()} session in ${location} structured to maximize sensory presence and disconnect from digital fatigue.`,
    steps: [
      {
        step: 1,
        title: 'Start & Acclimate',
        duration_min: warmupMin,
        description: `Begin walking at an easy cadence along the trailhead at ${spotName}. Put your phone on silent and place it inside your bag. Take three deep breaths of fresh outdoor air.`,
      },
      {
        step: 2,
        title: 'Immersive Exploration',
        duration_min: exploreMin,
        description: `Follow the main path. Pay close attention to natural landmarks: the pattern of branches overhead, changes in ambient temperature under tree canopies, and bird movements.`,
      },
      {
        step: 3,
        title: 'Touch Grass Challenge',
        duration_min: challengeMin,
        description: `Find an inviting clearing, bench, or patch of lawn. Stop walking. Sit or stand quietly for ${challengeMin} uninterrupted minutes. Touch a leaf or grass blade with your hand.`,
      },
      {
        step: 4,
        title: 'Gentle Return',
        duration_min: returnMin,
        description: `Take a relaxed return route back to your starting point. Notice how your body feels after unplugging compared to before you stepped outside.`,
      },
    ],
    packing_list: [
      'Reusable water bottle (stay hydrated)',
      'Comfortable walking or trail shoes',
      'Breathable lightweight clothing',
      'Small hand towel or bandana',
      'Optional: Pocket magnifying glass or binoculars (no screens)',
    ],
    safety_tips: [
      'Stay on established, well-lit pedestrian pathways.',
      'Always inform a family member or friend of your intended outdoor duration.',
      'Drink water regularly, especially in warm or sunny conditions.',
      'Check current local weather and daylight hours before setting off.',
      'Respect private properties and local wildlife habitats.',
    ],
    touch_grass_challenge: [
      'Find 3 different leaf shapes along the trail.',
      'Spot 2 species of birds perched in the trees.',
      `Spend at least ${challengeMin} consecutive minutes with your phone untouched in your bag.`,
    ],
    screen_off_message: 'Phone down. Look around. The real world is right in front of you.',
    weather_note: 'Check current local conditions before heading out.',
  };
}

function getNatureAdjective(goal) {
  const map = {
    'Relax': 'Restorative Forest',
    'Exercise': 'Energizing Open-Air',
    'Explore': 'Scenic Discovery',
    'Socialize': 'Social Sunshine',
    'Photography': 'Golden-Hour Botanical',
    'Nature': 'Immersive Green',
    'Clear my mind': 'Mindful Silence',
  };
  return map[goal] || 'Tranquil Outdoor';
}
