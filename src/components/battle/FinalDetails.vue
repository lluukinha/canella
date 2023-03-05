<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue';
import {
  experienceTable,
  IMonsterCard,
  delay,
  upLevel,
  downLevel,
  ICard,
  calculateAverage,
  successProbability,
} from '../../scripts/main';
import Card from '../cards/Card.vue';

import { playerStore } from '../../scripts/store';

const props = defineProps({
  enemyHp: {
    type: Number,
    required: true,
  },
  enemy: {
    type: Object as PropType<IMonsterCard>,
    required: true,
  },
});
defineEmits(['continue', 'quit']);

const finishAnimation = async (newExp: number) => {
  const heroCardAttributes = playerStore.value.equipedCards.hero!.attributes;
  const futureExperience = heroCardAttributes.experience + newExp;
  if (futureExperience >= experienceTable[heroCardAttributes.level].to) {
    await upLevel(playerStore.value.equipedCards.hero!);
    const remainingExp =
      futureExperience - experienceTable[heroCardAttributes.level].from;
    if (remainingExp > 0) finishAnimation(remainingExp);
    showContinue.value = true;
    return;
  }

  await delay(0.5);
  playerStore.value.equipedCards.hero!.attributes.experience += newExp;
  showContinue.value = true;
};

const lostBattle = async (newExp: number) => {
  const heroCardAttributes = playerStore.value.equipedCards.hero!.attributes;
  const futureExperience = heroCardAttributes.experience - newExp;

  if (
    heroCardAttributes.level > 1 &&
    futureExperience < experienceTable[heroCardAttributes.level].from
  ) {
    await downLevel(playerStore.value.equipedCards.hero!);
    const remainingExp =
      experienceTable[heroCardAttributes.level].to - futureExperience;
    if (remainingExp > 0) lostBattle(remainingExp);
    return;
  }

  removeExp(newExp);
  showContinue.value = true;
};

const gold = ref<number>(0);
const card = ref<ICard | null>(null);
const showContinue = ref<boolean>(false);

const calculateLoot = () => {
  const { min, max } = props.enemy.attributes.loot.gold;
  gold.value = calculateAverage(min, max);

  const cardLoot = props.enemy.attributes.loot.card;

  if (!!cardLoot && !successProbability(cardLoot.chance)) {
    card.value = cardLoot.card;
    playerStore.value.cards.push(card.value);
  }

  playerStore.value.gold += gold.value;
};

const removeExp = (exp: number) => {
  const heroExp = playerStore.value.equipedCards.hero!.attributes.experience;
  const newExp = heroExp - exp < 0 ? 0 : exp;
  playerStore.value.equipedCards.hero!.attributes.experience -= newExp;
};

onMounted(async () => {
  if (props.enemyHp === 0) {
    calculateLoot();
    await delay(0.5);
    finishAnimation(props.enemy.attributes.experience);
  } else {
    await delay(0.5);
    lostBattle(props.enemy.attributes.experience);
  }
});
</script>

<template>
  <div
    class="w-full h-full absolute z-50 flex justify-center items-center select-none"
  >
    <div class="z-50 flex flex-col justify-center items-center gap-5 w-full">
      <div class="text-white w-full flex justify-center px-10 gap-20">
        <Card :card="playerStore.equipedCards.hero!" />
        <div
          class="text-center flex justify-center flex-col items-center gap-5"
        >
          <template v-if="enemyHp === 0">
            <h1 class="text-5xl">ENEMY DEFEATED!</h1>
            <ul>
              <li>Earned {{ enemy.attributes.experience }} exp</li>
              <li v-if="gold > 0">{{ gold }} Gold</li>
              <li class="flex gap-2" v-if="card">
                <span class="drop-shadow text-yellow-400">NEW CARD:</span>
                <span class="underline">{{ card.name }}</span>
              </li>
            </ul>
          </template>
          <template v-else>
            <h1 class="text-5xl">YOU LOSE!</h1>
            <ul>
              <li>Lost {{ enemy.attributes.experience }} exp</li>
            </ul>
          </template>
        </div>
      </div>

      <div class="flex w-full justify-around">
        <button
          class="px-4 py-2 text-white text-4xl transition-all disabled:opacity-0"
          @click="$emit(enemyHp > 0 ? 'quit' : 'continue')"
          :disabled="!showContinue"
        >
          CONTINUE
        </button>
      </div>
    </div>
    <div class="overlay bg-black opacity-90 w-full h-full absolute z-40"></div>
  </div>
</template>
