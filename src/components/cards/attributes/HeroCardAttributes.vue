<script setup lang="ts">
import { PropType } from 'vue';
import { IHeroCardAttributes } from '../../../scripts/main';

defineProps({
  attributes: {
    type: Object as PropType<IHeroCardAttributes>,
    required: true,
  },
});
</script>

<template>
  <div>
    <h2 class="text-sm font-semibold">Attack Type</h2>
    <span class="text-md">{{ attributes.attackType }}</span>
  </div>
  <div>
    <h2 class="text-sm font-semibold">Weapon types</h2>
    <div class="skills flex gap-1 flex-wrap">
      <span
        v-for="weapon in attributes.weaponTypes"
        class="px-2 py-0 bg-blue-800 shadow rounded flex justify-center items-center text-xs font-bold"
        >{{ weapon }}</span
      >
    </div>
  </div>
</template>
