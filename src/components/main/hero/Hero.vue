<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  playerStore,
  removeCardFromDeck,
  equipNewCard,
} from '../../../scripts/store';
import { CardTypes } from '../../../scripts/main';
import EquipCard from '../EquipCard.vue';
import BattleDetails from './BattleDetails.vue';
import HeroDetails from './HeroDetails.vue';

const cardTypetoInclude = ref<CardTypes | null>(null);
const heroCard = computed(
  (): string | null => playerStore.value.equipedCards.hero
);
const weaponCard = computed(
  (): string | null => playerStore.value.equipedCards.weapon
);

const equipCard = (cardType: CardTypes) => {
  if (cardType === CardTypes.Hero && !!heroCard.value) return;
  if (cardType === CardTypes.Weapon && !!weaponCard.value) return;
  cardTypetoInclude.value = cardType;
};

const confirmEquip = async (cardInfo: { cardKey: string; type: CardTypes }) => {
  cardTypetoInclude.value = null;
  removeCardFromDeck(cardInfo);
  equipNewCard(cardInfo);
};
</script>

<template>
  <div class="custom-scrollbar overflow-y-auto">
    <Transition name="fade">
      <EquipCard
        :cardType="cardTypetoInclude"
        v-if="cardTypetoInclude"
        @confirm="confirmEquip"
        @close="cardTypetoInclude = null"
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
