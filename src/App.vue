<script setup lang="ts">
import { ref } from 'vue';
import Game from './components/Game.vue';
const mainScreen = ref(true);

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});
</script>

<template>
  <div
    class="flex justify-around items-center w-screen h-screen bg-gradient-to-tr from-slate-700 to-slate-900 text-white select-none"
  >
    <Transition name="fade" mode="out-in">
      <div
        class="w-screen h-screen flex justify-center items-center flex-col gap-10"
        v-if="mainScreen"
      >
        LOGO
        <button @click="mainScreen = false">new game</button>
      </div>
      <Game v-else />
    </Transition>
  </div>
</template>

<style>
body {
  overflow: hidden;
}
</style>
