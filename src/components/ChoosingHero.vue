<script setup lang="ts">
import { ref } from "vue";
import { attackCards, heroCards, weaponCards } from "../scripts/main";
import { playerStore } from "../scripts/store";
import Card from "./cards/Card.vue";

const knight = {
  id: 1,
  name: "Knight",
  heroCard: heroCards[0],
  weaponCard: weaponCards[0],
  attackCard: attackCards[0],
};
const paladin = {
  id: 1,
  name: "Paladin",
  heroCard: heroCards[1],
  weaponCard: weaponCards[1],
  attackCard: attackCards[2],
};

const chosenDeck = ref<"knight" | "paladin">("knight");

const changeDeckIndex = () => {
  chosenDeck.value = chosenDeck.value === "knight" ? "paladin" : "knight";
};

const selectCards = async (chosenCategory: any) => {
  playerStore.value.equipedCards.hero = chosenCategory.heroCard;
  playerStore.value.equipedCards.weapon = chosenCategory.weaponCard;
  playerStore.value.equipedCards.attacks.push(chosenCategory.attackCard);
};
</script>

<template>
  <div class="flex justify-center items-center w-full h-full">
    <div class="flex flex-col gap-20 w-full">
      <div class="text-center flex flex-col gap-2">
        <h2 class="text-4xl">Welcome to Canella.</h2>
        <h3 class="text-xl">Select your first deck to start.</h3>
        <h4>
          Every deck has 1 hero, 1 weapon and 1 attack card, all combined will
          let you be able to start your journey.
        </h4>
      </div>
      <div class="flex w-full justify-around">
        <Transition name="slide-left" mode="out-in">
          <div
            class="chosen-cards cursor-pointer flex transition-all duration-300 z-50"
            v-if="chosenDeck === 'knight'"
            @click="selectCards(knight)"
          >
            <Card
              :card="knight.heroCard"
              class="hero-card transition-all z-30"
              :canFlip="true"
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
            v-else-if="chosenDeck === 'paladin'"
            @click="selectCards(paladin)"
          >
            <Card
              :card="paladin.heroCard"
              class="hero-card transition-all z-30"
              :canFlip="true"
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
        </Transition>
      </div>
      <div class="flex justify-center w-full gap-10">
        <button @click="changeDeckIndex">CHANGE</button>
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
