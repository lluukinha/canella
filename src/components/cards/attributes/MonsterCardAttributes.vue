<script setup lang="ts">
import { PropType } from 'vue';
import {
  IAttackCardAttributes,
  IMonsterCardAttributes,
} from '../../../scripts/main';
import HeartIcon from '../../icons/HeartIcon.vue';
import SwordIcon from '../../icons/SwordIcon.vue';

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
        <HeartIcon class="h-5 w-5 text-red-500" />
        <span class="text-md font-bold text-lg uppercase">{{
          attributes.healthPoints
        }}</span>
      </div>
      <div class="flex items-center gap-1">
        <SwordIcon class="h-5 w-5" />
        <span class="text-md font-bold text-lg">{{ attributes.attack }}</span>
      </div>
    </div>
    <div
      class="px-2 py-1 bg-gray-800 shadow rounded flex justify-center items-center font-bold text-xs gap-1 uppercase"
    >
      <div class="flex items-center gap-1">
        <span class="text-xs font-light">EXPERIENCE:</span>
        <span class="text-md font-bold text-xl">{{
          attributes.experience
        }}</span>
      </div>
    </div>
  </div>
</template>
