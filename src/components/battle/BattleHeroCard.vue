<script setup lang="ts">
import { PropType, computed } from "vue";
import { IHeroCard } from "../../scripts/main";
import StarIcon from "../icons/StarIcon.vue";
import SwordIcon from "../icons/SwordIcon.vue";

const props = defineProps({
  card: {
    type: Object as PropType<IHeroCard>,
    required: true,
  },
});

const cardImageUrl = computed(() => {
  const card = props.card.image.length > 0 ? props.card.image : "empty.jpg";
  return new URL(`../../assets/cards/${card}`, import.meta.url).href;
});
const bgImageUrl = new URL("../../assets/cards/empty.jpg", import.meta.url)
  .href;
</script>

<template>
  <div
    class="w-48 h-64 bg-gradient-to-t rounded-xl shadow-lg py-1 px-2 border-4 flex flex-col from-blue-700 to-gray-900 border-blue-900 text-white items-center justify-around gap-1 drop-shadow-lg"
  >
    <div class="top flex justify-between items-center font-bold w-full text-xs">
      #{{ card.id }}
      <span class="uppercase">{{ card.type }}</span>
    </div>
    <div
      class="image border border-gray-700 rounded w-44 h-40 bg-gray-800 relative bg-cover bg-center"
      :style="`background-image: url(${bgImageUrl})`"
    >
      <div class="absolute p-1">
        <img :src="cardImageUrl" class="object-scale-down" />
      </div>
      <div class="flex items-center gap-1 absolute top-1 right-2">
        <StarIcon class="w-5 h-5 text-yellow-300" />
        <span class="text-xl font-bold uppercase">{{
          card.attributes.level
        }}</span>
      </div>
    </div>
    <div class="text-xs">
      <div
        class="name w-44 px-2 py-1 flex justify-between border rounded-md bg-gray-600 border-gray-700 uppercase items-center"
      >
        {{ card.name }}

        <div class="flex gap-1 items-center">
          <SwordIcon class="h-4 w-4" />
          <span class="font-bold text-lg">{{ card.attributes.attack }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
