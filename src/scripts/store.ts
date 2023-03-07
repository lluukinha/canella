import { ref } from "vue";
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
} from "./main";

interface ILevelIndicator {
  from: number;
  to: number;
}

interface IExperienceTable {
  [key: number]: ILevelIndicator;
}

export const ATTACK_ON_LEVEL = 5;
export const LIFE_ON_LEVEL = 30;

export const expLevels: IExperienceTable = {
  1: { from: 0, to: 100 },
  2: { from: 100, to: 200 },
  3: { from: 200, to: 300 },
  4: { from: 300, to: 4000 },
};

export interface IPlayer {
  gold: number;
  cards: ICard[];
  escapes: number;
  story: {
    forest: StoryLevel;
    darkForest: StoryLevel;
    castle: StoryLevel;
    castleRuins: StoryLevel;
  };
  monsters: {
    seen: number[];
    won: number[];
  };
  equipedCards: {
    hero: IHeroCard | null;
    weapon: IWeaponCard | null;
    attacks: IAttackCard[];
    // supplies: ISupplyCard[]
  };
}

const player: IPlayer = {
  gold: 0,
  cards: [],
  escapes: 1,
  story: {
    forest: {
      isEnabled: true,
      currentLevel: 1,
      nextField: "darkForest",
      wonAllLevels: false,
    },
    darkForest: {
      isEnabled: false,
      currentLevel: 1,
      nextField: "castle",
      wonAllLevels: false,
    },
    castle: {
      isEnabled: false,
      currentLevel: 1,
      nextField: "castleRuins",
      wonAllLevels: false,
    },
    castleRuins: {
      isEnabled: false,
      currentLevel: 1,
      nextField: "forest",
      wonAllLevels: false,
    },
  },
  monsters: {
    seen: [],
    won: [],
  },
  equipedCards: {
    hero: null,
    weapon: null,
    attacks: [],
    // supplies: [],
  },
};

export const playerStore = ref<IPlayer>(player);

export const removeHero = () => {
  const heroCard = playerStore.value.equipedCards.hero as ICard;
  playerStore.value.cards.push(heroCard);
  playerStore.value.equipedCards.hero = null;
};

export const removeWeapon = () => {
  const weaponCard = playerStore.value.equipedCards.weapon as ICard;
  playerStore.value.cards.push(weaponCard);
  playerStore.value.equipedCards.weapon = null;
};

export const removeAttack = (card: IAttackCard) => {
  const index = playerStore.value.equipedCards.attacks.findIndex(
    (c) => c.id === card.id
  );
  playerStore.value.equipedCards.attacks.splice(index, 1);
  playerStore.value.cards.push(card);
};

export const removeCardFromDeck = (cardId: number) => {
  const index = playerStore.value.cards.findIndex((c) => c.id === cardId);
  if (index > -1) playerStore.value.cards.splice(index, 1);
};

export const equipNewCard = (card: ICard) => {
  if (card.type === CardTypes.Hero)
    playerStore.value.equipedCards.hero = card as IHeroCard;
  if (card.type === CardTypes.Weapon)
    playerStore.value.equipedCards.weapon = card as IWeaponCard;
  if (card.type === CardTypes.Attack)
    playerStore.value.equipedCards.attacks.push(card as IAttackCard);

  const { hero, weapon } = playerStore.value.equipedCards;
  if (card.type === CardTypes.Hero && !!weapon) {
    const heroCanUseEquipedWeapon = (
      card as IHeroCard
    ).attributes.weaponTypes.includes(weapon.attributes.type);
    if (!heroCanUseEquipedWeapon) removeWeapon();
  }

  if (card.type === CardTypes.Weapon && !!hero) {
    const weaponCanBeUsedByEquipedHero = hero.attributes.weaponTypes.includes(
      (card as IWeaponCard).attributes.type
    );
    if (!weaponCanBeUsedByEquipedHero) removeHero();
  }

  if (card.type === CardTypes.Weapon) {
    const equipedAttackCards = playerStore.value.equipedCards.attacks;
    const notAllowed = equipedAttackCards.filter((c) => {
      const attr = card.attributes as IWeaponCardAttributes;
      const isWeaponAllowed = c.attributes.weaponTypes.includes(attr.type);
      const isAttackAllowed = attr.attackTypes.includes(
        c.attributes.attackType
      );
      return !isWeaponAllowed || !isAttackAllowed;
    });
    notAllowed.forEach((card) => {
      const index = playerStore.value.equipedCards.attacks.findIndex(
        (c) => c.id === card.id
      );
      playerStore.value.equipedCards.attacks.splice(index, 1);
      playerStore.value.cards.push(card);
    });
  }
};

export const seeMonster = (monsterId: number) => {
  playerStore.value.monsters.seen.push(monsterId);
};

export const defeatMonster = (monsterId: number) => {
  playerStore.value.monsters.won.push(monsterId);
};

export const goToNextLevel = async (battleData: IBattleData) => {
  await delay(1);
  const { field, level } = battleData;
  const { currentLevel, wonAllLevels } = playerStore.value.story[field];
  if (level !== currentLevel) return;

  if (currentLevel < 12)
    playerStore.value.story[field].currentLevel = level + 1;
  if (currentLevel === 12 && !wonAllLevels)
    playerStore.value.story[field].wonAllLevels = true;
};

export const upLevel = async (hero: IHeroCard) => {
  hero.attributes.experience = expLevels[hero.attributes.level].to;
  await delay(0.8);
  hero.attributes.level += 1;
  hero.attributes.healthPoints += LIFE_ON_LEVEL;
  hero.attributes.attack += ATTACK_ON_LEVEL;
};

export const downLevel = async (hero: IHeroCard) => {
  hero.attributes.experience = expLevels[hero.attributes.level].from;
  await delay(0.5);
  hero.attributes.level -= 1;
  hero.attributes.healthPoints -= LIFE_ON_LEVEL;
  hero.attributes.attack -= ATTACK_ON_LEVEL;
};

export const removeExp = async (hero: IHeroCard, exp: number) => {
  const futureExperience = hero.attributes.experience - exp;

  if (
    hero.attributes.level > 1 &&
    futureExperience < expLevels[hero.attributes.level].from
  ) {
    await downLevel(hero);
    const remainingExp = expLevels[hero.attributes.level].to - futureExperience;
    if (remainingExp > 0) await removeExp(hero, remainingExp);
    return;
  }

  const heroExp = hero.attributes.experience;
  const newExp = heroExp - exp;
  hero.attributes.experience = newExp < 0 ? 0 : newExp;
};

export const increaseExp = async (hero: IHeroCard, exp: number) => {
  const futureExperience = hero.attributes.experience + exp;
  if (futureExperience >= expLevels[hero.attributes.level].to) {
    await upLevel(hero);
    const remainingExp =
      futureExperience - expLevels[hero.attributes.level].from;
    if (remainingExp > 0) increaseExp(hero, remainingExp);
    return;
  }

  hero.attributes.experience += exp;
  await delay(1);
};
