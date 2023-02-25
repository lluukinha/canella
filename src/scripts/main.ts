import { Component } from 'vue';
import KnightVue from '../components/cards/heroes/Knight.vue';
import SnakeVue from '../components/cards/monsters/Snake.vue';

export interface IWeaponCard {
  id: number;
  name: string;
  type: string;
  attack: number;
}

const weapons: IWeaponCard[] = [
  { id: 1, name: 'Knife', type: 'sword', attack: 5 },
  { id: 2, name: 'Katana', type: 'sword', attack: 15 },
];

export interface IAttackCard {
  id: number;
  name: string;
  type: string;
  min: number;
  max: number;
  chance: number;
}

const monsterAttacks: IAttackCard[] = [
  { id: 2, name: 'Bite', type: 'meelee', min: 5, max: 10, chance: 90 },
];

const heroAttacks: IAttackCard[] = [
  {
    id: 1,
    name: 'Simple',
    type: 'sword',
    min: 1,
    max: 9,
    chance: 100,
  },
  { id: 3, name: 'Strong', type: 'sword', min: 10, max: 10, chance: 5 },
  {
    id: 4,
    name: 'Super',
    type: 'sword',
    min: 10,
    max: 10,
    chance: 100,
  },
];

export interface IHeroCard {
  id: number;
  weaponType: string;
  name: string;
  type: string;
  class: string;
  healthPoints: number;
  level: number;
  experience: number;
  attacks: IAttackCard[];
  equipedWeapon: IWeaponCard | null;
  component: Component;
}

export const heroCard = {
  id: 1,
  weaponType: 'sword',
  name: 'Knight',
  type: 'Hero',
  class: 'warrior',
  healthPoints: 100,
  level: 1,
  experience: 0,
  equipedWeapon: weapons[0],
  attacks: heroAttacks,
  component: KnightVue,
};

export interface MonsterCard {
  id: number;
  name: string;
  healthPoints: number;
  component: Component;
  attacks: IAttackCard[];
  experience: number;
  attack: number;
}

export const monsterCard: MonsterCard = {
  id: 1,
  name: 'Snake',
  healthPoints: 10,
  component: SnakeVue,
  attacks: monsterAttacks,
  experience: 10,
  attack: 10,
};

export const categories = [{ id: 1, name: 'Knight', cards: [heroCard] }];
