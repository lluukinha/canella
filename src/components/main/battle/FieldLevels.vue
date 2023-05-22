<script setup lang="ts">
import { onBeforeMount, onMounted, PropType, ref, watch } from 'vue';
import {
  delay,
  FieldConfig,
  IBattleData,
  IMonsterCard,
  monsterCards,
  successProbability,
  forestMonsterCards,
  darkForestMonsterCards,
} from '../../../scripts/main';
import { playerStore } from '../../../scripts/store';
import LockIcon from '../../icons/LockIcon.vue';
import UnlockIcon from '../../icons/UnlockIcon.vue';

const bgs = {
  forest: new URL('../../../assets/forest.jpeg', import.meta.url).href,
  darkForest: new URL('../../../assets/darkforest.jpeg', import.meta.url).href,
  castle: new URL('../../../assets/castle.jpg', import.meta.url).href,
  castleRuins: new URL('../../../assets/ruins.jpeg', import.meta.url).href,
};

const monstersByLevel: { [key: string]: { [key: number]: IMonsterCard[] } } = {
  forest: {
    1: forestMonsterCards.easy,
    2: forestMonsterCards.medium,
    3: forestMonsterCards.hard,
    4: forestMonsterCards.veryHard,
    5: forestMonsterCards.boss,
  },
  darkForest: {
    1: darkForestMonsterCards.easy,
    2: darkForestMonsterCards.medium,
    3: darkForestMonsterCards.hard,
    4: darkForestMonsterCards.veryHard,
    5: darkForestMonsterCards.boss,
  },
  castle: {
    1: [monsterCards[0]],
    2: [monsterCards[0], monsterCards[1], monsterCards[3]],
    3: [monsterCards[3]],
    4: [monsterCards[1]],
    5: [monsterCards[2]],
  },
  castleRuins: {
    1: [monsterCards[0]],
    2: [monsterCards[0], monsterCards[1], monsterCards[3]],
    3: [monsterCards[3]],
    4: [monsterCards[1]],
    5: [monsterCards[2]],
  },
};

interface ILevelConfig {
  number: number;
  name: string;
  monsters: IMonsterCard[];
  isEnabled: boolean;
  boss: boolean;
}

interface IFieldConfig {
  bg: string;
  levels: ILevelConfig[];
}

const fieldConfig = ref<IFieldConfig>({
  bg: '',
  levels: [],
});

const getLevelName = (level: number): string => {
  if (level === 1) return 'Easy';
  if (level === 2) return 'Medium';
  if (level === 3) return 'Hard';
  if (level === 4) return 'Very Hard';
  if (level === 5) return 'Boss';
  return '';
};

const getLevelConfig = (level: number): ILevelConfig => ({
  number: level,
  name: getLevelName(level),
  monsters: monstersByLevel[props.field][level] || [],
  isEnabled: playerStore.value.story[props.field].currentLevel >= level,
  boss: level === 5,
});

const setupField = () => {
  fieldConfig.value.bg = bgs[props.field];
  const levels = [];
  levels.push();
  for (let i: number = 1; i < 6; i++)
    fieldConfig.value.levels.push(getLevelConfig(i));
};

onBeforeMount(setupField);

const props = defineProps({
  field: {
    type: String as PropType<FieldConfig>,
    required: true,
  },
});

