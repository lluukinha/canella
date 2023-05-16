export enum CardTypes {
  Hero = 'Hero',
  Monster = 'Monster',
  Weapon = 'Weapon',
  Attack = 'Attack',
  Supply = 'Supply',
}

export enum WeaponTypes {
  Wand = 'Wand',
}

export enum AttackTypes {
  Fire = 'Fire',
  Meelee = 'Meelee',
  Ice = 'Ice',
  Dark = 'Dark',
  Water = 'Water',
  Poison = 'Poison',
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
  price: number;
  attributes:
    | IHeroCardAttributes
    | IMonsterCardAttributes
    | IAttackCardAttributes
    | IWeaponCardAttributes;
}

export const weaponCards: IWeaponCard[] = [
  {
    id: 1,
    name: 'Snowflake Wand',
    type: CardTypes.Weapon,
    image: 'weapons/wand_ai.jpeg',
    price: 10,
    attributes: {
      type: WeaponTypes.Wand,
      attackTypes: [AttackTypes.Ice],
      attack: 10,
    },
  },
  {
    id: 2,
    name: `Blizzard Wand`,
    type: CardTypes.Weapon,
    image: 'weapons/blizzard_wand.jpeg',
    price: 4000,
    attributes: {
      type: WeaponTypes.Wand,
      attackTypes: [AttackTypes.Water, AttackTypes.Ice],
      attack: 50,
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
    image: 'attacks/simple.png',
    price: 10,
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
    name: 'Bite',
    type: CardTypes.Attack,
    image: 'attacks/bite.png',
    price: 0,
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
    name: 'Super',
    type: CardTypes.Attack,
    image: 'attacks/super.png',
    price: 500,
    attributes: {
      weaponTypes: Object.values(WeaponTypes),
      attackType: AttackTypes.Meelee,
      min: 40,
      max: 100,
      chance: 90,
    },
  },
  {
    id: 4,
    name: 'Scratch',
    type: CardTypes.Attack,
    image: 'attacks/scratch.png',
    price: 0,
    attributes: {
      weaponTypes: [],
      attackType: AttackTypes.Meelee,
      min: 10,
      max: 15,
      chance: 85,
    },
  },
  {
    id: 5,
    name: 'Poison sting',
    type: CardTypes.Attack,
    image: 'attacks/poison.png',
    price: 0,
    attributes: {
      weaponTypes: [],
      attackType: AttackTypes.Poison,
      min: 5,
      max: 10,
      chance: 100,
    },
  },
  {
    id: 6,
    name: 'Medium',
    type: CardTypes.Attack,
    image: 'attacks/simple.png',
    price: 100,
    attributes: {
      attackType: AttackTypes.Meelee,
      weaponTypes: Object.values(WeaponTypes),
      min: 10,
      max: 40,
      chance: 100,
    },
  },
  {
    id: 7,
    name: 'Snowball',
    type: CardTypes.Attack,
    image: 'attacks/snowball.jpg',
    price: 10,
    attributes: {
      attackType: AttackTypes.Ice,
      weaponTypes: [WeaponTypes.Wand],
      min: 1,
      max: 9,
      chance: 100,
    },
  },
  {
    id: 8,
    name: 'Avalanche',
    type: CardTypes.Attack,
    image: 'attacks/avalanche.jpeg',
    price: 500,
    attributes: {
      weaponTypes: [WeaponTypes.Wand],
      attackType: AttackTypes.Ice,
      min: 40,
      max: 100,
      chance: 90,
    },
  },
];

export enum HeroTypes {
  Knight = 'Knight',
  Sorcerer = 'Sorcerer',
  Druid = 'Druid',
  Paladin = 'Paladin',
}

const druidWeaponTypes = [WeaponTypes.Wand];

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
    name: 'Ayla',
    type: CardTypes.Hero,
    image: 'heroes/druid_ai.jpeg',
    price: 1000,
    attributes: {
      type: HeroTypes.Druid,
      weaponTypes: druidWeaponTypes,
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

export const forestEasy: IMonsterCard[] = [
  {
    id: 1,
    type: CardTypes.Monster,
    name: 'Snake',
    image: 'monsters/snake.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 10,
      attack: 10,
      attackCards: [attackCards[1], attackCards[5]],
      healthPoints: 20,
      loot: {
        gold: { min: 0, max: 5 },
        card: null,
      },
    },
  },
  {
    id: 2,
    type: CardTypes.Monster,
    name: 'Wasp',
    image: 'monsters/wasp.png',
    price: 0,
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
    name: 'Salamander',
    image: 'monsters/salamander.png',
    price: 0,
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
    name: 'Centipede',
    image: 'monsters/centipede.png',
    price: 0,
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
    name: 'Scorpion',
    image: 'monsters/scorpion.png',
    price: 0,
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
    name: 'Toad',
    image: 'monsters/toad.png',
    price: 0,
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
    name: 'Slug',
    image: 'monsters/slug.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 18,
      attack: 3,
      attackCards: [attackCards[1]],
      healthPoints: 50,
      loot: {
        gold: { min: 8, max: 15 },
        card: null,
      },
    },
  },
  {
    id: 8,
    type: CardTypes.Monster,
    name: 'Spider',
    image: 'monsters/spider.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 15,
      attack: 12,
      attackCards: [attackCards[1], attackCards[5]],
      healthPoints: 25,
      loot: {
        gold: { min: 3, max: 12 },
        card: null,
      },
    },
  },
  {
    id: 9,
    type: CardTypes.Monster,
    name: 'Larva',
    image: 'monsters/larva.png',
    price: 0,
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
    name: 'Bug',
    image: 'monsters/bug.png',
    price: 0,
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
    name: 'Poison Spider',
    image: 'monsters/poison_spider.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 25,
      attack: 20,
      attackCards: [attackCards[1], attackCards[5]],
      healthPoints: 30,
      loot: {
        gold: { min: 5, max: 15 },
        card: null,
      },
    },
  },
  {
    id: 12,
    type: CardTypes.Monster,
    name: 'Baby Lion',
    image: 'monsters/baby_lion.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 40,
      attack: 18,
      attackCards: [attackCards[1], attackCards[4]],
      healthPoints: 60,
      loot: {
        gold: { min: 8, max: 18 },
        card: null,
      },
    },
  },
  {
    id: 13,
    type: CardTypes.Monster,
    name: 'Leopard',
    image: 'monsters/leopard.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 40,
      attack: 22,
      attackCards: [attackCards[1], attackCards[4]],
      healthPoints: 60,
      loot: {
        gold: { min: 10, max: 18 },
        card: null,
      },
    },
  },
  {
    id: 14,
    type: CardTypes.Monster,
    name: 'Slime',
    image: 'monsters/slime.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Poison,
      experience: 160,
      attack: 20,
      attackCards: [attackCards[5]],
      healthPoints: 120,
      loot: {
        gold: { min: 15, max: 25 },
        card: null,
      },
    },
  },
  {
    id: 15,
    type: CardTypes.Monster,
    name: 'Wolf',
    image: 'monsters/wolf.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 60,
      attack: 25,
      attackCards: [attackCards[1], attackCards[4]],
      healthPoints: 50,
      loot: {
        gold: { min: 10, max: 15 },
        card: null,
      },
    },
  },
  {
    id: 16,
    type: CardTypes.Monster,
    name: 'Fox',
    image: 'monsters/fox.png',
    price: 0,
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
    name: 'Troll',
    image: 'monsters/troll.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 80,
      attack: 25,
      attackCards: [attackCards[1], attackCards[0], attackCards[4]],
      healthPoints: 90,
      loot: {
        gold: { min: 8, max: 14 },
        card: null,
      },
    },
  },
  {
    id: 18,
    type: CardTypes.Monster,
    name: 'Eagle',
    image: 'monsters/eagle.png',
    price: 0,
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
    name: 'Scarab',
    image: 'monsters/scarab.png',
    price: 0,
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
    name: 'Lizard Sentinel',
    image: 'monsters/lizard_sentinel.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 120,
      attack: 30,
      attackCards: [attackCards[1], attackCards[4], attackCards[0]],
      healthPoints: 100,
      loot: {
        gold: { min: 15, max: 30 },
        card: null,
      },
    },
  },
];

