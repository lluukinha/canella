<script setup lang="ts">
import { PropType, computed } from 'vue';
import { IHeroCard } from '../../scripts/main';

const props = defineProps({
  card: {
    type: Object as PropType<IHeroCard>,
    required: true,
  },
});

const cardImageUrl = computed(() => {
  const card = props.card.image.length > 0 ? props.card.image : 'empty.jpg';
  return new URL(`../../assets/cards/${card}`, import.meta.url).href;
});
</script>

<template>
  <div
    class="w-48 h-64 bg-gradient-to-t rounded-xl shadow-lg py-1 px-2 border-4 flex flex-col from-blue-700 to-gray-900 border-blue-900 text-white items-center justify-center gap-1 drop-shadow-lg"
  >
    <div class="top flex justify-between items-center font-bold w-full text-xs">
      #{{ card.id }}
      <span class="uppercase">{{ card.type }}</span>
    </div>
    <div
      class="image border border-gray-700 rounded w-44 h-40 bg-gray-800 relative bg-cover bg-center"
      :style="`background-image: url(${cardImageUrl})`"
    ></div>
    <div class="text-xs">
      <div
        class="name w-44 px-2 py-1 flex justify-between border rounded-md rounded-b-none bg-gray-600 border-gray-700 uppercase"
      >
        {{ card.name }}
      </div>
      <div
        class="name w-44 px-2 py-1 flex justify-between border rounded-md rounded-t-none bg-gray-600 border-gray-700 uppercase"
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
