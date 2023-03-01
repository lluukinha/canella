import { Component } from 'vue';
import KnightVue from '../components/cards/heroes/Knight.vue';
import SnakeVue from '../components/cards/monsters/Snake.vue';
import ArcherVue from '../components/cards/heroes/Archer.vue';

interface ILevelIndicator {
  from: number;
  to: number;
}

interface IExperienceTable {
  [key: number]: ILevelIndicator;
}

export const experienceTable: IExperienceTable = {
  1: { from: 0, to: 100 },
  2: { from: 100, to: 200 },
  3: { from: 200, to: 300 },
  4: { from: 300, to: 400 },
};

export enum CardTypes {
  Hero = 'Hero',
  Monster = 'Monster',
  Weapon = 'Weapon',
  Attack = 'Attack',
  Supply = 'Supply',
}

enum WeaponTypes {
  Sword = 'Sword',
  Axe = 'Axe',
  Club = 'Club',
  Bow = 'Bow',
  Spear = 'Spear',
  Crossbow = 'Crossbow',
  Wand = 'Wand',
}

enum AttackTypes {
  Fire = 'Fire',
  Meelee = 'Meelee',
  Ice = 'Ice',
  Dark = 'Dark',
  Water = 'Water',
}

export interface IWeaponCardAttributes {
  type: WeaponTypes;
  attackType: AttackTypes;
  attack: number;
}

export interface IWeaponCard extends ICard {
  type: CardTypes.Weapon;
  attributes: IWeaponCardAttributes;
}

export interface IAttackCardAttributes {
  type: AttackTypes;
  attackType: AttackTypes;
  min: number;
  max: number;
  chance: number;
}

export interface ICard {
  id: number;
  name: string;
  type: CardTypes;
  component: Component | null;
  attributes:
    | IHeroCardAttributes
    | IMonsterCardAttributes
    | IAttackCardAttributes
    | IWeaponCardAttributes;
}

export const weaponCards: IWeaponCard[] = [
  {
    id: 1,
    name: 'Knife',
    type: CardTypes.Weapon,
    component: null,
    attributes: {
      type: WeaponTypes.Sword,
      attackType: AttackTypes.Meelee,
      attack: 5,
    },
  },
  {
    id: 2,
    name: 'Wooden Bow',
    type: CardTypes.Weapon,
    component: null,
    attributes: {
      type: WeaponTypes.Bow,
      attackType: AttackTypes.Meelee,
      attack: 15,
    },
  },
];

export interface IAttackCard extends ICard {
  id: number;
  name: string;
  type: CardTypes.Attack;
  attributes: IAttackCardAttributes;
}

export const attackCards: IAttackCard[] = [
  {
    id: 1,
    name: 'Simple',
    type: CardTypes.Attack,
    component: null,
    attributes: {
      type: AttackTypes.Meelee,
      attackType: AttackTypes.Meelee,
      min: 1,
      max: 9,
      chance: 100,
    },
  },
  {
    id: 2,
    name: 'Bite',
    type: CardTypes.Attack,
    component: null,
    attributes: {
      type: AttackTypes.Meelee,
      attackType: AttackTypes.Meelee,
      min: 5,
      max: 10,
      chance: 90,
    },
  },
  {
    id: 3,
    name: 'Throw Arrow',
    type: CardTypes.Attack,
    component: null,
    attributes: {
      type: AttackTypes.Meelee,
      attackType: AttackTypes.Meelee,
      min: 12,
      max: 18,
      chance: 50,
    },
  },
  {
    id: 4,
    name: 'Super',
    type: CardTypes.Attack,
    component: null,
    attributes: {
      type: AttackTypes.Meelee,
      attackType: AttackTypes.Meelee,
      min: 10,
      max: 10,
      chance: 100,
    },
  },
];

export enum HeroTypes {
  Knight = 'Knight',
  Sorcerer = 'Sorcerer',
  Druid = 'Druid',
  Paladin = 'Paladin',
}

const knightWeaponTypes = [
  WeaponTypes.Sword,
  WeaponTypes.Axe,
  WeaponTypes.Club,
];

const paladinWeaponTypes = [
  WeaponTypes.Bow,
  WeaponTypes.Crossbow,
  WeaponTypes.Spear,
];

export interface IHeroCardAttributes {
  weaponTypes: WeaponTypes[];
  attackType: AttackTypes;
  type: HeroTypes;
  level: number;
  experience: number;
  healthPoints: number;
}

export interface IHeroCard extends ICard {
  type: CardTypes.Hero;
  attributes: IHeroCardAttributes;
}

export const heroCards: IHeroCard[] = [
  {
    id: 1,
    name: 'Knight',
    type: CardTypes.Hero,
    component: KnightVue,
    attributes: {
      type: HeroTypes.Knight,
      attackType: AttackTypes.Meelee,
      weaponTypes: knightWeaponTypes,
      level: 1,
      experience: 0,
      healthPoints: 50,
    },
  },
  {
    id: 2,
    name: 'Paladin',
    type: CardTypes.Hero,
    component: ArcherVue,
    attributes: {
      type: HeroTypes.Paladin,
      attackType: AttackTypes.Meelee,
      weaponTypes: paladinWeaponTypes,
      level: 1,
      experience: 0,
      healthPoints: 50,
    },
  },
];

export interface IMonsterLoot {
  gold: { min: number; max: number };
  card: { chance: number; card: ICard } | null;
}

export interface IMonsterCardAttributes {
  healthPoints: number;
  experience: number;
  attack: number;
  attackType: AttackTypes;
  attackCards: IAttackCard[];
  loot: IMonsterLoot;
}

export interface IMonsterCard extends ICard {
  type: CardTypes.Monster;
  attributes: IMonsterCardAttributes;
}

export interface IMonster {
  card: IMonsterCard;
  attacks: IAttackCard[];
}

export const monsterCards: IMonsterCard[] = [
  {
    id: 1,
    type: CardTypes.Monster,
    name: 'Snake',
    component: SnakeVue,
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 10,
      attack: 10,
      attackCards: [attackCards[1]],
      healthPoints: 20,
      loot: {
        gold: { min: 0, max: 1 },
        card: null,
      },
    },
  },
];

export const delay = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const upLevel = async (hero: IHeroCard) => {
  hero.attributes.experience = experienceTable[hero.attributes.level].to;
  await delay(0.5);
  hero.attributes.level += 1;
  hero.attributes.healthPoints += 30;
  return;
};

export const downLevel = async (hero: IHeroCard) => {
  hero.attributes.experience = experienceTable[hero.attributes.level].from;
  await delay(0.5);
  hero.attributes.level -= 1;
  hero.attributes.healthPoints -= 30;
  return;
};

export const calculateAverage = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const successProbability = (chance: number): boolean =>
  Math.random() >= chance / 100;
