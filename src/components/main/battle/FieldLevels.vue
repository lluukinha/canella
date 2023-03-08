<script setup lang="ts">
import { onBeforeMount, PropType, ref, watch } from 'vue';
import {
  delay,
  FieldConfig,
  IBattleData,
  IMonsterCard,
  monsterCards,
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
    1: [monsterCards[0]],
    2: [monsterCards[3]],
    3: [monsterCards[1]],
    4: [monsterCards[2]],
    5: [monsterCards[4]],
  },
  darkForest: {
    1: [monsterCards[0]],
    2: [monsterCards[0], monsterCards[1], monsterCards[3]],
    3: [monsterCards[3]],
    4: [monsterCards[1]],
    5: [monsterCards[2]],
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

const isUnlocking = ref<boolean>(false);
const unlock = async (level: number) => {
  isUnlocking.value = true;
  await delay(1);
  fieldConfig.value.levels[level - 1].isEnabled = true;
  await delay(0.5);
  isUnlocking.value = false;
};
</script>

<template>
  <div
    class="w-full h-full bg-cover bg-center relative"
    :style="`background-image: url(${fieldConfig.bg})`"
  >
    <div
      class="z-10 absolute flex flex-col p-5 w-full h-full justify-center items-center"
    >
      <h1 class="text-2xl absolute bottom-10">
        <button @click="$emit('back')">Go back</button>
      </h1>
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
          :disabled="playerStore.story[field].currentLevel < level.number"
          @click="startBattle(level.number)"
        >
          <Transition name="slide-left" mode="out-in">
            <div v-if="level.isEnabled">{{ level.name }}</div>
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
