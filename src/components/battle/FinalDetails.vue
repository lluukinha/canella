<script setup lang="ts">
import { onMounted, PropType } from "vue";
import { experienceTable, IMonsterCard } from "../../scripts/main";
import Card from "../cards/Card.vue";

import { playerStore } from "../../scripts/store";
import HeroCardExperience from "../cards/attributes/HeroCardExperience.vue";

const props = defineProps({
  enemyHp: Number,
  enemy: {
    type: Object as PropType<IMonsterCard>,
    required: true,
  },
});
defineEmits(["restart", "quit"]);

const finishAnimation = (newExp: number) => {
  const heroCardAttributes = playerStore.value.equipedCards.hero!.attributes;
  const nextLevel = heroCardAttributes.level + 1;
  const expToNextLevel = experienceTable[nextLevel];
  if (newExp >= expToNextLevel) {
    setTimeout(upLevel, 1000);
    const remainingExp = newExp - expToNextLevel;
    setTimeout(() => {
      finishAnimation(remainingExp);
    }, 1500);
    return;
  }

  setTimeout(
    () =>
      (playerStore.value.equipedCards.hero!.attributes.experience += newExp),
    1000
  );
};

const upLevel = () => {
  const heroCardAttributes = playerStore.value.equipedCards.hero!.attributes;
  const nextLevel = heroCardAttributes.level + 1;
  const expToNextLevel = experienceTable[nextLevel];
  setTimeout(
    () =>
      (playerStore.value.equipedCards.hero!.attributes.experience +=
        expToNextLevel),
    500
  );
  setTimeout(
    () => (playerStore.value.equipedCards.hero!.attributes.level += 1),
    1000
  );
};

onMounted(() => {
  setTimeout(() => finishAnimation(props.enemy!.attributes.experience), 1000);
});
</script>

<template>
  <div
    class="w-full h-full absolute z-50 flex justify-center items-center select-none"
  >
    <div class="z-50 flex flex-col justify-center items-center gap-5 w-full">
      <div
        class="text-white drop-shadow-xl w-full flex justify-between px-10 gap-10"
      >
        <Card :card="enemy!" />
        <div
          class="text-center flex-grow flex justify-center flex-col items-center gap-5"
        >
          <h1 class="text-5xl">ENEMY DEFEATED!</h1>
          <div class="w-1/2">
            <HeroCardExperience
              :attributes="playerStore.equipedCards.hero!.attributes"
            />
          </div>
        </div>
        <!-- <template v-if="enemyHp === 0">ENEMY DEFEATED!</template>
        <template v-else>YOU LOSE!</template>
        <div class="flex justify-center text-sm gap-5">
          <component :is="enemy?.component" />
          Experience earned: {{ enemy?.attributes.experience }}
        </div> -->
      </div>

      <div class="flex w-full justify-around">
        <button
          class="px-4 py-2 bg-gray-400 hover:bg-gray-300 transition-all rounded shadow"
          @click="$emit('restart')"
        >
          PLAY AGAIN
        </button>
        <button
          class="px-4 py-2 bg-gray-400 hover:bg-gray-300 transition-all rounded shadow"
          @click="$emit('quit')"
        >
          QUIT
        </button>
      </div>
    </div>
    <div class="overlay bg-black opacity-90 w-full h-full absolute z-40"></div>
  </div>
</template>
