<script setup lang="ts">
import { ref } from 'vue';
import {
attackCards,
  heroCard,
  HeroTypes,
  ICard,
  IHeroCard,
  IWeaponCard,
  weaponCards,
} from '../scripts/main';
import Card from './cards/Card.vue';

const categories = [{ id: 1, name: 'Knight', cards: [heroCard, weaponCards[0], attackCards[0]] }];
const cards = ref<ICard[]>([]);
const chosenCard = ref<IHeroCard>();
const weaponCard = ref<IWeaponCard>();

const chooseCards = (chosenCards: ICard[]) => {
  cards.value = chosenCards;
};

defineEmits(['startBattle']);
</script>

<template>
  <div class="flex justify-around items-center w-full h-full">
    <template v-if="cards.length === 0 && !chosenCard">
      <div
        class="p-5 rounded ring w-56 h-64 bg-slate-800 text-white transition-all hover:scale-110 select-none"
        v-for="c in categories"
        @click="cards = c.cards"
      >
        {{ c.name }}
      </div>
    </template>
    <div
      class="flex flex-col w-full gap-10"
      v-if="cards.length > 0 && !chosenCard"
      @click="chooseCards(cards)"
    >
    <div class="flex justify-around">
      <div class="flex">
        <Card :card="card" v-for="card in cards" />
      </div>
      <div class="flex flex-col justify-center text-center items-center">
        <p>
          Do you want to choose 'Knight' to be your initial hero?
        </p>
        <div class="flex gap-5">
          <button @click="$emit('startBattle')">Yes!</button>
          <button @click="chosenCard = undefined">No!</button>
        </div>
      </div>
    </div>
      <button @click="cards = []">go back</button>
    </div>
  </div>
</template>
