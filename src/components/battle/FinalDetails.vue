<script setup lang="ts">
import { computed, onMounted, PropType, ref, watch } from "vue";
import {
  IMonsterCard,
  delay,
  ICard,
  calculateAverage,
  successProbability,
  IHeroCardAttributes,
} from "../../scripts/main";
import Card from "../cards/Card.vue";

import { playerStore, removeExp, increaseExp, defeatMonster } from "../../scripts/store";
import GoldIcon from "../icons/GoldIcon.vue";
import HeroLevelChangeInformation from "./HeroLevelChangeInformation.vue";
import NewCardIcon from "../icons/NewCardIcon.vue";

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
defineEmits(["continue", "quit"]);

const wonBattle = async (newExp: number) => {
  await delay(0.5);
  defeatMonster(props.enemy.id);
  await increaseExp(playerStore.value.equipedCards.hero!, newExp);
  await delay(0.2);
  showContinue.value = true;
};

const lostBattle = async (newExp: number) => {
  await removeExp(playerStore.value.equipedCards.hero!, newExp);
  showContinue.value = true;
};

const gold = ref<number>(0);
const card = ref<ICard | null>(null);
const showContinue = ref<boolean>(false);

const calculateLoot = () => {
  const { min, max } = props.enemy.attributes.loot.gold;
  gold.value = calculateAverage(min, max);

  const cardLoot = props.enemy.attributes.loot.card;

  if (!!cardLoot && successProbability(cardLoot.chance)) {
    card.value = cardLoot.card;
    playerStore.value.cards.push(card.value);
  }

  playerStore.value.gold += gold.value;
};

const expLost = computed(() => (props.enemy.attributes.experience / 100) * 20);

onMounted(async () => {
  if (props.enemyHp === 0) {
    calculateLoot();
    await wonBattle(props.enemy.attributes.experience);
  } else {
    await lostBattle(expLost.value);
  }
});

const levelChanged = ref<boolean>(false);
const hero = computed<IHeroCardAttributes>(() => playerStore.value.equipedCards.hero!.attributes);

watch(
  () => playerStore.value.equipedCards.hero?.attributes.level,
  async (newValue, oldValue) => {
    if (!oldValue || !newValue || newValue === oldValue) return;
    levelChanged.value = true;
  },
  { deep: true }
);
</script>

<template>
  <div
    class="w-full h-full absolute z-50 flex justify-center items-center select-none"
  >
    <div class="z-50 flex flex-col justify-center items-center gap-5 w-full">
      <div class="text-white w-full flex justify-center px-10 gap-20">
        <Card :card="playerStore.equipedCards.hero!" :class="{ 'opacity-70': enemyHp > 0 }" />
        <div
          class="text-center flex justify-center flex-col items-center gap-5"
        >
          <template v-if="enemyHp === 0">
            <h1 class="text-5xl">ENEMY DEFEATED!</h1>
            <Transition name="fade">
              <HeroLevelChangeInformation type="up" :hero="hero" v-if="levelChanged" />
            </Transition>
            <ul class="flex flex-col gap-2">
              <li class="text-lg flex gap-2 items-center justify-center">
                <span class="font-semibold text-3xl">+{{ enemy.attributes.experience }}</span> experience
              </li>
              <li class="flex gap-2" v-if="!!card">
                <NewCardIcon />
                <span class="drop-shadow text-yellow-400">NEW CARD:</span>
                <span class="underline">{{ card.name }}</span>
              </li>
              <li v-if="gold > 0" class="flex items-end text-3xl gap-1 justify-center font-semibold">
                <GoldIcon />
                {{ gold }}
              </li>
            </ul>
          </template>
          <template v-else>
            <h1 class="text-5xl">YOU LOSE!</h1>
            <Transition name="fade">
              <HeroLevelChangeInformation type="down" :hero="hero" v-if="levelChanged" />
            </Transition>
            <ul>
              <li class="text-lg flex gap-2 items-center">
                <span class="font-semibold text-3xl">-{{ expLost }}</span> experience
              </li>
            </ul>
          </template>
          <button
          class="px-4 py-2 text-white text-2xl transition-all disabled:opacity-0 bg-green-700 hover:bg-green-800 rounded-lg shadow drop-shadow"
          @click="$emit(enemyHp > 0 ? 'quit' : 'continue')"
          :disabled="!showContinue"
        >
          CONTINUE
        </button>
        </div>
      </div>
    </div>
    <div class="overlay bg-black opacity-90 w-full h-full absolute z-40"></div>
  </div>
</template>
