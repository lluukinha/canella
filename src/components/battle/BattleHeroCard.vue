<script setup lang="ts">
import { PropType } from "vue";
import { CardTypes, IHeroCard, IHeroCardAttributes } from "../../scripts/main";

defineProps({
  card: {
    type: Object as PropType<IHeroCard>,
    required: true,
  },
});
</script>

<template>
  <div
    class="bg-gradient-to-t rounded-xl shadow-lg py-1 px-2 border-4 flex flex-col from-blue-700 to-gray-900 border-blue-900 w-40 h-56 text-white items-center justify-between"
  >
    <div class="top flex justify-between items-center font-bold w-full text-xs">
      #{{ card.id }}
      <span class="uppercase">{{ card.type }}</span>
    </div>
    <div class="image border border-gray-700 rounded w-36 h-32 bg-gray-800">
      <component :is="card.component" v-if="card.component" />
    </div>
    <div class="text-xs">
      <div
        class="name w-36 px-2 py-1 flex justify-between border rounded-md rounded-b-none bg-gray-600 border-gray-700 uppercase"
      >
        {{ card.name }}
        <span
          class="px-2 bg-gray-900 shadow rounded flex justify-center items-center font-bold"
        >
          {{ card.attributes.attackType }}
        </span>
      </div>
      <div
        class="name w-36 px-2 py-1 flex justify-between border rounded-md rounded-t-none bg-gray-600 border-gray-700 uppercase"
      >
        Level
        <span
          class="px-2 bg-gray-900 shadow rounded flex justify-center items-center font-bold"
        >
          {{ card.attributes.level }}
        </span>
      </div>
    </div>
  </div>
</template>
