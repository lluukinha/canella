import { computed, ref } from 'vue';
import {
  IAttackCard,
  ICard,
  IHeroCard,
  IWeaponCard,
  CardTypes,
  IWeaponCardAttributes,
  StoryLevel,
  IBattleData,
  delay,
  calculateAverage,
  heroCards,
  attackCards,
  weaponCards,
  ICardInfo,
  monsterCards,
  IMonsterCard,
  monsterAttackCards,
} from './main';
import AES from './AES';

interface ILevelIndicator {
  from: number;
  to: number;
}

interface IExperienceTable {
  [key: number]: ILevelIndicator;
}

export const ATTACK_ON_LEVEL = 5;
export const LIFE_ON_LEVEL = 30;
const SHUFFLE_KEY = 'c4nell4S!v%;';

export const expLevels: IExperienceTable = {
  1: { from: 0, to: 100 },
  2: { from: 100, to: 200 },
  3: { from: 200, to: 400 },
  4: { from: 400, to: 800 },
  5: { from: 800, to: 1500 },
  6: { from: 1500, to: 2600 },
  7: { from: 2600, to: 4200 },
  8: { from: 4200, to: 6400 },
  9: { from: 6400, to: 9300 },
  10: { from: 9300, to: 13000 },
  11: { from: 13000, to: 17600 },
  12: { from: 17600, to: 23200 },
  13: { from: 23200, to: 29900 },
  14: { from: 29900, to: 37800 },
  15: { from: 37800, to: 47000 },
  16: { from: 47000, to: 57600 },
  17: { from: 57600, to: 69700 },
  18: { from: 69700, to: 83400 },
  19: { from: 83400, to: 98800 },
  20: { from: 98800, to: 116000 },
  21: { from: 116000, to: 9999999999 },
};

export interface IPlayer {
  gold: number;
  cards: {
    heroes: string[];
    weapons: string[];
    attacks: string[];
  };
  escapes: number;
  story: {
    first: StoryLevel;
    second: StoryLevel;
    third: StoryLevel;
    fourth: StoryLevel;
  };
  monsters: {
    seen: string[];
    won: string[];
  };
  experience: {
    [key: string]: IHeroExperienceInfo;
  };
  equipedCards: {
    hero: string | null;
    weapon: string | null;
    attacks: string[];
    // supplies: ISupplyCard[]
  };
}

export interface IHeroExperienceInfo {
  level: number;
  experience: number;
  healthPoints: number;
  attack: number;
}

const player: IPlayer = {
  gold: 10000,
  cards: {
    heroes: [],
    weapons: [],
    attacks: [],
  },
  escapes: 1,
  story: {
    first: {
      isEnabled: true,
      currentLevel: 1,
      nextField: 'second',
      wonAllLevels: false,
    },
    second: {
      isEnabled: false,
      currentLevel: 1,
      nextField: 'third',
      wonAllLevels: false,
    },
    third: {
      isEnabled: false,
      currentLevel: 1,
      nextField: 'fourth',
      wonAllLevels: false,
    },
    fourth: {
      isEnabled: false,
      currentLevel: 1,
      nextField: 'first',
      wonAllLevels: false,
    },
  },
  monsters: {
    seen: [],
    won: [],
  },
  experience: {
    ayla: {
      level: 1,
      experience: 0,
      healthPoints: 50,
      attack: 5,
    },
  },
  equipedCards: {
    hero: null,
    weapon: null,
    attacks: [],
    // supplies: [],
  },
};

export const playerStore = ref<IPlayer>(player);

export const cardsFromPlayer = computed<ICard[]>(() => {
  const { hero, weapon, attacks } = playerStore.value.equipedCards;
  const cards: ICard[] = [];
  if (!!hero) cards.push(toHeroCard(hero));
  if (!!weapon) cards.push(toWeaponCard(weapon));
  if (attacks.length > 0) cards.push(...attacks.map(toAttackCard));
  if (playerStore.value.cards.attacks.length > 0)
    cards.push(...playerStore.value.cards.attacks.map(toAttackCard));
  if (playerStore.value.cards.heroes.length > 0)
    cards.push(...playerStore.value.cards.heroes.map(toHeroCard));
  if (playerStore.value.cards.weapons.length > 0)
    cards.push(...playerStore.value.cards.weapons.map(toWeaponCard));
  return cards;
});

export const unequipedCardsFromPlayer = computed<ICard[]>(() => {
  const cards: ICard[] = [];
  if (playerStore.value.cards.attacks.length > 0)
    cards.push(...playerStore.value.cards.attacks.map(toAttackCard));
  if (playerStore.value.cards.heroes.length > 0)
    cards.push(...playerStore.value.cards.heroes.map(toHeroCard));
  if (playerStore.value.cards.weapons.length > 0)
    cards.push(...playerStore.value.cards.weapons.map(toWeaponCard));
  return cards;
});

