<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  hp: { type: Number, required: true },
  remaining: { type: Number, required: true },
});

const heroHpWidth = computed(() =>
  Math.floor((props.remaining / props.hp) * 100)
);
</script>

<template>
  <div class="flex gap-2">
    <div class="w-full bg-black rounded relative">
      <div
        :style="`width: ${heroHpWidth}%`"
        class="bg-red-600 h-full rounded absolute transition-all"
      ></div>
    </div>
    <div class="w-10 flex justify-center text-sm font-bold">
      {{ remaining }}
    </div>
  </div>
</template>
