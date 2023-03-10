<script setup lang="ts">
import { computed, PropType } from 'vue';
import { IHeroCardAttributes } from '../../scripts/main';
import { ATTACK_ON_LEVEL, LIFE_ON_LEVEL } from '../../scripts/store';
import DoubleRight from '../icons/DoubleRight.vue';
import HeartIcon from '../icons/HeartIcon.vue';
import SkillIcon from '../icons/SkillIcon.vue';
import StarIcon from '../icons/StarIcon.vue';

const props = defineProps({
  hero: {
    type: Object as PropType<IHeroCardAttributes>,
    required: true,
  },
  type: {
    type: String as PropType<'up' | 'down'>,
    required: true,
  },
});

const old = computed<{ life: number; attack: number; level: number }>(() => {
  let life = props.hero.healthPoints - LIFE_ON_LEVEL;
  let attack = props.hero.attack - ATTACK_ON_LEVEL;
  let level = props.hero.level - 1;

  if (props.type === 'down') {
    life = props.hero.healthPoints + LIFE_ON_LEVEL;
    attack = props.hero.attack + ATTACK_ON_LEVEL;
    level = props.hero.level + 1;
  }

  return { life, attack, level };
});

const advancedMsg = computed(() =>
  props.type === 'up' ? 'You advanced from level' : 'You downgraded from level'
);
</script>

<template>
  <div
    class="bg-gray-800 p-5 rounded-lg flex justify-center flex-col items-center gap-5"
  >
    <h2 class="text-xl flex items-center gap-3">
      <StarIcon class="w-7 h-7" v-if="type === 'up'" />
      {{ advancedMsg }}
      <span class="text-2xl font-bold">
        {{ old.level }}
      </span>
      to level
      <span class="text-2xl font-bold">
        {{ hero.level }}
      </span>
      <StarIcon class="w-7 h-7" v-if="type === 'up'" />
    </h2>
    <ul class="text-xl">
      <li class="flex justify-center items-center gap-10">
        <div class="flex gap-1 items-center">
          <HeartIcon />
          {{ old.life }}
        </div>
        <DoubleRight class="w-4 h-4" />
        <div class="flex gap-1 items-center text-3xl font-semibold">
          <HeartIcon />
          {{ hero.healthPoints }}
        </div>
      </li>
      <li class="flex justify-center items-center gap-10">
        <div class="flex gap-1 items-center">
          <SkillIcon />
          {{ old.attack }}
        </div>
        <DoubleRight class="w-4 h-4" />
        <div class="flex gap-1 items-center text-3xl font-semibold">
          <SkillIcon />
          {{ hero.attack }}
        </div>
      </li>
    </ul>
  </div>
</template>
