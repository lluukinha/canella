<script setup lang="ts">
import { ref } from 'vue';
import { categories } from '../scripts/main';

const types = ref();
const chosenType = ref();

defineEmits(['startBattle']);
</script>

<template>
  <div
    class="flex justify-around items-center w-screen h-screen bg-gradient-to-tr from-slate-700 to-slate-900 text-white"
  >
    <template v-if="!types && !chosenType">
      <div
        class="p-5 rounded ring w-56 h-64 bg-slate-800 text-white transition-all hover:scale-110 select-none"
        v-for="c in categories"
        @click="types = c.types"
      >
        {{ c.name }}
      </div>
    </template>
    <div
      class="flex flex-col w-full justify-center items-center gap-10"
      v-if="!!types && !chosenType"
    >
      <div class="flex w-full justify-around items-center">
        <div
          class="flex flex-col gap-2 bg-slate-800 p-5 rounded ring h-64 w-56 text-white select-none"
          :class="{
            'transition-all hover:scale-110': !t.special,
            'opacity-60': t.special,
          }"
          v-for="t in types"
          @click="chosenType = t.special ? null : t"
        >
          <div>
            <h2 class="text-sm font-semibold">Name</h2>
            <span class="text-md">{{ t.name }}</span>
          </div>
          <div>
            <h2 class="text-sm font-semibold">Weapons</h2>
            <span class="text-md">{{ t.weapon }}</span>
          </div>
          <div>
            <h2 class="text-sm font-semibold">Skill boost</h2>
            <div class="skills flex gap-1 flex-wrap">
              <span
                v-for="skill in t.skillBoost"
                class="px-2 py-0 bg-blue-800 shadow rounded flex justify-center items-center text-xs font-bold"
                >{{ skill }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <button @click="types = null">go back</button>
    </div>
    <div v-if="!!chosenType" class="flex gap-20 justify-center">
      <div
        class="flex flex-col gap-2 bg-slate-800 p-5 rounded ring w-72 h-96 text-white select-none"
      >
        <div>
          <h2 class="text-sm font-semibold">Name</h2>
          <span class="text-md">{{ chosenType.name }}</span>
        </div>
        <div>
          <h2 class="text-sm font-semibold">Weapons</h2>
          <span class="text-md">{{ chosenType.weapon }}</span>
        </div>
        <div>
          <h2 class="text-sm font-semibold">Skill boost</h2>
          <div class="skills flex gap-1 flex-wrap">
            <span
              v-for="skill in chosenType.skillBoost"
              class="px-2 py-0 bg-blue-800 shadow rounded flex justify-center items-center text-xs font-bold"
              >{{ skill }}</span
            >
          </div>
        </div>
      </div>
      <div class="w-96 text-4xl text-center">
        <p>
          Do you want to choose {{ chosenType.name }} to be your initial hero?
        </p>
        <div class="flex w-full justify-around">
          <button @click="$emit('startBattle')">Yes!</button>
          <button @click="chosenType = null">No!</button>
        </div>
      </div>
    </div>
  </div>
</template>
