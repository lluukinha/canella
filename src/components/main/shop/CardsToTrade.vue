<script setup lang="ts">
import { computed, onMounted, PropType, ref } from "vue";
import {
  attackCards,
  CardTypes,
  heroCards,
  ICard,
  IHeroCardAttributes,
  weaponCards,
} from "../../../scripts/main";
import { playerContainsCard, playerStore } from "../../../scripts/store";

const props = defineProps({
  type: {
    type: String as PropType<"buy" | "sell">,
    required: true,
  },
  chosenCard: Object as PropType<ICard>,
});

const cards = ref<ICard[]>([]);

const setupCards = () => {
  let filteredCards = [];

  if (props.type === "buy") {
    filteredCards = [...heroCards, ...weaponCards, ...attackCards]
      .filter((c) => c.price > 0)
      .sort((a, b) => (playerContainsCard(a) ? 1 : -1));
  } else {
    filteredCards = playerStore.value.cards.filter((c) => {
      if (c.type === CardTypes.Hero)
        return (c.attributes as IHeroCardAttributes).experience === 0;
      return true;
    });
  }

  cards.value.push(...filteredCards);
};

onMounted(setupCards);

defineEmits(["chooseCard"]);
</script>

<template>
  <ul
    class="flex flex-col h-full custom-scrollbar overflow-y-scroll card-list-names bg-gray-800 rounded-lg cursor-pointer p-4"
  >
    <li
      class="flex justify-center items-center text-gray-400"
      v-if="cards.length === 0"
    >
      NO CARDS FOUND
    </li>
    <template v-else>
      <li
        class="py-2 border-gray-600 first:border-t-0 border-t hover:bg-gray-600 flex justify-between items-center rounded text-sm"
        :class="{
          'bg-gray-600':
            chosenCard?.id === card.id && chosenCard.type === card.type,
          'text-gray-400': (type === 'buy' && playerContainsCard(card)) || (type === 'sell' && !playerContainsCard(card)),
        }"
        v-for="card in cards"
        :key="`${card.id}_${card.type}`"
        @click="$emit('chooseCard', card)"
      >
        <div class="py-1 pl-4 pr-2 flex items-center justify-between w-full">
          <span>#{{ card.id }} - {{ card.name }}</span>
          <div class="flex items-center gap-1 text-xs">
            {{ card.type }}
          </div>
        </div>
      </li>
    </template>
  </ul>
</template>
