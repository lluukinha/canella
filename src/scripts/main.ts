import HeroCards from "../gameObjects/HeroCards.json";
import WeaponCards from "../gameObjects/WeaponCards.json";
import AttackCards from "../gameObjects/AttackCards.json";
import MonsterCards from "../gameObjects/MonsterCards.json";
import MonsterAttackCards from "../gameObjects/MonsterAttackCards.json"

export interface IHeroCardGameObject {
  [key: string]: IHeroCard
}
export interface IWeaponCardGameObject {
  [key: string]: IWeaponCard
}
export interface IAttackCardGameObject {
  [key: string]: IAttackCard
}
export interface IMonsterCardGameObject {
  [key: string]: IMonsterCard
}
export interface IMonsterAttackCardGameObject {
  [key: string]: IAttackCard
}
export const heroCards = HeroCards as IHeroCardGameObject;
export const weaponCards = WeaponCards as IWeaponCardGameObject;
export const attackCards = AttackCards as IAttackCardGameObject;
export const monsterCards = MonsterCards as IMonsterCardGameObject;
export const monsterAttackCards = MonsterAttackCards as IMonsterAttackCardGameObject;

export interface ICardInfo { cardKey: string, type: CardTypes };

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

export interface IAttackCard extends ICard {
  id: number;
  name: string;
  type: CardTypes.Attack;
  attributes: IAttackCardAttributes;
}

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

export interface IMonsterLoot {
  gold: { min: number; max: number };
  card: { chance: number; card: ICard } | null;
}

export interface IMonsterCardAttributes {
  healthPoints: number;
  experience: number;
  attack: number;
  attackType: AttackTypes;
  attackCards: string[];
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

const forestEasy: string[] = ["snake", "wasp"];
const forestMedium: string[] = ["poisonSpider", "salamander", "centipede"];
const forestHard: string[] = ["slime", "tarantula"];
const forestVeryHard: string[] = ["crocodile", "lizardSentinel"];
const forestBoss: string[] = ["minotaur"];
export const forestMonsterCards = {
  easy: forestEasy,
  medium: forestMedium,
  hard: forestHard,
  veryHard: forestVeryHard,
  boss: forestBoss,
};

const darkForestEasy: string[] = ["bug", "spider"];
const darkForestMedium: string[] = ["wolf", "scarab"];
const darkForestHard: string[] = ["scorpion", "troll"];
const darkForestVeryHard: string[] = ["bear"];
const darkForestBoss: string[] = ["eagle"];
export const darkForestMonsterCards = {
  easy: darkForestEasy,
  medium: darkForestMedium,
  hard: darkForestHard,
  veryHard: darkForestVeryHard,
  boss: darkForestBoss,
};

export const delay = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const calculateAverage = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const successProbability = (chance: number): boolean =>
  !(Math.random() >= chance / 100);
