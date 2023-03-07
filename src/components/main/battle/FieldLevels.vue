<script setup lang="ts">
import { onBeforeMount, PropType, ref, watch } from "vue";
import {
  delay,
  FieldConfig,
  IBattleData,
  IMonsterCard,
  monsterCards,
} from "../../../scripts/main";
import { playerStore } from "../../../scripts/store";
import LockIcon from "../../icons/LockIcon.vue";
import UnlockIcon from "../../icons/UnlockIcon.vue";

const bgs = {
  forest: "../../../assets/forest.jpeg",
  darkForest: "../../../assets/darkforest.jpeg",
  castle: "../../../assets/castle.jpg",
  castleRuins: "../../../assets/ruins.jpeg",
};

const monstersByLevel: { [key: string]: { [key: number]: IMonsterCard[] } } = {
  forest: {
    1: [monsterCards[0]],
    2: [monsterCards[0], monsterCards[1], monsterCards[3]],
    3: [monsterCards[3]],
    4: [monsterCards[1]],
    5: [monsterCards[2]],
    6: [monsterCards[0]],
    7: [monsterCards[0]],
    8: [monsterCards[0]],
    9: [monsterCards[0]],
    10: [monsterCards[0]],
    11: [monsterCards[0]],
    12: [monsterCards[4]],
  },
  darkForest: {
    1: [monsterCards[0]],
    2: [monsterCards[0], monsterCards[1], monsterCards[3]],
    3: [monsterCards[3]],
    4: [monsterCards[1]],
    5: [monsterCards[2]],
    6: [monsterCards[0]],
    7: [monsterCards[0]],
    8: [monsterCards[0]],
    9: [monsterCards[0]],
    10: [monsterCards[0]],
    11: [monsterCards[0]],
    12: [monsterCards[0]],
  },
  castle: {
    1: [monsterCards[0]],
    2: [monsterCards[0], monsterCards[1], monsterCards[3]],
    3: [monsterCards[3]],
    4: [monsterCards[1]],
    5: [monsterCards[2]],
    6: [monsterCards[0]],
    7: [monsterCards[0]],
    8: [monsterCards[0]],
    9: [monsterCards[0]],
    10: [monsterCards[0]],
    11: [monsterCards[0]],
    12: [monsterCards[0]],
  },
  castleRuins: {
    1: [monsterCards[0]],
    2: [monsterCards[0], monsterCards[1], monsterCards[3]],
    3: [monsterCards[3]],
    4: [monsterCards[1]],
    5: [monsterCards[2]],
    6: [monsterCards[0]],
    7: [monsterCards[0]],
    8: [monsterCards[0]],
    9: [monsterCards[0]],
    10: [monsterCards[0]],
    11: [monsterCards[0]],
    12: [monsterCards[0]],
  },
};

interface ILevelConfig {
  number: number;
  monsters: IMonsterCard[];
  isEnabled: boolean;
}

interface IFieldConfig {
  bg: string;
  levels: ILevelConfig[];
}

const fieldConfig = ref<IFieldConfig>({
  bg: "",
  levels: [],
});

const getLevelConfig = (level: number): ILevelConfig => ({
  number: level,
  monsters: monstersByLevel[props.field][level] || [],
  isEnabled: playerStore.value.story[props.field].currentLevel >= level,
});

const setupField = () => {
  fieldConfig.value.bg = new URL(bgs[props.field], import.meta.url).href;
  for (let i: number = 1; i < 13; i++)
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

  emit("startBattle", battleData);
};

const emit = defineEmits(["back", "startBattle", "fieldFinished"]);

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
    if (!!newValue) emit("fieldFinished");
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
      <h1 class="text-2xl stroke-black text-strok">
        <button @click="$emit('back')">Go back</button>
      </h1>
      <div class="h-full w-full grid grid-cols-4 m-auto place-items-center">
        <button
          class="w-40 h-40 bg-gray-600 rounded-lg text-7xl ring ring-green-900 bg-cover bg-center relative flex items-center justify-center disabled:opacity-40 transition-all"
          :class="{
            'hover:scale-110':
              playerStore.story[field].currentLevel >= level.number && !isUnlocking,
          }"
          v-for="level in fieldConfig.levels"
          :disabled="playerStore.story[field].currentLevel < level.number"
          @click="startBattle(level.number)"
        >
          <Transition name="slide-left" mode="out-in">
            <div v-if="level.isEnabled">{{ level.number }}</div>
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
