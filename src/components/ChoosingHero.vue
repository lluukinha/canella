<script setup lang="ts">
import { ref } from 'vue';
import { attackCards, delay, heroCards, weaponCards } from '../scripts/main';
import { playerStore } from '../scripts/store';
import Card from './cards/Card.vue';
import DoubleLeft from './icons/DoubleLeft.vue';
import DoubleRight from './icons/DoubleRight.vue';

const knight = {
  heroCard: heroCards[0],
  weaponCard: weaponCards[0],
  attackCard: attackCards[0],
};
const paladin = {
  heroCard: heroCards[1],
  weaponCard: weaponCards[2],
  attackCard: attackCards[2],
};
const druid = {
  heroCard: heroCards[2],
  weaponCard: weaponCards[4],
  attackCard: attackCards[7],
};

const chosenDeck = ref<'knight' | 'paladin' | 'druid'>('knight');

const changeDeckIndex = async (direction: number) => {
  isHeroCardFlipped.value = true;
  await delay(0.3);

  if (chosenDeck.value === 'knight') {
    if (direction === 1) chosenDeck.value = 'paladin';
    if (direction === -1) chosenDeck.value = 'druid';
  } else if (chosenDeck.value === 'paladin') {
    if (direction === 1) chosenDeck.value = 'druid';
    if (direction === -1) chosenDeck.value = 'knight';
  } else {
    if (direction === 1) chosenDeck.value = 'knight';
    if (direction === -1) chosenDeck.value = 'paladin';
  }

  await delay(0.8);
  isHeroCardFlipped.value = false;
};

const selectCards = async (chosenCategory: any) => {
  playerStore.value.equipedCards.hero = chosenCategory.heroCard;
  playerStore.value.equipedCards.weapon = chosenCategory.weaponCard;
  playerStore.value.equipedCards.attacks.push(chosenCategory.attackCard);
};

const isHeroCardFlipped = ref<boolean>(false);
</script>

<template>
  <div class="flex justify-center items-center w-full h-full">
    <div class="flex flex-col gap-10 w-full">
      <div class="text-center flex flex-col gap-2">
        <h3 class="text-xl">Select your first deck to start.</h3>
      </div>
      <div class="flex w-full justify-around">
        <div class="flex justify-center w-full gap-10">
          <button @click="changeDeckIndex(-1)">
            <DoubleLeft />
          </button>
        </div>
        <Transition name="slide-left" mode="out-in">
          <div
            class="chosen-cards cursor-pointer flex transition-all duration-300 z-50"
            :class="{ 'start-position': isHeroCardFlipped }"
            v-if="chosenDeck === 'knight'"
            @click="selectCards(knight)"
          >
            <Card
              :card="knight.heroCard"
              class="hero-card transition-all z-30"
              :hideFront="isHeroCardFlipped"
              :flipOnHover="false"
            />
            <Card
              :card="knight.weaponCard"
              class="weapon-card transition-all 2s z-20 -mx-60"
            />
            <Card
              :card="knight.attackCard"
              class="attack-card transition-all z-10"
            />
          </div>
          <div
            class="chosen-cards cursor-pointer flex transition-all duration-300 z-50"
            :class="{ 'start-position': isHeroCardFlipped }"
            v-else-if="chosenDeck === 'paladin'"
            @click="selectCards(paladin)"
          >
            <Card
              :card="paladin.heroCard"
              class="hero-card transition-all z-30"
              :hideFront="isHeroCardFlipped"
              :flipOnHover="false"
            />
            <Card
              :card="paladin.weaponCard"
              class="weapon-card transition-all 2s z-20 -mx-60"
            />
            <Card
              :card="paladin.attackCard"
              class="attack-card transition-all z-10"
            />
          </div>
          <div
            class="chosen-cards cursor-pointer flex transition-all duration-300 z-50"
            :class="{ 'start-position': isHeroCardFlipped }"
            v-else-if="chosenDeck === 'druid'"
            @click="selectCards(druid)"
          >
            <Card
              :card="druid.heroCard"
              class="hero-card transition-all z-30"
              :hideFront="isHeroCardFlipped"
              :flipOnHover="false"
            />
            <Card
              :card="druid.weaponCard"
              class="weapon-card transition-all 2s z-20 -mx-60"
            />
            <Card
              :card="druid.attackCard"
              class="attack-card transition-all z-10"
            />
          </div>
        </Transition>
        <div class="flex justify-center w-full gap-10">
          <button @click="changeDeckIndex(1)">
            <DoubleRight />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.chosen-cards:not(.start-position) > .weapon-card {
  transform: translateX(220px) rotate(15deg) translateY(20px);
}

.chosen-cards:not(.start-position) > .attack-card {
  transform: translateX(-250px) rotate(-15deg) translateY(20px);
}
</style>