export const forestHard: IMonsterCard[] = [
  {
    id: 21,
    type: CardTypes.Monster,
    name: 'Bear',
    image: 'monsters/bear.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 180,
      attack: 38,
      attackCards: [attackCards[1], attackCards[4]],
      healthPoints: 180,
      loot: {
        gold: { min: 1, max: 10 },
        card: null,
      },
    },
  },
  {
    id: 22,
    type: CardTypes.Monster,
    name: 'Crocodile',
    image: 'monsters/crocodile.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 150,
      attack: 35,
      attackCards: [attackCards[1], attackCards[4]],
      healthPoints: 250,
      loot: {
        gold: { min: 15, max: 30 },
        card: null,
      },
    },
  },
  {
    id: 23,
    type: CardTypes.Monster,
    name: 'Tarantula',
    image: 'monsters/tarantula.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 150,
      attack: 25,
      attackCards: [attackCards[1], attackCards[4], attackCards[0]],
      healthPoints: 150,
      loot: {
        gold: { min: 8, max: 20 },
        card: null,
      },
    },
  },
  {
    id: 24,
    type: CardTypes.Monster,
    name: 'Minotaur',
    image: 'monsters/minotaur.png',
    price: 0,
    attributes: {
      attackType: AttackTypes.Meelee,
      experience: 250,
      attack: 42,
      attackCards: [attackCards[1], attackCards[4], attackCards[0]],
      healthPoints: 280,
      loot: {
        gold: { min: 8, max: 20 },
        card: null,
      },
    },
  },
];

export const dragon: IMonsterCard = {
  id: 41,
  type: CardTypes.Monster,
  name: 'Dragon',
  image: 'monsters/dragon.gif',
  price: 0,
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
};

export const monsterCards: IMonsterCard[] = [
  ...forestEasy,
  ...forestMedium,
  ...forestHard,
  dragon,
];

export const delay = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const calculateAverage = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const successProbability = (chance: number): boolean =>
  !(Math.random() >= chance / 100);

export const allCards = [
  ...heroCards,
  ...weaponCards,
  ...attackCards,
  ...monsterCards,
];
