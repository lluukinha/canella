<script setup lang="ts">
import { computed } from 'vue';
import HeartIcon from '../icons/HeartIcon.vue';

const props = defineProps({
  hp: { type: Number, required: true },
  remaining: { type: Number, required: true },
});

const heroHpWidth = computed(() =>
  Math.floor((props.remaining / props.hp) * 100)
);
</script>

<template>
  <div
    class="flex gap-2 bg-gray-800 p-1 rounded-lg border-2 border-gray-600 text-white"
  >
    <div class="w-full bg-black rounded relative">
      <div
        :style="`width: ${heroHpWidth}%`"
        class="bg-red-600 h-full rounded absolute transition-all"
      ></div>
    </div>
    <div class="w-10 flex justify-center text-sm font-bold gap-1">
      {{ remaining }}
      <HeartIcon class="h-5 w-5 text-red-500" />
    </div>
  </div>
</template>
