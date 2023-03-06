<script setup lang="ts">
import { PropType } from 'vue';
import { IWeaponCardAttributes } from '../../../scripts/main';
import SwordIcon from '../../icons/SwordIcon.vue';

defineProps({
  attributes: {
    type: Object as PropType<IWeaponCardAttributes>,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <div
      class="px-2 py-1 bg-gray-800 shadow rounded flex justify-center items-center font-bold text-xs gap-1"
    >
      <span class="text-xs font-light">Type:</span>
      <span class="text-md font-bold uppercase">{{ attributes.type }}</span>
    </div>
    <div
      class="px-2 py-1 bg-gray-800 shadow rounded flex justify-center items-center font-bold text-xs gap-1"
    >
      <SwordIcon class="w-5 h-5" />
      <span class="text-xl font-bold uppercase">{{ attributes.attack }}</span>
    </div>
  </div>
</template>
