<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue';
import {
  delay,
  FieldConfig,
  IBattleData,
  IMonsterCard,
  monsterCards,
} from '../../../scripts/main';
import { playerStore } from '../../../scripts/store';

const forestBgUrl = new URL('../../../assets/forest.jpeg', import.meta.url)
  .href;
const darkForestBgUrl = new URL(
  '../../../assets/darkforest.jpeg',
  import.meta.url
).href;
const castleBgUrl = new URL('../../../assets/castle.jpg', import.meta.url).href;
const ruinsBgUrl = new URL('../../../assets/ruins.jpeg', import.meta.url).href;

const forestConfig = {
  bg: forestBgUrl,
  levels: [
    { number: 1, monsters: [monsterCards[0]] },
    {
      number: 2,
      monsters: [monsterCards[0], monsterCards[1], monsterCards[2]],
    },
    { number: 3, monsters: [monsterCards[1]] },
    { number: 4, monsters: [monsterCards[2]] },
    { number: 5, monsters: [monsterCards[0]] },
    { number: 6, monsters: [monsterCards[0]] },
    { number: 7, monsters: [monsterCards[0]] },
    { number: 8, monsters: [monsterCards[0]] },
    { number: 9, monsters: [monsterCards[0]] },
    { number: 10, monsters: [monsterCards[0]] },
    { number: 11, monsters: [monsterCards[0]] },
    { number: 12, monsters: [monsterCards[0]] },
  ],
};

const darkForestConfig = {
  bg: darkForestBgUrl,
  levels: [
    { number: 1, monsters: [monsterCards[0]] },
    { number: 2, monsters: [monsterCards[0]] },
    { number: 3, monsters: [monsterCards[0]] },
    { number: 4, monsters: [monsterCards[0]] },
    { number: 5, monsters: [monsterCards[0]] },
    { number: 6, monsters: [monsterCards[0]] },
    { number: 7, monsters: [monsterCards[0]] },
    { number: 8, monsters: [monsterCards[0]] },
    { number: 9, monsters: [monsterCards[0]] },
    { number: 10, monsters: [monsterCards[0]] },
    { number: 11, monsters: [monsterCards[0]] },
    { number: 12, monsters: [monsterCards[0]] },
  ],
};

const castleConfig = {
  bg: castleBgUrl,
  levels: [
    { number: 1, monsters: [monsterCards[0]] },
    { number: 2, monsters: [monsterCards[0]] },
    { number: 3, monsters: [monsterCards[0]] },
    { number: 4, monsters: [monsterCards[0]] },
    { number: 5, monsters: [monsterCards[0]] },
    { number: 6, monsters: [monsterCards[0]] },
    { number: 7, monsters: [monsterCards[0]] },
    { number: 8, monsters: [monsterCards[0]] },
    { number: 9, monsters: [monsterCards[0]] },
    { number: 10, monsters: [monsterCards[0]] },
    { number: 11, monsters: [monsterCards[0]] },
    { number: 12, monsters: [monsterCards[0]] },
  ],
};

const castleRuinsConfig = {
  bg: ruinsBgUrl,
  levels: [
    { number: 1, monsters: [monsterCards[0]] },
    { number: 2, monsters: [monsterCards[0]] },
    { number: 3, monsters: [monsterCards[0]] },
    { number: 4, monsters: [monsterCards[0]] },
    { number: 5, monsters: [monsterCards[0]] },
    { number: 6, monsters: [monsterCards[0]] },
    { number: 7, monsters: [monsterCards[0]] },
    { number: 8, monsters: [monsterCards[0]] },
    { number: 9, monsters: [monsterCards[0]] },
    { number: 10, monsters: [monsterCards[0]] },
    { number: 11, monsters: [monsterCards[0]] },
    { number: 12, monsters: [monsterCards[0]] },
  ],
};

const fieldConfig = computed(() => {
  if (props.field === 'forest') return forestConfig;
  if (props.field === 'darkForest') return darkForestConfig;
  if (props.field === 'castle') return castleConfig;
  if (props.field === 'castleRuins') return castleRuinsConfig;
  return forestConfig;
  // eval(`${props.field}Config`)
});

const props = defineProps({
  field: {
    type: String as PropType<FieldConfig>,
    required: true,
  },
});

const startBattle = (level: number) => {
  const { monsters } = fieldConfig.value.levels[level - 1];
  const chosenMonster: IMonsterCard =
    monsters[Math.floor(Math.random() * monsters.length)];

  const battleData: IBattleData = {
    field: props.field,
    level,
    monster: chosenMonster,
    bg: fieldConfig.value.bg,
  };

  emit('startBattle', battleData);
};

const emit = defineEmits(['back', 'startBattle', 'fieldFinished']);

watch(
  () => playerStore.value.story[props.field].currentLevel,
  async (newValue, oldValue) => {
    if (newValue === oldValue) return;
    showNewLevelMessage.value = true;
    await delay(0.8);

    showNewLevelMessage.value = false;
  },
  { deep: true }
);

watch(
  () => playerStore.value.story[props.field].wonAllLevels,
  async (newValue) => {
    if (!!newValue) emit('fieldFinished');
  },
  { deep: true }
);

const showNewLevelMessage = ref<boolean>(false);
</script>

<template>
  <div
    class="w-full h-full bg-cover bg-center relative"
    :style="`background-image: url(${fieldConfig.bg})`"
  >
    <div
      class="absolute w-full h-full z-20 flex justify-center items-center text-8xl animate-ping"
      v-if="showNewLevelMessage"
    >
      NEW LEVEL!
    </div>
    <div
      class="z-10 absolute flex flex-col p-5 w-full h-full justify-center items-center"
    >
      <h1 class="text-2xl stroke-black text-strok">
        <button @click="$emit('back')">Go back</button>
      </h1>
      <div class="h-full w-full grid grid-cols-4 m-auto place-items-center">
        <button
          class="w-40 h-40 bg-gray-600 rounded-lg text-7xl ring ring-green-900 bg-cover bg-center relative flex items-center justify-center disabled:opacity-40 transition-all"
          :class="{
            'hover:scale-110':
              playerStore.story[field].currentLevel >= level.number,
          }"
          v-for="level in fieldConfig.levels"
          :disabled="playerStore.story[field].currentLevel < level.number"
          @click="startBattle(level.number)"
        >
          <span
            :class="{
              'animate-ping':
                showNewLevelMessage &&
                playerStore.story[field].currentLevel === level.number,
            }"
            >{{ level.number }}</span
          >
        </button>
      </div>
    </div>
    <div class="absolute w-full h-full bg-black bg-opacity-50 z-0"></div>
  </div>
</template>
