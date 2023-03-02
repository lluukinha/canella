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

<style lang="postcss">
body {
  overflow: hidden;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-gray-900;
  border-radius: 5px;
}

/* Handle */
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-700;
  border-radius: 5px;
}

/* Handle on hover */
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
