export enum CardTypes {
  Hero = "Hero",
  Monster = "Monster",
  Weapon = "Weapon",
  Attack = "Attack",
  Supply = "Supply",
}

export enum WeaponTypes {
  Sword = "Sword",
  Axe = "Axe",
  Club = "Club",
  Bow = "Bow",
  Spear = "Spear",
  Crossbow = "Crossbow",
  Wand = "Wand",
}

export enum AttackTypes {
  Fire = "Fire",
  Meelee = "Meelee",
  Ice = "Ice",
  Dark = "Dark",
  Water = "Water",
  Poison = "Poison"
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
    id: 1,
    name: "Knife",
    type: CardTypes.Weapon,
    image: "weapons/knife.jpg",
    attributes: {
      type: WeaponTypes.Sword,
      attackTypes: [AttackTypes.Meelee],
      attack: 1,
    },
  },
  {
    id: 2,
    name: "Katana",
    type: CardTypes.Weapon,
    image: "weapons/katana.jpg",
    attributes: {
      type: WeaponTypes.Sword,
      attackTypes: [AttackTypes.Meelee],
      attack: 10,
    },
  },
  {
    id: 3,
    name: "Wooden Bow",
    type: CardTypes.Weapon,
    image: "weapons/wooden_bow.jpg",
    attributes: {
      type: WeaponTypes.Bow,
      attackTypes: [AttackTypes.Meelee],
      attack: 10,
    },
  },
  {
    id: 4,
    name: 'Fire Sword',
    type: CardTypes.Weapon,
    image: 'weapons/fire_sword.jpg',
    attributes: {
      type: WeaponTypes.Sword,
      attackTypes: [AttackTypes.Meelee, AttackTypes.Fire],
      attack: 50,
    },
  },
];

