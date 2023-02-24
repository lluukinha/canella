export interface Battle {
  round: number;
  experience: number;
  winner: 'hero' | 'monster';
  finished: boolean;
}

interface HeroSkills {
  sword: number;
  axe: number;
  club: number;
  fist: number;
  distance: number;
  shielding: number;
  magic: number;
}

export interface HeroCard {
  healthPoints: number;
  manaPoints: number;
  experience: number;
  level: number;
  skills: HeroSkills;
}

const heroCard = {
  healthPoints: 10,
  manaPoints: 10,
  experience: 0,
  skills: {
    sword: 0,
    axe: 0,
    club: 0,
    shielding: 0,
    fist: 0,
    distance: 0,
    magic: 0,
  },
};

//"Knight", "Archer", "Sorcerer", "Druid", "Fighter"

const knightTypes = [
  {
    id: 1,
    weapon: 'Sword',
    skillBoost: ['sword', 'shielding'],
    name: 'Sword Knight',
    special: false,
  },
  {
    id: 2,
    weapon: 'Axe',
    skillBoost: ['axe', 'shielding'],
    name: 'Axe Knight',
    special: false,
  },
  {
    id: 3,
    weapon: 'Club',
    skillBoost: ['club', 'shielding'],
    name: 'Club Knight',
    special: false,
  },
  {
    id: 4,
    weapon: 'All',
    skillBoost: ['sword', 'axe', 'club', 'shielding'],
    name: 'Elite Knight',
    special: true,
  },
];

const archerTypes = [
  {
    id: 6,
    weapon: 'Bow and Crossbow',
    skillBoost: ['distance'],
    name: 'Bow/Crossbow Archer',
    special: false,
  },
  {
    id: 7,
    weapon: 'Spear',
    skillBoost: ['distance', 'shielding'],
    name: 'Spear Archer',
    special: false,
  },
  {
    id: 8,
    weapon: 'All distance weapons',
    skillBoost: ['distance', 'shielding'],
    name: 'Royal Archer',
    special: true,
  },
];

const wizardTypes = [
  {
    id: 9,
    weapon: 'Wand, Spells and Runes',
    skillBoost: ['magic'],
    name: 'Sorcerer',
    special: false,
  },
  {
    id: 10,
    weapon: 'Rod, Spells and Runes',
    skillBoost: ['magic'],
    name: 'Druid',
    special: false,
  },
  {
    id: 11,
    weapon: 'Wand, Rod, All Spells and Runes',
    skillBoost: ['magic'],
    name: 'Master Sorcerer',
    special: true,
  },
];

const fighterTypes = [
  {
    id: 12,
    weapon: 'Fist and Glooves',
    skillBoost: ['fist'],
    name: 'Fighter',
    special: false,
  },
];

export const categories = [
  { id: 1, name: 'Knight', types: knightTypes },
  { id: 2, name: 'Archer', types: archerTypes },
  { id: 3, name: 'Wizard', types: wizardTypes },
  { id: 4, name: 'Fighter', types: fighterTypes },
];
