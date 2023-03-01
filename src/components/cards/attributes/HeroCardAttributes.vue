<script setup lang="ts">
import { PropType } from "vue";
import { IHeroCardAttributes } from "../../../scripts/main";
import HeroCardExperience from "./HeroCardExperience.vue";

defineProps({
  attributes: {
    type: Object as PropType<IHeroCardAttributes>,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <div
      class="px-2 py-1 bg-gray-800 shadow rounded flex justify-center items-center font-bold text-xs gap-1 flex-col"
    >
      <!-- <div class="w-full flex gap-2 items-center">
        <div
          class="text-xs font-light flex flex-grow rounded border border-gray-600 h-3"
        >
          <div class="h-full bg-slate-50 rounded"></div>
        </div>
        <span class="w-10 text-xs font-bold text-right">{{
          attributes.level
        }}</span>
      </div> -->
      <HeroCardExperience :attributes="attributes" />
      <div class="w-full flex gap-1 items-center">
        <div class="text-xs font-light flex flex-grow rounded items-center h-3">
          <div class="h-full w-full bg-red-600 rounded"></div>
        </div>
        <span class="w-10 text-xs font-bold text-right">{{
          attributes.healthPoints
        }}</span>
      </div>
    </div>
    <div class="skills flex justify-center gap-1 flex-wrap">
      <span
        v-for="weapon in attributes.weaponTypes"
        class="px-2 py-0 bg-blue-800 shadow rounded flex justify-center items-center text-xs font-bold"
        >{{ weapon }}</span
      >
    </div>
  </div>
  <!-- <div class="w-full text-left text-sm">
    Weapons allowed:
    <div class="skills flex gap-1 flex-wrap">
      <span
        v-for="weapon in attributes.weaponTypes"
        class="px-2 py-0 bg-blue-800 shadow rounded flex justify-center items-center text-xs font-bold"
        >{{ weapon }}</span
      >
    </div>
  </div> -->
</template>
