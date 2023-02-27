<script setup lang="ts">
import { PropType } from 'vue';
import { IWeaponCardAttributes } from '../../../scripts/main';

defineProps({
  attributes: {
    type: Object as PropType<IWeaponCardAttributes>,
    required: true,
  },
});
</script>

<template>
  <div class="flex justify-between">
    <div>
      <h2 class="text-sm font-semibold">Weapon type</h2>
      <span class="text-md">{{ attributes.type }}</span>
    </div>
    <div>
      <h2 class="text-sm font-semibold">Attack type</h2>
      <span class="text-md">{{ attributes.attackType }}</span>
    </div>
  </div>
  <div>
    <h2 class="text-sm font-semibold">Attack</h2>
    <span class="text-md">{{ attributes.attack }}</span>
  </div>
</template>
