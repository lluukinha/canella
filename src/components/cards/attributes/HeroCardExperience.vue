<script setup lang="ts">
import { computed } from 'vue';
import { expLevels } from '../../../scripts/store';

const props = defineProps({
  experience: {
    type: Number,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

const heroExperience = computed(() => {
  const { from, to } = expLevels[props.level];
  const expToNextLevel = to;
  const current = props.experience - from;
  return Math.floor((current / expToNextLevel) * 100);
});
</script>

<template>
  <div class="w-full flex gap-2 items-center">
    <div
      class="text-xs font-light flex flex-grow rounded border border-gray-600 h-3"
    >
      <div
        class="h-full bg-slate-50 rounded transition-all"
        :style="`width: ${heroExperience}%`"
      ></div>
    </div>
    <div class="relative">
      <span class="w-10"> {{ 100 - heroExperience }}% </span>
    </div>
  </div>
</template>
