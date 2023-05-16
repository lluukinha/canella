<script setup lang="ts">
import { ref } from 'vue';
import { attackCards, heroCards, weaponCards } from '../scripts/main';
import { playerStore } from '../scripts/store';
import Card from './cards/Card.vue';

const druid = {
  heroCard: heroCards[0],
  weaponCard: weaponCards[0],
  attackCard: attackCards[6],
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
        <h3 class="text-xl">Welcome, these are your starting cards. click on them to proceed.</h3>
      </div>
      <div class="flex w-full justify-around">
        <div
          class="chosen-cards cursor-pointer flex transition-all duration-300 z-50"
          :class="{ 'start-position': isHeroCardFlipped }"
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
