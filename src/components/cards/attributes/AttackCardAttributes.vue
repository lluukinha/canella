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
  <div>
    <h2 class="text-sm font-semibold">Type</h2>
    <span class="text-md">{{ attributes.type }}</span>
  </div>
  <div>
    <h2 class="text-sm font-semibold">Chance (%)</h2>
    <span class="text-md">{{ attributes.chance }}</span>
  </div>
  <div class="flex justify-between text-center">
    <div>
      <h2 class="text-sm font-semibold">Min Attack</h2>
      <span class="text-md">{{ attributes.min }}</span>
    </div>
    <div>
      <h2 class="text-sm font-semibold">Max Attack</h2>
      <span class="text-md">{{ attributes.max }}</span>
    </div>
  </div>
</template>
