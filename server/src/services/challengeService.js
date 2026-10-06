// challengeService.js - Micro real-world quests designed to disconnect from screens

export const PRESET_CHALLENGES = [
  {
    id: 'c1',
    title: 'Botanical Diversity',
    description: 'Find and closely inspect 3 distinctly different leaf shapes (e.g., palmate, serrated, needle).',
    category: 'Flora',
    icon: 'Leaf',
    difficulty: 'Easy',
    timeEstimate: '10 min',
  },
  {
    id: 'c2',
    title: 'The Avian Observer',
    description: 'Spot and observe 2 different bird species without photographing them immediately. Just watch their behavior for 3 minutes.',
    category: 'Fauna',
    icon: 'Feather',
    difficulty: 'Easy',
    timeEstimate: '15 min',
  },
  {
    id: 'c3',
    title: 'The 20-Minute Digital Detox',
    description: 'Walk or sit continuously for 20 minutes with your phone zipped securely inside your backpack or pocket.',
    category: 'Presence',
    icon: 'SmartphoneOff',
    difficulty: 'Medium',
    timeEstimate: '20 min',
  },
  {
    id: 'c4',
    title: 'The Overlooked Detail',
    description: 'Look at the bark, ground, or cobblestones and notice a small natural detail or insect path you would normally walk straight past.',
    category: 'Mindfulness',
    icon: 'Eye',
    difficulty: 'Easy',
    timeEstimate: '5 min',
  },
  {
    id: 'c5',
    title: 'The Sound Map',
    description: 'Close your eyes for 3 minutes. Mentally identify 4 distinct natural sounds around you (wind, rustling foliage, bird call, water).',
    category: 'Sensory',
    icon: 'Ear',
    difficulty: 'Easy',
    timeEstimate: '5 min',
  },
  {
    id: 'c6',
    title: 'Arboreal Sanctuary',
    description: 'Find a sturdy tree, sit under its canopy with your back against the trunk, and take 10 slow, deep diaphragmatic breaths.',
    category: 'Rest',
    icon: 'TreePine',
    difficulty: 'Easy',
    timeEstimate: '10 min',
  },
  {
    id: 'c7',
    title: 'The Uncharted Turn',
    description: 'When walking your route, take a safe, sunlit side path or trail loop you have never walked before.',
    category: 'Exploration',
    icon: 'Compass',
    difficulty: 'Medium',
    timeEstimate: '15 min',
  },
  {
    id: 'c8',
    title: 'Soil & Stone Touch',
    description: 'Directly touch natural bare grass, soil, or a smooth river rock with your bare hands. Feel the temperature and texture.',
    category: 'Grounding',
    icon: 'Sprout',
    difficulty: 'Easy',
    timeEstimate: '3 min',
  },
];

export function getChallenges(count = 6) {
  return PRESET_CHALLENGES.slice(0, count);
}
