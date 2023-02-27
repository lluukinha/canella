<script setup lang="ts">
import { ref } from 'vue';
import {
  heroCard,
  HeroTypes,
  IHeroCard,
  IWeaponCard,
  weaponCards,
} from '../scripts/main';

const categories = [{ id: 1, name: 'Knight', cards: [heroCard] }];
const cards = ref();
const chosenCard = ref<IHeroCard>();
const weaponCard = ref<IWeaponCard>();

const chooseCard = (card: IHeroCard) => {
  if (card.attributes.type === HeroTypes.Knight) {
    weaponCard.value = weaponCards[0];
  }
  chosenCard.value = card;
};

defineEmits(['startBattle']);
</script>

<template>
  <div class="flex justify-around items-center w-full h-full">
    <template v-if="!cards && !chosenCard">
      <div
        class="p-5 rounded ring w-56 h-64 bg-slate-800 text-white transition-all hover:scale-110 select-none"
        v-for="c in categories"
        @click="cards = c.cards"
      >
        {{ c.name }}
      </div>
    </template>
    <div
      class="flex flex-col w-full justify-center items-center gap-10"
      v-if="!!cards && !chosenCard"
    >
      <div class="flex w-full justify-around items-center">
        <div
          class="flex flex-col gap-2 bg-slate-800 p-5 rounded ring h-64 w-56 text-white select-none transition-all hover:scale-110"
          v-for="t in cards"
          @click="chooseCard(t)"
        >
          <div>
            <h2 class="text-sm font-semibold">Name</h2>
            <span class="text-md">{{ t.name }}</span>
          </div>
          <div>
            <h2 class="text-sm font-semibold">Type</h2>
            <span class="text-md">{{ t.type }}</span>
          </div>
          <div>
            <h2 class="text-sm font-semibold">Attack Type</h2>
            <span class="text-md">{{ t.attributes.attackType }}</span>
          </div>
        </div>
      </div>
      <button @click="cards = null">go back</button>
    </div>
    <div v-if="!!chosenCard" class="flex gap-10 justify-center">
      <div class="flex flex-col gap-2">
        <h1>You get:</h1>
        <div
          class="flex flex-col gap-2 bg-slate-800 p-5 rounded ring w-72 h-96 text-white select-none"
        >
          <component
            v-if="chosenCard.component"
            :is="chosenCard.component"
          ></component>
          <div>
            <h2 class="text-sm font-semibold">Type</h2>
            <span class="text-md">{{ chosenCard.type }}</span>
          </div>
          <div>
            <h2 class="text-sm font-semibold">Name</h2>
            <span class="text-md">{{ chosenCard.name }}</span>
          </div>
          <div>
            <h2 class="text-sm font-semibold">Attack Type</h2>
            <span class="text-md">{{ chosenCard.attributes.attackType }}</span>
          </div>
          <div>
            <h2 class="text-sm font-semibold">Weapon types</h2>
            <div class="skills flex gap-1 flex-wrap">
              <span
                v-for="weapon in chosenCard.attributes.weaponTypes"
                class="px-2 py-0 bg-blue-800 shadow rounded flex justify-center items-center text-xs font-bold"
                >{{ weapon }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2" v-if="weaponCard">
        <h1>Plus:</h1>
        <div
          class="flex flex-col gap-2 bg-slate-800 p-5 rounded ring w-72 h-96 text-white select-none"
        >
          <div>
            <h2 class="text-sm font-semibold">Type</h2>
            <span class="text-md">{{ weaponCard.type }}</span>
          </div>
          <div>
            <h2 class="text-sm font-semibold">Name</h2>
            <span class="text-md">{{ weaponCard.name }}</span>
          </div>
          <div>
            <h2 class="text-sm font-semibold">Weapon type</h2>
            <span class="text-md">{{ weaponCard.attributes.type }}</span>
          </div>
          <div>
            <h2 class="text-sm font-semibold">Attack type</h2>
            <span class="text-md">{{ weaponCard.attributes.attackType }}</span>
          </div>
          <div>
            <h2 class="text-sm font-semibold">Attack</h2>
            <span class="text-md">{{ weaponCard.attributes.attack }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col justify-center text-center items-center">
        <p>
          Do you want to choose {{ chosenCard.name }} to be your initial hero?
        </p>
        <div class="flex gap-5">
          <button @click="$emit('startBattle')">Yes!</button>
          <button @click="chosenCard = undefined">No!</button>
        </div>
      </div>
    </div>
  </div>
</template>
