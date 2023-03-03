<script setup lang="ts">
import { PropType, computed } from 'vue';
import { IWeaponCard } from '../../scripts/main';

const props = defineProps({
  card: {
    type: Object as PropType<IWeaponCard>,
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
    class="w-36 h-52 bg-gradient-to-t rounded-xl shadow-lg p-2 border-4 flex flex-col from-yellow-300 to-gray-900 border-yellow-300 text-white items-center justify-center gap-2 drop-shadow-lg"
  >
    <div class="top flex justify-between items-center font-bold w-full text-xs">
      #{{ card.id }}
      <span class="uppercase">{{ card.type }}</span>
    </div>
    <div
      class="image border border-gray-700 rounded w-32 h-32 bg-gray-800 relative bg-cover bg-center"
      :style="`background-image: url(${cardImageUrl})`"
    >
      <div
        class="absolute w-full h-full flex justify-center items-end gap-1 bottom-1"
      >
        <span
          class="px-2 bg-gray-900 shadow rounded flex justify-center items-center font-bold text-xs"
          v-for="atk in card.attributes.attackTypes"
        >
          {{ atk }}
        </span>
      </div>
    </div>
    <div class="text-xs">
      <div
        class="name w-32 px-2 py-1 flex justify-between border rounded-md rounded-b-none bg-gray-600 border-gray-700 uppercase"
      >
        {{ card.name }}
      </div>
      <div
        class="name w-32 px-2 py-1 flex justify-between border rounded-md rounded-t-none bg-gray-600 border-gray-700 uppercase"
      >
        ATTACK
        <span
          class="px-2 bg-gray-900 shadow rounded flex justify-center items-center font-bold"
        >
          {{ card.attributes.attack }}
        </span>
      </div>
    </div>
  </div>
</template>
