<script setup lang="ts">
import { PropType } from 'vue';
import { IHeroCard } from '../../../scripts/main';
import Card from '../../cards/Card.vue';

defineProps({
  card: {
    type: Object as PropType<IHeroCard>,
    required: true,
  },
});
</script>

<template>
  <div class="w-full h-full flex justify-between">
    <div class="flex flex-col gap-5">
      <h1 class="text-5xl">Hero Settings</h1>
      <h2 class="text-4xl">Type: {{ card.attributes.type }}</h2>
      <h2 class="text-4xl">Level: {{ card.attributes.level }}</h2>
      <h2 class="text-4xl">
        Health points:
        {{ card.attributes.healthPoints }}
      </h2>
      <div>
        <h2 class="text-4xl">Weapon types:</h2>
        <div class="mt-3 flex gap-1 flex-wrap text-3xl">
          <span
            v-for="weapon in card.attributes.weaponTypes"
            class="px-2 py-0 bg-blue-800 shadow rounded flex justify-center items-center font-bold"
            >{{ weapon }}</span
          >
        </div>
      </div>
    </div>
    <div>
      <Card :card="card" />
    </div>
  </div>
</template>
