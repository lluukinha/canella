<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Game from './components/Game.vue';
const mainScreen = ref(true);

onMounted(() => {
  setTimeout(() => mainScreen.value = false, 4000)
})
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center landscape:hidden text-2xl font-bold bg-gradient-to-tr from-slate-700 to-slate-900 text-white">
    ROTATE YOUR DEVICE
  </div>
  <div
    class="flex justify-around items-center w-screen h-screen bg-gradient-to-tr from-slate-700 to-slate-900 text-white select-none portrait:hidden"
  >
    <Transition name="fade" mode="out-in">
      <div
        class="w-screen h-screen flex justify-center items-center bg-center bg-cover flex-col gap-10"
        :style="`background-image: url(../assets/bg.jpg)`"
        v-if="mainScreen"
        @click="mainScreen = false"
      >
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
