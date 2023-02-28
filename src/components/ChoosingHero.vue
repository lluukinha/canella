<script setup lang="ts">
import { attackCards, heroCards, weaponCards } from "../scripts/main";
import { playerStore } from "../scripts/store";
import Card from "./cards/Card.vue";

const categories = [
  {
    id: 1,
    name: "Knight",
    heroCard: heroCards[0],
    weaponCard: weaponCards[0],
    attackCard: attackCards[0],
  },
  {
    id: 1,
    name: "Paladin",
    heroCard: heroCards[1],
    weaponCard: weaponCards[1],
    attackCard: attackCards[2],
  },
];

const selectCards = async (chosenCategory: any) => {
  playerStore.value.equipedCards.hero = chosenCategory.heroCard;
  playerStore.value.equipedCards.weapon = chosenCategory.weaponCard;
  playerStore.value.equipedCards.attacks.push(chosenCategory.attackCard);
};
</script>

<template>
  <div class="flex justify-center items-center w-full h-full">
    <div class="flex flex-col gap-20">
      <div class="text-center flex flex-col gap-2">
        <h2 class="text-4xl">Welcome to Canella.</h2>
        <h3 class="text-xl">Select your first deck to start.</h3>
        <h4>
          Every deck has 1 hero, 1 weapon and 1 attack card, both combined will
          let you be able to start your journey.
        </h4>
      </div>
      <div class="flex w-full justify-between">
        <div
          v-for="c in categories"
          @click="selectCards(c)"
          class="chosen-cards cursor-pointer flex transition-all"
        >
          <Card
            :card="c.heroCard"
            class="hero-card transition-all z-30 top-0"
          />
          <Card
            :card="c.weaponCard"
            class="weapon-card transition-all top-0 z-20 -mx-56"
          />
          <Card
            :card="c.attackCard"
            class="attack-card transition-all top-0 z-10"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.chosen-cards:hover > .weapon-card {
  transform: translateX(220px) rotate(15deg) translateY(20px);
}

.chosen-cards:hover > .attack-card {
  transform: translateX(-250px) rotate(-15deg) translateY(20px);
}
</style>