const startBattle = (level: number) => {
  const { hero, weapon, attacks } = playerStore.value.equipedCards;
  const canBattle = !!hero && !!weapon && attacks.length > 0;
  if (!canBattle || isUnlocking.value) return;

  const { monsters } = fieldConfig.value.levels[level - 1];
  const undiscoveredMonsters = monsters.filter(
    (c) => !playerStore.value.monsters.won.includes(c.id)
  );

  let monsterList = monsters;
  // 90 probability to see a new monster instead of a monster you already defeated.
  const showUndiscovered =
    undiscoveredMonsters.length > 0 && successProbability(90);
  if (showUndiscovered) monsterList = undiscoveredMonsters;

  const chosenMonster: IMonsterCard =
    monsterList[Math.floor(Math.random() * monsterList.length)];

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
    unlock(newValue);
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

const discoveredPercentage = (level: number) => {
  const monsterIds = fieldConfig.value.levels[level - 1].monsters.map(
    (c) => c.id
  );
  const defeatedMonsters = playerStore.value.monsters.won.filter((id) =>
    monsterIds.includes(id)
  ).length;
  return Math.round((defeatedMonsters / monsterIds.length) * 100);
};

const isUnlocking = ref<boolean>(false);
const unlock = async (level: number) => {
  isUnlocking.value = true;
  await delay(1);
  fieldConfig.value.levels[level - 1].isEnabled = true;
  await delay(0.5);
  isUnlocking.value = false;
};

const tips: string[] = [
  "Maybe it's better to battle several times on the same level until you get stronger.",
  "When you have enough gold, visit the store. Who knows, maybe you'll get stronger there?",
  "Have you checked if you don't have better weapons or attacks to equip yourself with?",
  'Did you discover 100% of each level?',
];

const isShowingTip = ref<boolean>(false);
const chosenTip = ref<string>();

const changeTip = async () => {
  isShowingTip.value = false;
  await delay(1);
  const filteredTips = tips.filter((t) => chosenTip.value != t);
  const randomIndex = Math.floor(Math.random() * filteredTips.length);
  chosenTip.value = filteredTips[randomIndex];
  isShowingTip.value = true;
};

watch(chosenTip, async () => {
  await delay(15);
  await changeTip();
});

onMounted(changeTip);
</script>

<template>
  <div
    class="w-full h-full bg-cover bg-center relative"
    :style="`background-image: url(${fieldConfig.bg})`"
  >
    <div
      class="z-10 absolute flex flex-col p-5 w-full h-full justify-center items-center"
    >
      <h1 class="text-2xl absolute top-10 left-10">
        <button @click="$emit('back')">Go back</button>
      </h1>

      <Transition name="fade">
        <div
          class="text-xl absolute bottom-10 px-10 py-2 bg-gray-800 rounded text-gray-400"
          v-if="!!chosenTip && isShowingTip && !isUnlocking"
        >
          PRO TIP: <span class="font-light">{{ chosenTip }}</span>
        </div>
      </Transition>

      <div class="h-full w-full flex justify-around items-center">
        <button
          class="w-32 h-32 bg-gray-800 rounded-lg text-xl ring ring-gray-900 bg-cover bg-center relative flex items-center justify-center disabled:opacity-40 transition-all"
          :class="{
            'hover:scale-110':
              playerStore.story[field].currentLevel >= level.number &&
              !isUnlocking,
            ' w-40 h-40': level.boss,
          }"
          v-for="level in fieldConfig.levels"
          :disabled="
            playerStore.story[field].currentLevel < level.number ||
            (playerStore.story[field].currentLevel != level.number &&
              isUnlocking)
          "
          @click="startBattle(level.number)"
        >
          <Transition name="slide-left" mode="out-in">
            <div v-if="level.isEnabled" class="flex flex-col gap-2">
              <h1 class="text-2xl">{{ level.name }}</h1>
              <h2 class="text-xs uppercase text-gray-500 font-bold">
                {{ discoveredPercentage(level.number) }}% DISCOVERED
              </h2>
            </div>
            <div v-else>
              <Transition name="fade" mode="out-in">
                <UnlockIcon
                  v-if="
                    playerStore.story[field].currentLevel === level.number &&
                    isUnlocking
                  "
                />
                <LockIcon v-else />
              </Transition>
            </div>
          </Transition>
        </button>
      </div>
    </div>
    <div class="absolute w-full h-full bg-black bg-opacity-50 z-0"></div>
  </div>
</template>
