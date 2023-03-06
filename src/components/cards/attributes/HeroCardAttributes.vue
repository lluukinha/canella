<script setup lang="ts">
import { PropType } from 'vue';
import { IHeroCardAttributes } from '../../../scripts/main';
import HeartIcon from '../../icons/HeartIcon.vue';
import StarIcon from '../../icons/StarIcon.vue';
import SwordIcon from '../../icons/SwordIcon.vue';
import HeroCardExperience from './HeroCardExperience.vue';

defineProps({
  attributes: {
    type: Object as PropType<IHeroCardAttributes>,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <div
      class="px-2 py-1 bg-gray-800 shadow rounded flex justify-center items-center font-bold text-xs gap-1 flex-col"
    >
      <HeroCardExperience
        :experience="attributes.experience"
        :level="attributes.level"
      />
    </div>
    <div
      class="px-2 py-1 bg-gray-800 shadow rounded flex justify-around items-center font-bold text-xs gap-1"
    >
      <div class="flex items-center gap-1">
        <HeartIcon class="text-red-500 w-5 h-5" />
        <span class="text-xl font-bold uppercase">{{
          attributes.healthPoints
        }}</span>
      </div>
      <div class="flex items-center gap-1">
        <SwordIcon class="w-5 h-5" />
        <span class="text-xl font-bold uppercase">{{ attributes.attack }}</span>
      </div>
    </div>
  </div>
</template>