export const toHeroCard = (key: string): IHeroCard => heroCards[key] || null;
export const toMonsterCard = (key: string): IMonsterCard =>
  monsterCards[key] || null;
export const toMonsterAttackCard = (key: string): IAttackCard =>
  monsterAttackCards[key] || null;
export const toAttackCard = (key: string): IAttackCard =>
  attackCards[key] || null;
export const toWeaponCard = (key: string): IWeaponCard =>
  weaponCards[key] || null;

export const playerContainsCard = (card: ICard): boolean =>
  !!cardsFromPlayer.value.find((c) => c.id === card.id && c.type === card.type);

export const removeHero = () => {
  const heroKey = playerStore.value.equipedCards.hero;
  if (!heroKey) return;

  playerStore.value.cards.heroes.push(heroKey);
  playerStore.value.equipedCards.hero = null;
};

export const removeWeapon = () => {
  const weaponKey = playerStore.value.equipedCards.weapon;
  if (!weaponKey) return;

  playerStore.value.cards.weapons.push(weaponKey);
  playerStore.value.equipedCards.weapon = null;
};

export const removeAttack = (key: string) => {
  const index = playerStore.value.equipedCards.attacks.findIndex(
    (c) => c === key
  );
  playerStore.value.equipedCards.attacks.splice(index, 1);
  playerStore.value.cards.attacks.push(key);
};

export const removeCardFromDeck = (cardInfo: ICardInfo) => {
  let storeKey: 'attacks' | 'heroes' | 'weapons' = 'heroes';
  if (cardInfo.type === CardTypes.Attack) storeKey = 'attacks';
  if (cardInfo.type === CardTypes.Hero) storeKey = 'heroes';
  if (cardInfo.type === CardTypes.Weapon) storeKey = 'weapons';

  const index = playerStore.value.cards[storeKey].findIndex(
    (c) => c === cardInfo.cardKey
  );
  if (index > -1) playerStore.value.cards[storeKey].splice(index, 1);
};

export const equipNewCard = (cardInfo: ICardInfo) => {
  if (cardInfo.type === CardTypes.Hero)
    playerStore.value.equipedCards.hero = cardInfo.cardKey;
  if (cardInfo.type === CardTypes.Weapon)
    playerStore.value.equipedCards.weapon = cardInfo.cardKey;
  if (cardInfo.type === CardTypes.Attack)
    playerStore.value.equipedCards.attacks.push(cardInfo.cardKey);

  const { hero, weapon } = playerStore.value.equipedCards;
  const heroCard = hero ? heroCards[cardInfo.cardKey] : null;
  const weaponCard = weapon ? weaponCards[weapon] : null;
  if (cardInfo.type === CardTypes.Hero && !!weaponCard && !!heroCard) {
    const heroCanUseEquipedWeapon = heroCard.attributes.weaponTypes.includes(
      weaponCard.attributes.type
    );
    if (!heroCanUseEquipedWeapon) removeWeapon();
  }

  if (cardInfo.type === CardTypes.Weapon && !!heroCard && !!weaponCard) {
    const weaponCanBeUsedByEquipedHero =
      heroCard.attributes.weaponTypes.includes(weaponCard.attributes.type);
    if (!weaponCanBeUsedByEquipedHero) removeHero();
  }

  if (cardInfo.type === CardTypes.Weapon && !!weaponCard) {
    const equipedAttackCards = playerStore.value.equipedCards.attacks;
    const notAllowed = equipedAttackCards.filter((c) => {
      const attr = weaponCard.attributes as IWeaponCardAttributes;
      const attackCard = attackCards[c];
      const isWeaponAllowed = attackCard.attributes.weaponTypes.includes(
        attr.type
      );
      const isAttackAllowed = attr.attackTypes.includes(
        attackCard.attributes.attackType
      );
      return !isWeaponAllowed || !isAttackAllowed;
    });
    notAllowed.forEach((card) => {
      const index = equipedAttackCards.findIndex((c) => c === card);
      playerStore.value.equipedCards.attacks.splice(index, 1);
      playerStore.value.cards.attacks.push(card);
    });
  }
};

export const seeMonster = (monsterKey: string) => {
  if (playerStore.value.monsters.seen.includes(monsterKey)) return;
  playerStore.value.monsters.seen.push(monsterKey);
};

export const defeatMonster = (monsterKey: string) => {
  if (playerStore.value.monsters.won.includes(monsterKey)) return;
  playerStore.value.monsters.won.push(monsterKey);
};

export const goToNextLevel = async (battleData: IBattleData) => {
  await delay(1);
  const { field, level } = battleData;
  const { currentLevel, wonAllLevels } = playerStore.value.story[field];
  if (level !== currentLevel) return;

  if (currentLevel < 5) playerStore.value.story[field].currentLevel = level + 1;
  if (currentLevel === 5 && !wonAllLevels)
    playerStore.value.story[field].wonAllLevels = true;
};