/*
Weapon Example:

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
    id: 1,
    name: "Simple",
    type: CardTypes.Attack,
    image: "attacks/simple.jpg",
    attributes: {
      attackType: AttackTypes.Meelee,
      weaponTypes: Object.values(WeaponTypes),
      min: 1,
      max: 9,
      chance: 100,
    },
  },
  {
    id: 2,
    name: "Bite",
    type: CardTypes.Attack,
    image: "empty.jpg",
    attributes: {
      attackType: AttackTypes.Meelee,
      weaponTypes: [],
      min: 1,
      max: 5,
      chance: 90,
    },
  },
  {
    id: 3,
    name: "Throw Arrow",
    type: CardTypes.Attack,
    image: "attacks/throw_arrow.jpg",
    attributes: {
      attackType: AttackTypes.Meelee,
      weaponTypes: [WeaponTypes.Bow],
      min: 12,
      max: 18,
      chance: 50,
    },
  },
  {
    id: 4,
    name: "Super",
    type: CardTypes.Attack,
    image: "attacks/super.jpg",
    attributes: {
      weaponTypes: Object.values(WeaponTypes),
      attackType: AttackTypes.Meelee,
      min: 10,
      max: 10,
      chance: 100,
    },
  },
  {
    id: 5,
    name: "Scratch",
    type: CardTypes.Attack,
    image: "attacks/scratch.jpg",
    attributes: {
      weaponTypes: [],
      attackType: AttackTypes.Meelee,
      min: 10,
      max: 15,
      chance: 85,
    },
  },
  {
    id: 6,
    name: "Poison sting",
    type: CardTypes.Attack,
    image: "attacks/scratch.jpg",
    attributes: {
      weaponTypes: [],
      attackType: AttackTypes.Poison,
      min: 5,
      max: 10,
      chance: 100,
    },
  },
];

export enum HeroTypes {
  Knight = "Knight",
  Sorcerer = "Sorcerer",
  Druid = "Druid",
  Paladin = "Paladin",
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
  attack: number;
}

export interface IHeroCard extends ICard {
  type: CardTypes.Hero;
  attributes: IHeroCardAttributes;
}

export const heroCards: IHeroCard[] = [
  {
    id: 1,
    name: "Steve",
    type: CardTypes.Hero,
    image: "heroes/knight.jpg",
    attributes: {
      type: HeroTypes.Knight,
      weaponTypes: knightWeaponTypes,
      level: 1,
      experience: 0,
      healthPoints: 50,
      attack: 5,
    },
  },
  {
    id: 2,
    name: "Guilherme",
    type: CardTypes.Hero,
    image: "heroes/paladin.jpg",
    attributes: {
      type: HeroTypes.Paladin,
      weaponTypes: paladinWeaponTypes,
      level: 1,
      experience: 0,
      healthPoints: 50,
      attack: 5,
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

export type FieldConfig = "forest" | "darkForest" | "castle" | "castleRuins";
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

export const forestEasy: IMonsterCard[] = [
  {
    id: 1,
    type: CardTypes.Monster,
    name: "Snake",
    image: "monsters/snake.jpg",
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 10,
      attack: 10,
      attackCards: [attackCards[1], attackCards[5]],
      healthPoints: 20,
      loot: {
        gold: { min: 0, max: 1 },
        card: null,
      },
    },
  },
  {
    id: 2,
    type: CardTypes.Monster,
    name: "Wasp",
    image: "monsters/wasp.jpg",
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 15,
      attack: 5,
      attackCards: [attackCards[5]],
      healthPoints: 25,
      loot: {
        gold: { min: 3, max: 7 },
        card: null,
      },
    },
  },
  {
    id: 3,
    type: CardTypes.Monster,
    name: "Salamander",
    image: "monsters/salamander.jpg",
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 15,
      attack: 13,
      attackCards: [attackCards[1], attackCards[5]],
      healthPoints: 20,
      loot: {
        gold: { min: 3, max: 8 },
        card: null,
      },
    },
  },
  {
    id: 4,
    type: CardTypes.Monster,
    name: "Centipede",
    image: "monsters/centipede.jpg",
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 10,
      attack: 8,
      attackCards: [attackCards[1], attackCards[5]],
      healthPoints: 15,
      loot: {
        gold: { min: 2, max: 5 },
        card: null,
      },
    },
  },
  {
    id: 5,
    type: CardTypes.Monster,
    name: "Scorpion",
    image: "monsters/scorpion.jpg",
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 20,
      attack: 15,
      attackCards: [attackCards[5]],
      healthPoints: 30,
      loot: {
        gold: { min: 5, max: 10 },
        card: null,
      },
    },
  },
  {
    id: 6,
    type: CardTypes.Monster,
    name: "Toad",
    image: "monsters/toad.jpg",
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 20,
      attack: 10,
      attackCards: [attackCards[1]],
      healthPoints: 35,
      loot: {
        gold: { min: 5, max: 10 },
        card: null,
      },
    },
  },
  {
    id: 7,
    type: CardTypes.Monster,
    name: "Slug",
    image: "monsters/slug.jpg",
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 18,
      attack: 3,
      attackCards: [attackCards[1]],
      healthPoints: 50,
      loot: {
        gold: { min: 5, max: 10 },
        card: null,
      },
    },
  },
  {
    id: 8,
    type: CardTypes.Monster,
    name: "Spider",
    image: "monsters/spider.jpg",
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 15,
      attack: 12,
      attackCards: [attackCards[1], attackCards[5]],
      healthPoints: 25,
      loot: {
        gold: { min: 3, max: 15 },
        card: null,
      },
    },
  },
  {
    id: 9,
    type: CardTypes.Monster,
    name: "Larva",
    image: "monsters/larva.jpg",
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 10,
      attack: 10,
      attackCards: [attackCards[1]],
      healthPoints: 20,
      loot: {
        gold: { min: 3, max: 8 },
        card: null,
      },
    },
  },
  {
    id: 10,
    type: CardTypes.Monster,
    name: "Bug",
    image: "monsters/bug.jpg",
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 18,
      attack: 12,
      attackCards: [attackCards[1]],
      healthPoints: 25,
      loot: {
        gold: { min: 5, max: 12 },
        card: null,
      },
    },
  },
];

export const forestMedium: IMonsterCard[] = [
  {
    id: 11,
    type: CardTypes.Monster,
    name: "Poison Spider",
    image: "monsters/poison_spider.jpg",
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 25,
      attack: 20,
      attackCards: [attackCards[1], attackCards[5]],
      healthPoints: 30,
      loot: {
        gold: { min: 1, max: 10 },
        card: null,
      },
    },
  },
  {
    id: 12,
    type: CardTypes.Monster,
    name: "Baby Lion",
    image: "monsters/baby_lion.jpg",
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 40,
      attack: 18,
      attackCards: [attackCards[1], attackCards[4]],
      healthPoints: 60,
      loot: {
        gold: { min: 1, max: 10 },
        card: null,
      },
    },
  },
  {
    id: 13,
    type: CardTypes.Monster,
    name: "Leopard",
    image: "monsters/leopard.jpg",
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 40,
      attack: 22,
      attackCards: [attackCards[1], attackCards[4]],
      healthPoints: 60,
      loot: {
        gold: { min: 1, max: 10 },
        card: null,
      },
    },
  },
  {
    id: 14,
    type: CardTypes.Monster,
    name: "Slime",
    image: "monsters/slime.jpg",
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 160,
      attack: 20,
      attackCards: [attackCards[5]],
      healthPoints: 120,
      loot: {
        gold: { min: 1, max: 10 },
        card: null,
      },
    },
  },
  {
    id: 15,
    type: CardTypes.Monster,
    name: "Wolf",
    image: "monsters/wolf.jpg",
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 60,
      attack: 25,
      attackCards: [attackCards[1], attackCards[4]],
      healthPoints: 50,
      loot: {
        gold: { min: 1, max: 10 },
        card: null,
      },
    },
  },
  {
    id: 16,
    type: CardTypes.Monster,
    name: "Fox",
    image: "monsters/fox.jpg",
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 60,
      attack: 18,
      attackCards: [attackCards[1], attackCards[4]],
      healthPoints: 70,
      loot: {
        gold: { min: 1, max: 10 },
        card: null,
      },
    },
  },
  {
    id: 17,
    type: CardTypes.Monster,
    name: "Troll",
    image: "monsters/troll.jpg",
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 80,
      attack: 25,
      attackCards: [attackCards[1], attackCards[0], attackCards[4]],
      healthPoints: 90,
      loot: {
        gold: { min: 1, max: 12 },
        card: null
      },
    },
  },
  {
    id: 18,
    type: CardTypes.Monster,
    name: "Eagle",
    image: "monsters/eagle.jpg",
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 60,
      attack: 20,
      attackCards: [attackCards[1]],
      healthPoints: 70,
      loot: {
        gold: { min: 5, max: 20 },
        card: null,
      },
    },
  },
  {
    id: 19,
    type: CardTypes.Monster,
    name: "Scarab",
    image: "monsters/scarab.jpg",
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 90,
      attack: 23,
      attackCards: [attackCards[1], attackCards[5]],
      healthPoints: 90,
      loot: {
        gold: { min: 10, max: 18 },
        card: null,
      },
    },
  },
  {
    id: 20,
    type: CardTypes.Monster,
    name: "Lizard Sentinel",
    image: "monsters/lizard_sentinel.jpg",
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 120,
      attack: 30,
      attackCards: [attackCards[1], attackCards[4], attackCards[0]],
      healthPoints: 100,
      loot: {
        gold: { min: 8, max: 20 },
        card: null,
      },
    },
  },
];

export const forestHard: IMonsterCard[] = [
  {
    id: 11,
    type: CardTypes.Monster,
    name: "Bear",
    image: "monsters/bear.jpg",
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
    id: 12,
    type: CardTypes.Monster,
    name: "Crocodile",
    image: "monsters/crocodile.jpg",
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

export const monsterCards: IMonsterCard[] = [
  ...forestEasy,
  ...forestMedium,
  {
    id: 15,
    type: CardTypes.Monster,
    name: "Dragon",
    image: "monsters/dragon.jpg",
    attributes: {
      attackType: AttackTypes.Fire,
      experience: 700,
      attack: 100,
      attackCards: [attackCards[1]],
      healthPoints: 2500,
      loot: {
        gold: { min: 3, max: 15 },
        card: { chance: 100, card: weaponCards[3] },
      },
    },
  },
];
// card : { chance: 100, card: weaponCards[1] }

export const delay = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const calculateAverage = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const successProbability = (chance: number): boolean =>
  Math.random() >= chance / 100;

export const allCards = [
  ...heroCards,
  ...weaponCards,
  ...attackCards,
  ...monsterCards,
];
