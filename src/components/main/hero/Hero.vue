<script setup lang="ts">
import { computed, ref } from "vue";
import {
  playerStore,
  removeCardFromDeck,
  removeHero,
  removeWeapon,
} from "../../../scripts/store";
import {
  CardTypes,
  IAttackCard,
  ICard,
  IHeroCard,
  IWeaponCard,
} from "../../../scripts/main";
import EquipCard from "../EquipCard.vue";
import BattleDetails from "./BattleDetails.vue";
import HeroDetails from "./HeroDetails.vue";

const cardTypetoInclude = ref<CardTypes | null>(null);

const heroCard = computed(
  (): IHeroCard | null => playerStore.value.equipedCards.hero
);
const weaponCard = computed(
  (): IWeaponCard | null => playerStore.value.equipedCards.weapon
);

const equipCard = (cardType: CardTypes) => {
  if (cardType === CardTypes.Hero && !!heroCard.value) return;
  if (cardType === CardTypes.Weapon && !!weaponCard.value) return;
  cardTypetoInclude.value = cardType;
};

const confirmEquip = async (card: ICard) => {
  cardTypetoInclude.value = null;
  if (!card) return;
  removeCardFromDeck(card.id);
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
};
</script>

<template>
  <div class="custom-scrollbar overflow-y-auto pb-20">
    <Transition name="fade">
      <EquipCard
        :cardType="cardTypetoInclude"
        v-if="cardTypetoInclude"
        @confirm="confirmEquip"
      />
    </Transition>
    <div class="flex flex-col justify-between items-center p-5 gap-4">
      <div class="flex flex-col gap-5 justify-center items-center">
        <HeroDetails @equipCard="equipCard" />
        <BattleDetails @equipCard="equipCard" />
      </div>
    </div>
  </div>
</template>
