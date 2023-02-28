<script setup lang="ts">
import { computed, ref } from 'vue';
import Battle from './Battle.vue';
import ChoosingHero from './ChoosingHero.vue';
import BookIcon from './icons/BookIcon.vue';
import CardsIcon from './icons/CardsIcon.vue';
import PersonIcon from './icons/PersonIcon.vue';
import ShopIcon from './icons/ShopIcon.vue';
import GoldIcon from './icons/GoldIcon.vue';
import Card from './cards/Card.vue';
import { playerStore } from '../scripts/store';
import { IHeroCard } from '../scripts/main';
import HeroDetails from './main/hero/HeroDetails.vue';

const playerHasNoCards = computed(
  () =>
    playerStore.value.cards.length === 0 &&
    playerStore.value.equipedCards.hero === null
);

const isFighting = ref<boolean>(false);
const current = ref<string>('hero');
const canUseMenu = computed(() => !playerHasNoCards.value);
</script>

<template>
  <Transition mode="out-in">
    <Battle @quit="isFighting = false" v-if="isFighting" />

    <div class="flex flex-col w-full h-full p-20 gap-10" v-else>
      <div class="w-full h-full">
        <template v-if="current === 'hero'">
          <Transition name="bounce" mode="out-in">
            <ChoosingHero
              @start-battle="isFighting = true"
              v-if="!isFighting && playerHasNoCards"
            />
            <HeroDetails
              :card="playerStore.equipedCards.hero"
              v-else-if="playerStore.equipedCards.hero"
            />
          </Transition>
        </template>
      </div>
      <div class="flex w-full justify-around">
        <div
          class="w-32 h-32 rounded text-center flex justify-center items-center bg-red-500 flex-col transition-all hover:opacity-100 shadow-lg"
          :class="{
            'scale-125 opacity-100': current === 'hero',
            'opacity-50': current != 'hero',
          }"
        >
          <PersonIcon class="w-20 h-20" />

          Hero
        </div>
        <div
          class="w-32 h-32 rounded text-center flex justify-center items-center bg-red-500 flex-col transition-all opacity-50 shadow-lg"
          :class="{ 'hover:opacity-100 cursor-pointer': canUseMenu }"
          @click="isFighting = true"
        >
          <BookIcon class="w-20 h-20" />
          Battle
        </div>
        <div
          class="w-32 h-32 rounded text-center flex justify-center items-center bg-red-500 flex-col transition-all opacity-50 shadow-lg"
          :class="{ 'hover:opacity-100 cursor-pointer': canUseMenu }"
        >
          <CardsIcon class="w-20 h-20" />
          Cards
        </div>
        <div
          class="w-32 h-32 rounded text-center flex justify-center items-center bg-red-500 flex-col transition-all opacity-50 shadow-lg"
          :class="{ 'hover:opacity-100 cursor-pointer': canUseMenu }"
        >
          <ShopIcon class="w-20 h-20" />

          Shop
        </div>
        <div
          class="w-32 h-32 rounded text-center flex justify-center items-center flex-col text-2xl"
        >
          <div class="flex gap-2">
            <GoldIcon class="w-10 h-10 text-yellow-400" />
            0
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <!-- <Transition name="bounce" mode="out-in">
    <Battle @quit="isFighting = false" v-if="isFighting" />
    <ChoosingHero @start-battle="isFighting = true" v-else />
  </Transition> -->
</template>
