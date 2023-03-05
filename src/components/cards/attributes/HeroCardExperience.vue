<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue';
import {
  IHeroCardAttributes,
  experienceTable,
  delay,
} from '../../../scripts/main';

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

const showLevelUp = ref<boolean>(false);

watch(
  () => props.attributes.level,
  async (newValue, oldValue) => {
    showLevelUp.value = true;
    // await delay(0.8);
  },
  { deep: true }
);
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
    <span class="w-10 text-xs font-bold rext-right">
      {{ attributes.level }}
    </span>
  </div>
  <div class="absolute animate-ping bottom-16" v-if="showLevelUp">LEVEL UP</div>
</template>
