<script setup lang="ts">
import { computed, ref } from "vue";
import Battle from "./Battle.vue";
import ChoosingHero from "./ChoosingHero.vue";
import BookIcon from "./icons/BookIcon.vue";
import CardsIcon from "./icons/CardsIcon.vue";
import PersonIcon from "./icons/PersonIcon.vue";
import ShopIcon from "./icons/ShopIcon.vue";
import GoldIcon from "./icons/GoldIcon.vue";
import { playerStore } from "../scripts/store";
import HeroDetails from "./main/hero/HeroDetails.vue";

const playerHasNoCards = computed(
  () =>
    playerStore.value.cards.length === 0 &&
    playerStore.value.equipedCards.hero === null
);

enum MenuItems {
  Hero = "hero",
  Battle = "battle",
  Cards = "cards",
  Shop = "shop",
}

const current = ref<MenuItems>(MenuItems.Hero);
</script>

<template>
  <Transition name="bounce" mode="out-in">
    <ChoosingHero v-if="playerHasNoCards" />
    <div class="w-full h-full flex" v-else>
      <div
        class="bg-gradient-to-br from-slate-800 to-black h-full w-64 flex flex-col"
      >
        <div class="flex flex-col gap-4 p-4">
          <div
            class="flex gap-2 py-2 px-4 rounded shadow hover:ring-1"
            :class="{ 'bg-slate-700 ring-1': current === MenuItems.Hero }"
            @click="current = MenuItems.Hero"
          >
            <PersonIcon class="w-6 h-6" />

            Hero
          </div>
          <div
            class="flex gap-2 py-2 px-4 rounded shadow hover:ring-1 cursor-pointer"
            :class="{ 'bg-slate-700 ring-1': current === MenuItems.Battle }"
            @click="current = MenuItems.Battle"
          >
            <BookIcon class="w-6 h-6" />
            Battle
          </div>
          <div
            class="flex gap-2 py-2 px-4 rounded shadow hover:ring-1 cursor-pointer"
            :class="{ 'bg-slate-700 ring-1': current === MenuItems.Cards }"
            @click="current = MenuItems.Cards"
          >
            <CardsIcon class="w-6 h-6" />
            Cards
          </div>
          <div
            class="flex gap-2 py-2 px-4 rounded shadow hover:ring-1 cursor-pointer"
            :class="{ 'bg-slate-700 ring-1': current === MenuItems.Shop }"
            @click="current = MenuItems.Shop"
          >
            <ShopIcon class="w-6 h-6" />

            Shop
          </div>
          <div class="flex gap-2 py-2 px-4 absolute bottom-5">
            <div class="flex gap-2">
              <GoldIcon class="w-6 h-6 text-yellow-400" />
              0
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full h-full p-5 gap-10">
        <div class="w-full h-full">
          <Transition name="slide" mode="out-in">
            <HeroDetails
              :card="playerStore.equipedCards.hero!"
              v-if="current === 'hero'"
            />
            <Battle v-else-if="current === 'battle'" />
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>
