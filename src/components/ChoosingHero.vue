<script setup lang="ts">
import { ref } from 'vue';
import { attackCards, heroCard, weaponCards } from '../scripts/main';
import Card from './cards/Card.vue';

const categories = [
  {
    id: 1,
    name: 'Knight',
    heroCard,
    weaponCard: weaponCards[0],
    attackCard: attackCards[0],
  },
];
const chosenCategory = ref();

const checkSelection = async (chosenCategory: any) => {
  const result = confirm('Do you want to choose knight as your first hero?');
  if (!!result) emit('startBattle');
};

const emit = defineEmits(['startBattle']);
</script>

<template>
  <div class="flex justify-around items-center w-full h-full">
    <template v-if="!chosenCategory">
      <div
        class="p-5 rounded ring w-56 h-64 bg-slate-800 text-white transition-all hover:scale-110 select-none"
        v-for="c in categories"
        @click="chosenCategory = c"
      >
        {{ c.name }}<br />
        +3 cards
      </div>
    </template>
    <div class="w-full h-full" v-else>
      <div>
        <button @click="chosenCategory = undefined">go back</button>
      </div>
      <div class="flex w-full h-full">
        <div class="w-1/2">
          <div
            class="w-full flex justify-center chosen-cards pt-5 cursor-pointer relative"
            @click="checkSelection(chosenCategory)"
          >
            <Card
              :card="chosenCategory.heroCard"
              class="hero-card absolute transition-all z-30"
            />
            <Card
              :card="chosenCategory.weaponCard"
              class="weapon-card transition-all absolute z-20"
            />
            <Card
              :card="chosenCategory.attackCard"
              class="attack-card transition-all absolute z-10"
            />
          </div>
        </div>
        <div class="w-1/2">
          <div
            class="w-full flex justify-center chosen-cards pt-5 cursor-pointer relative"
            @click="checkSelection(chosenCategory)"
          >
            <Card
              :card="chosenCategory.heroCard"
              class="hero-card absolute transition-all z-30"
            />
            <Card
              :card="chosenCategory.weaponCard"
              class="weapon-card transition-all absolute z-20"
            />
            <Card
              :card="chosenCategory.attackCard"
              class="attack-card transition-all absolute z-10"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.chosen-cards:hover > .weapon-card {
  transform: translateX(-230px) rotate(-15deg) translateY(30px);
}

.chosen-cards:hover > .attack-card {
  transform: translateX(230px) rotate(15deg) translateY(30px);
}
</style>
