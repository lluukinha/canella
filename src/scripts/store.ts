import { ref } from 'vue';
import { IAttackCard, ICard, IHeroCard, IWeaponCard, heroCards, weaponCards, attackCards, CardTypes, IWeaponCardAttributes } from './main';

export interface IPlayer {
  gold: number;
  cards: ICard[];
  escapes: number;
  equipedCards: {
    hero: IHeroCard | null;
    weapon: IWeaponCard | null;
    attacks: IAttackCard[];
    // supplies: ISupplyCard[]
  };
}

const player : IPlayer = {
  gold: 0,
  cards: [],
  escapes: 3,
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
}

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
    const notAllowed = equipedAttackCards.filter(
      (c) =>
        !c.attributes.weaponTypes.includes(
          (card.attributes as IWeaponCardAttributes).type
        )
    );
    notAllowed.forEach((card) => {
      const index = playerStore.value.equipedCards.attacks.findIndex(
        (c) => c.id === card.id
      );
      playerStore.value.equipedCards.attacks.splice(index, 1);
      playerStore.value.cards.push(card);
    });
  }
}