import { ref } from 'vue';
import { IAttackCard, ICard, IHeroCard, IWeaponCard, heroCards } from './main';

export interface IPlayer {
  gold: number;
  cards: ICard[];
  equipedCards: {
    hero: IHeroCard | null;
    weapon: IWeaponCard | null;
    attacks: IAttackCard[];
    // supplies: ISupplyCard[]
  };
}

const player = {
  gold: 0,
  cards: [],
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

export const removeCardFromDeck = (cardId: number) => {
  const index = playerStore.value.cards.findIndex((c) => c.id === cardId);
  if (index > -1) playerStore.value.cards.splice(index, 1);
};

export const removeAttack = (index: number) => {
  const card = playerStore.value.equipedCards.attacks[index];
  playerStore.value.cards.push(card);
  playerStore.value.equipedCards.attacks.splice(index, 1);
};