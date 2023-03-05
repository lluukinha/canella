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
  attackTypes: AttackTypes[];
  attack: number;
}

export interface IWeaponCard extends ICard {
  type: CardTypes.Weapon;
  attributes: IWeaponCardAttributes;
}

export interface IAttackCardAttributes {
  attackType: AttackTypes;
  weaponTypes: WeaponTypes[];
  min: number;
  max: number;
  chance: number;
}

export interface ICard {
  id: number;
  name: string;
  type: CardTypes;
  image: string;
  attributes:
    | IHeroCardAttributes
    | IMonsterCardAttributes
    | IAttackCardAttributes
    | IWeaponCardAttributes;
}

export const weaponCards: IWeaponCard[] = [
  {
    id: 8,
    name: 'Knife',
    type: CardTypes.Weapon,
    image: 'weapon_knife.jpg',
    attributes: {
      type: WeaponTypes.Sword,
      attackTypes: [AttackTypes.Meelee],
      attack: 5,
    },
  },
  {
    id: 9,
    name: 'Katana',
    type: CardTypes.Weapon,
    image: 'weapon_katana.jpg',
    attributes: {
      type: WeaponTypes.Sword,
      attackTypes: [AttackTypes.Meelee],
      attack: 15,
    },
  },
  {
    id: 10,
    name: 'Wooden Bow',
    type: CardTypes.Weapon,
    image: 'weapon_wooden_bow.jpg',
    attributes: {
      type: WeaponTypes.Bow,
      attackTypes: [AttackTypes.Meelee],
      attack: 15,
    },
  },
];

/*
Weapon Example:
{
    id: 88,
    name: 'Fire Sword',
    type: CardTypes.Weapon,
    image: '',
    attributes: {
      type: WeaponTypes.Sword,
      attackTypes: [AttackTypes.Meelee, AttackTypes.Fire],
      attack: 5,
    },
  },

Attack example
{
    id: 55,
    name: 'Queima Tudo',
    type: CardTypes.Attack,
    image: '',
    attributes: {
      weaponTypes: [WeaponTypes.Wand, WeaponTypes.Sword],
      attackType: AttackTypes.Fire,
      min: 10,
      max: 10,
      chance: 100,
    },
  },
*/

export interface IAttackCard extends ICard {
  id: number;
  name: string;
  type: CardTypes.Attack;
  attributes: IAttackCardAttributes;
}

export const attackCards: IAttackCard[] = [
  {
    id: 3,
    name: 'Simple',
    type: CardTypes.Attack,
    image: 'attack_simple.jpg',
    attributes: {
      attackType: AttackTypes.Meelee,
      weaponTypes: Object.values(WeaponTypes),
      min: 1,
      max: 9,
      chance: 100,
    },
  },
  {
    id: 4,
    name: 'Bite',
    type: CardTypes.Attack,
    image: '',
    attributes: {
      attackType: AttackTypes.Meelee,
      weaponTypes: [],
      min: 5,
      max: 10,
      chance: 90,
    },
  },
  {
    id: 5,
    name: 'Throw Arrow',
    type: CardTypes.Attack,
    image: 'attack_throw_arrow.jpg',
    attributes: {
      attackType: AttackTypes.Meelee,
      weaponTypes: [WeaponTypes.Bow],
      min: 12,
      max: 18,
      chance: 50,
    },
  },
  {
    id: 6,
    name: 'Super',
    type: CardTypes.Attack,
    image: 'attack_super.jpg',
    attributes: {
      weaponTypes: Object.values(WeaponTypes),
      attackType: AttackTypes.Meelee,
      min: 10,
      max: 10,
      chance: 100,
    },
  },
  {
    id: 11,
    name: 'Scratch',
    type: CardTypes.Attack,
    image: 'attack_scratch.jpg',
    attributes: {
      weaponTypes: [],
      attackType: AttackTypes.Meelee,
      min: 10,
      max: 15,
      chance: 85,
    },
  },
  // scratch
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
    name: 'Lucas',
    type: CardTypes.Hero,
    image: 'hero_knight.jpg',
    attributes: {
      type: HeroTypes.Knight,
      weaponTypes: knightWeaponTypes,
      level: 1,
      experience: 0,
      healthPoints: 50,
    },
  },
  {
    id: 2,
    name: 'Guilherme',
    type: CardTypes.Hero,
    image: 'hero_paladin.jpg',
    attributes: {
      type: HeroTypes.Paladin,
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

export type FieldConfig = 'forest' | 'darkForest' | 'castle' | 'castleRuins';
export interface IBattleData {
  field: FieldConfig;
  level: number;
  monster: IMonsterCard;
  bg: string;
}

export interface StoryLevel {
  isEnabled: boolean;
  currentLevel: number;
  nextField: FieldConfig;
  wonAllLevels: boolean;
}

export const monsterCards: IMonsterCard[] = [
  {
    id: 7,
    type: CardTypes.Monster,
    name: 'Snake',
    image: 'monster_snake.jpg',
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
  {
    id: 12,
    type: CardTypes.Monster,
    name: 'Bear',
    image: 'monster_bear.jpg',
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 25,
      attack: 13,
      attackCards: [attackCards[1], attackCards[4]],
      healthPoints: 30,
      loot: {
        gold: { min: 1, max: 10 },
        card: null,
      },
    },
  },
  {
    id: 13,
    type: CardTypes.Monster,
    name: 'Crocodile',
    image: 'monster_crocodile.jpg',
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 30,
      attack: 15,
      attackCards: [attackCards[1], attackCards[4]],
      healthPoints: 50,
      loot: {
        gold: { min: 5, max: 15 },
        card: null,
      },
    },
  },
];
// card : { chance: 100, card: weaponCards[1] }

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

export const calculateAverage = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const successProbability = (chance: number): boolean =>
  Math.random() >= chance / 100;
