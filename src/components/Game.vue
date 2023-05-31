<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import Battle from './Battle.vue';
import ChoosingHero from './ChoosingHero.vue';
import BookIcon from './icons/BookIcon.vue';
import PersonIcon from './icons/PersonIcon.vue';
import ShopIcon from './icons/ShopIcon.vue';
import GoldIcon from './icons/GoldIcon.vue';
import {
  goToNextLevel,
  playerStore,
  saveGame,
  loadGame,
  removeSave,
} from '../scripts/store';
import Hero from './main/hero/Hero.vue';
import BattleView from './main/battle/BattleView.vue';
import EscapeIcon from './icons/EscapeIcon.vue';
import { IBattleData } from '../scripts/main';
import CardsView from './main/cards/CardsView.vue';
import CardsSearchIcon from './icons/CardsSearchIcon.vue';
import ShopView from './main/shop/ShopView.vue';
import SaveIcon from './icons/SaveIcon.vue';

const playerHasNoCards = computed(
  () =>
    playerStore.value.cards.heroes.length === 0 &&
    playerStore.value.equipedCards.hero === null
);

enum MenuItems {
  Hero = 'hero',
  Battle = 'battle',
  Cards = 'cards',
  Shop = 'shop',
}

const battleData = ref<IBattleData>();
const current = ref<MenuItems>(MenuItems.Battle);

const startBattle = (battle: IBattleData) => {
  battleData.value = battle;
};

const wonBattle = async (data: IBattleData) => {
  battleData.value = undefined;
  goToNextLevel(data);
};

const saveData = async () => {
  const willSave = await confirm('Do you want to save your current progress?');
  if (willSave) saveGame();
};

const continueGame = () => {
  loadGame();
  showContinueInfo.value = false;
};

const newGame = () => {
  showContinueInfo.value = false;
};

const showContinueInfo = ref<boolean>(!!localStorage.getItem('progress'));
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div
      v-if="showContinueInfo"
      class="flex justify-center items-center flex-col gap-20"
    >
      <h1 class="text-3xl">Saved game found, do you want to continue?</h1>

      <div class="flex flex-col gap-5 text-2xl">
        <button class="text-gray-400 hover:text-white" @click="continueGame()">
          CONTINUE
        </button>
        <button class="text-gray-400 hover:text-white" @click="newGame()">
          NEW GAME
        </button>
      </div>
    </div>
    <ChoosingHero v-else-if="playerHasNoCards" />
    <div class="w-full h-full flex flex-col" v-else>
      <Transition name="swirl">
        <Battle
          v-if="!!battleData"
          @quit="battleData = undefined"
          @continue="wonBattle(battleData!)"
          :battleData="battleData"
        />
      </Transition>
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
          <CardsSearchIcon />
          Cards Wiki
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
          @click="saveData()"
        >
          <SaveIcon class="w-6 h-6" />
          Save
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
          @start-battle="startBattle"
        />
        <CardsView v-else-if="current === MenuItems.Cards" />
        <ShopView v-else-if="current === MenuItems.Shop" />
      </Transition>
    </div>
  </Transition>
</template>