export const upLevel = async (heroKey: string) => {
  playerStore.value.experience[heroKey].experience =
    expLevels[playerStore.value.experience[heroKey].level].to;
  await delay(0.8);
  playerStore.value.experience[heroKey].level += 1;
  playerStore.value.experience[heroKey].healthPoints += LIFE_ON_LEVEL;
  playerStore.value.experience[heroKey].attack += ATTACK_ON_LEVEL;
};

export const downLevel = async (heroKey: string) => {
  playerStore.value.experience[heroKey].experience =
    expLevels[playerStore.value.experience[heroKey].level].from;
  await delay(0.5);
  playerStore.value.experience[heroKey].level -= 1;
  playerStore.value.experience[heroKey].healthPoints -= LIFE_ON_LEVEL;
  playerStore.value.experience[heroKey].attack -= ATTACK_ON_LEVEL;
};

export const removeExp = async (heroKey: string, exp: number) => {
  const futureExperience =
    playerStore.value.experience[heroKey].experience - exp;

  if (
    playerStore.value.experience[heroKey].level > 1 &&
    futureExperience <
      expLevels[playerStore.value.experience[heroKey].level].from
  ) {
    await downLevel(heroKey);
    const remainingExp =
      expLevels[playerStore.value.experience[heroKey].level].to -
      futureExperience;
    if (remainingExp > 0) await removeExp(heroKey, remainingExp);
    return;
  }

  const heroExp = playerStore.value.experience[heroKey].experience;
  const newExp = heroExp - exp;
  playerStore.value.experience[heroKey].experience = newExp < 0 ? 0 : newExp;
};

export const increaseExp = async (heroKey: string, exp: number) => {
  const heroExpInfo = playerStore.value.experience[heroKey];
  const futureExperience = heroExpInfo.experience + exp;
  if (futureExperience >= expLevels[heroExpInfo.level].to) {
    await upLevel(heroKey);
    const remainingExp = futureExperience - expLevels[heroExpInfo.level].from;
    if (remainingExp > 0) increaseExp(heroKey, remainingExp);
    return;
  }

  playerStore.value.experience[heroKey].experience += exp;
  await delay(1);
};

export const calculateAttack = (
  min: number,
  max: number,
  weaponAttack: number,
  skill: number
) => {
  const base = calculateAverage(min, max);
  const weaponCalc = (6 / 5) * weaponAttack;
  const skillCalc = (skill + 4) / 28;
  return Math.floor(base + weaponCalc * skillCalc);
};

export const findCardKey = (card: ICard): string => {
  if (card.type === CardTypes.Hero) {
    const index = Object.values(heroCards).findIndex((c) => c.id === card.id);
    return Object.keys(heroCards)[index];
  } else if (card.type === CardTypes.Weapon) {
    const index = Object.values(weaponCards).findIndex((c) => c.id === card.id);
    return Object.keys(weaponCards)[index];
  } else if (card.type === CardTypes.Attack) {
    const index = Object.values(attackCards).findIndex((c) => c.id === card.id);
    return Object.keys(attackCards)[index];
  } else if (card.type === CardTypes.Monster) {
    const index = Object.values(monsterCards).findIndex(
      (c) => c.id === card.id
    );
    return Object.keys(monsterCards)[index];
  }
  return '';
};

export const buyCard = (card: ICard) => {
  if (playerStore.value.gold < card.price) return;
  includeNewCard(card);
  playerStore.value.gold -= card.price;
};

export const sellCard = (card: ICard) => {
  removeCardFromDeck({ cardKey: findCardKey(card), type: card.type });
  playerStore.value.gold += card.price;
};

export const saveGame = () => {
  const saveAsString = JSON.stringify(playerStore.value);
  const encrypted = AES.aesEncrypt(saveAsString, SHUFFLE_KEY);
  localStorage.setItem('progress', JSON.stringify(encrypted));
};

export const loadGame = () => {
  const savedGameString = localStorage.getItem('progress')!;
  const decrypted = JSON.parse(AES.aesDecrypt(savedGameString, SHUFFLE_KEY));
  playerStore.value = decrypted;
};

export const removeSave = () => {
  localStorage.removeItem('progress');
};

export const includeNewCard = (card: ICard) => {
  let cardProperty: 'heroes' | 'attacks' | 'weapons' = 'heroes';
  if (card.type === CardTypes.Hero) {
    cardProperty = 'heroes';
  } else if (card.type === CardTypes.Weapon) {
    cardProperty = 'weapons';
  } else if (card.type === CardTypes.Attack) {
    cardProperty = 'attacks';
  }
  playerStore.value.cards[cardProperty].push(findCardKey(card));
};
