import { ref } from 'vue';
import { IAttackCard, ICard, IHeroCard, IWeaponCard } from './main';

export interface IPlayer {
  gold: number;
  cards: ICard[];
  equipedCards: {
    hero: IHeroCard;
    weapon: IWeaponCard;
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

const playerStorage = ref(null);

export default { playerStorage };