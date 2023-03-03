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
import Hero from "./main/hero/Hero.vue";
import BattleView from "./main/battle/BattleView.vue";
import EscapeIcon from "./icons/EscapeIcon.vue";

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
  Rewards = "rewards",
}

const isFighting = ref<boolean>(false);
const current = ref<MenuItems>(MenuItems.Battle);
</script>

<template>
  <Transition name="bounce" mode="out-in">
    <ChoosingHero v-if="playerHasNoCards" />
    <div class="w-full h-full flex flex-col" v-else-if="!isFighting">
      <div
        class="bg-gradient-to-br from-slate-800 to-black h-16 w-full flex justify-between p-4 items-center"
      >
        <div
          class="flex gap-2 py-2 px-4 rounded shadow hover:ring-1 cursor-pointer"
          :class="{ 'bg-slate-700 ring-1': current === MenuItems.Battle }"
          @click="current = MenuItems.Battle"
        >
          <BookIcon class="w-6 h-6" />
          Story
        </div>
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

        <div
          class="flex gap-2 py-2 px-4 rounded shadow hover:ring-1 cursor-pointer"
          :class="{ 'bg-slate-700 ring-1': current === MenuItems.Rewards }"
          @click="current = MenuItems.Rewards"
        >
          <ShopIcon class="w-6 h-6" />

          Rewards
        </div>

        <div class="flex gap-5 py-2 px-4">
          <div class="flex gap-2" title="Escapes">
            <EscapeIcon class="w-6 h-6 text-gray-400" />
            {{ playerStore.escapes }}
          </div>

          <div class="flex gap-2">
            <GoldIcon class="w-6 h-6 text-yellow-400" />
            {{ playerStore.gold }}
          </div>
        </div>
      </div>
      <Transition name="slide" mode="out-in">
        <Hero v-if="current === MenuItems.Hero" />
        <BattleView
          v-else-if="current === MenuItems.Battle"
          @start-battle="isFighting = true"
        />
        <div v-else>o que é isso</div>
      </Transition>
    </div>
    <Battle v-else-if="isFighting" @quit="isFighting = false" />
  </Transition>
</template>
