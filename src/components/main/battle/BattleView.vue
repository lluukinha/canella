<script setup lang="ts">
import LockIcon from '../../icons/LockIcon.vue';

const forestBgUrl = new URL('../../../assets/forest.jpeg', import.meta.url)
  .href;

defineEmits(['startBattle']);
</script>

<template>
  <div class="p-5 w-full h-full flex justify-around items-center">
    <div class="flex flex-col gap-2 items-center justify-center">
      <button
        class="w-40 h-40 bg-green-600 rounded-lg flex justify-center items-center text-7xl ring ring-green-900 bg-cover relative"
        :style="`background-image: url(${forestBgUrl})`"
        @click="$emit('startBattle')"
      >
        <div
          class="absolute w-full h-full bg-black bg-opacity-50 hover:opacity-0 transition-all rounded-lg"
        ></div>
      </button>
      FOREST
    </div>

    <div class="flex flex-col gap-2 items-center justify-center">
      <button
        class="w-40 h-40 bg-gray-900 rounded-lg flex justify-center items-center text-7xl ring ring-blue-900"
      >
        ?
      </button>
      <LockIcon />
    </div>

    <div class="flex flex-col gap-2 items-center justify-center">
      <button
        class="w-40 h-40 bg-gray-900 rounded-lg flex justify-center items-center text-7xl ring ring-blue-900"
      >
        ?
      </button>
      <LockIcon />
    </div>

    <div class="flex flex-col gap-2 items-center justify-center">
      <button
        class="w-40 h-40 bg-gray-900 rounded-lg flex justify-center items-center text-7xl ring ring-blue-900"
      >
        ?
      </button>
      <LockIcon />
    </div>
  </div>
</template>
