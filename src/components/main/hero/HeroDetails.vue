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
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl">Hero Settings</h1>
      <h2 class="text-2xl">
        <span class="font-extralight uppercase text-sm">Type:</span>
        {{ card.attributes.type }}
      </h2>
      <h2 class="text-2xl">
        <span class="font-extralight uppercase text-sm">Experience:</span>
        {{ card.attributes.experience }}
      </h2>
      <h2 class="text-2xl">
        <span class="font-extralight uppercase text-sm">Level:</span>
        {{ card.attributes.level }}
      </h2>
      <h2 class="text-2xl">
        <span class="font-extralight uppercase text-sm">Health points:</span>
        {{ card.attributes.healthPoints }}
      </h2>
      <div>
        <h2 class="text-2xl">
          <span class="font-extralight uppercase text-sm">Weapon types:</span>
        </h2>
        <div class="mt-3 flex gap-1 flex-wrap text-md">
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
