<script setup lang="ts">
import { computed, PropType } from 'vue';
import { IMonsterCard } from '../../scripts/main';
import CardBackSide from '../cards/CardBackSide.vue';

const props = defineProps({
  card: {
    type: Object as PropType<IMonsterCard>,
    required: true,
  },
  canFlip: {
    type: Boolean,
    required: false,
  },
});

const cardImageUrl = computed(() => {
  const card = props.card.image.length > 0 ? props.card.image : 'empty.jpg';
  return new URL(`../../assets/cards/${card}`, import.meta.url).href;
});
</script>

<template>
  <div class="flip-card w-48 h-64 drop-shadow-lg">
    <div class="flip-card-inner transition-all" :class="{ flip: !canFlip }">
      <div
        class="flip-card-front bg-gradient-to-t rounded-xl shadow-lg py-1 px-2 border-4 flex flex-col from-green-500 to-gray-900 border-green-700 text-white items-center justify-center gap-1"
      >
        <div
          class="top flex justify-between items-center font-bold w-full text-xs"
        >
          #{{ card.id }}
          <span class="uppercase">{{ card.type }}</span>
        </div>
        <div
          class="image border border-gray-700 rounded w-44 h-40 bg-gray-800 flex justify-center items-center relative bg-cover bg-center"
          :style="`background-image: url(${cardImageUrl})`"
        >
          <span
            class="px-2 bg-gray-900 shadow rounded flex justify-center items-center font-bold absolute bottom-1 right-1 text-xs"
          >
            {{ card.attributes.attackType }}
          </span>
        </div>
        <div class="text-xs">
          <div
            class="name w-44 px-2 py-1 flex justify-between border rounded-md rounded-b-none bg-gray-600 border-gray-700 uppercase"
          >
            {{ card.name }}
          </div>
          <div
            class="name w-44 px-2 py-1 flex justify-between border rounded-md rounded-t-none bg-gray-600 border-gray-700 uppercase"
          >
            Attack
            <span
              class="px-2 bg-gray-900 shadow rounded flex justify-center items-center font-bold"
            >
              {{ card.attributes.attack }}
            </span>
          </div>
        </div>
      </div>
      <CardBackSide class="border-green-500" />
    </div>
  </div>
</template>
