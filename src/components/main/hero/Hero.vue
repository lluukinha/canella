<script setup lang="ts">
import { ref } from "vue";
import HeroDetails from "./HeroDetails.vue";
import BattleDetails from "./BattleDetails.vue";

enum PageDetails {
  Details = "details",
  Battle = "battle",
}

const activePage = ref<PageDetails>(PageDetails.Details);
</script>

<template>
  <div class="w-full h-full relative">
    <div
      class="w-full h-16 bg-slate-900 border-b border-slate-700 flex items-center px-4 gap-4 text-gray-500 transition-all"
    >
      <button
        class="disabled:text-gray-200 hover:text-gray-200"
        :disabled="activePage == PageDetails.Details"
        @click="activePage = PageDetails.Details"
      >
        Hero Details
      </button>
      <button
        class="disabled:text-gray-200 hover:text-gray-200"
        :disabled="activePage == PageDetails.Battle"
        @click="activePage = PageDetails.Battle"
      >
        Battle cards
      </button>
    </div>
    <Transition name="slide-left" mode="out-in">
      <HeroDetails v-if="activePage === PageDetails.Details" />
      <BattleDetails v-else-if="activePage == PageDetails.Battle" />
    </Transition>
  </div>
</template>
