<script setup lang="ts">
import { PropType } from "vue";
import { IAttackCardAttributes, IMonsterCardAttributes } from "../../../scripts/main";

defineProps({
  attributes: {
    type: Object as PropType<IMonsterCardAttributes>,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <div
      class="px-2 py-1 bg-gray-800 shadow rounded flex justify-around items-center font-bold text-xs gap-1"
    >
      <div class="flex items-center gap-1">
        <span class="text-xs font-light">HP:</span>
        <span class="text-md font-bold uppercase">{{ attributes.healthPoints }}</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-xs font-light uppercase">Attack:</span>
        <span class="text-md font-bold text-md">{{ attributes.attack }}</span>
      </div>
    </div>
    <div
      class="px-2 py-1 bg-gray-800 shadow rounded flex justify-center items-center font-bold text-xs gap-1 uppercase"
    >
      <div class="flex items-center gap-1">
        <span class="text-xs font-light">EXPERIENCE:</span>
        <span class="text-md font-bold text-xl">{{ attributes.experience }}</span>
      </div>
    </div>
  </div>
</template>
