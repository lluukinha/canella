<script setup lang="ts">
import { PropType } from 'vue';
import { MonsterCard } from '../../scripts/main';

defineProps({ enemyHp: Number, enemy: Object as PropType<MonsterCard> });
defineEmits(['restart', 'quit']);
</script>

<template>
  <div
    class="w-full h-full absolute z-50 flex justify-center items-center select-none"
  >
    <div class="z-50 flex flex-col justify-center items-center gap-5">
      <div class="message text-8xl text-white drop-shadow-xl">
        <template v-if="enemyHp === 0">ENEMY DEFEATED!</template>
        <template v-else>YOU LOSE!</template>
        <div class="flex justify-center text-sm gap-5">
          <component :is="enemy?.component" />
          Experience earned: {{ enemy?.experience }}
        </div>
      </div>

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
    <div class="overlay bg-black opacity-70 w-full h-full absolute z-40"></div>
  </div>
</template>
