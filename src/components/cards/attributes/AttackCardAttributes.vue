<script setup lang="ts">
import { PropType } from 'vue';
import { IAttackCardAttributes } from '../../../scripts/main';

defineProps({
  attributes: {
    type: Object as PropType<IAttackCardAttributes>,
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
        <span class="text-xs font-light">Type:</span>
        <span class="text-md font-bold uppercase">{{
          attributes.attackType
        }}</span>
      </div>
    </div>
    <div
      class="px-2 py-1 bg-gray-800 shadow rounded flex justify-center items-center font-bold text-xs gap-1 uppercase"
    >
      <div class="flex items-center gap-1">
        <span class="text-xs font-light">Accuracy:</span>
        <span class="text-lg font-bold text-md">{{ attributes.chance }}%</span>
      </div>
    </div>
  </div>
</template>
