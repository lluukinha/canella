<script setup lang="ts">
import { computed, PropType } from "vue";
import { IHeroCardAttributes, experienceTable } from "../../../scripts/main";

const props = defineProps({
  attributes: {
    type: Object as PropType<IHeroCardAttributes>,
    required: true,
  },
});

const heroExperience = computed(() => {
  const { from, to } = experienceTable[props.attributes.level];
  const expToNextLevel = to;
  const current = props.attributes.experience - from;
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
    <span class="w-10 text-xs font-bold text-right">
      {{ attributes.level }}
    </span>
  </div>
</template>
