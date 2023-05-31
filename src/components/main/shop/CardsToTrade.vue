<script setup lang="ts">
import { computed, onMounted, PropType, ref } from 'vue';
import {
  attackCards,
  CardTypes,
  heroCards,
  ICard,
  IHeroCardAttributes,
  weaponCards,
} from '../../../scripts/main';
import {
  playerContainsCard,
  playerStore,
  toAttackCard,
  toHeroCard,
  toWeaponCard,
} from '../../../scripts/store';

const props = defineProps({
  type: {
    type: String as PropType<'buy' | 'sell'>,
    required: true,
  },
  chosenCard: Object as PropType<ICard>,
});

const cards = ref<ICard[]>([]);
const filteredType = ref<CardTypes | null>(null);
const setupCards = () => {
  let filteredCards = [];

  if (props.type === 'buy') {
    const heroes = Object.values(heroCards);
    const weapons = Object.values(weaponCards);
    const attacks = Object.values(attackCards);
    filteredCards = [...heroes, ...weapons, ...attacks].filter(
      (c) => c.price > 0
    );
  } else {
    const heroes = playerStore.value.cards.heroes.map(toHeroCard);
    const weapons = playerStore.value.cards.weapons.map(toWeaponCard);
    const attacks = playerStore.value.cards.attacks.map(toAttackCard);
    filteredCards = [...heroes, ...weapons, ...attacks].filter((c) => {
      if (c.type === CardTypes.Hero)
        return (c.attributes as IHeroCardAttributes).experience === 0;
      return true;
    });
  }

  filteredCards = filteredCards.sort((a, b) => {
    if (props.type === 'buy') {
      if (playerContainsCard(a)) return 1;
      if (playerContainsCard(b)) return -1;
    }

    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  cards.value.push(...filteredCards);
};

const filteredCards = computed(() => {
  if (!filteredType.value) return cards.value;
  return cards.value.filter((c) => c.type === filteredType.value);
});

onMounted(setupCards);

defineEmits(['chooseCard']);
</script>

<template>
  <div
    class="flex flex-col h-full card-list-names bg-gray-800 rounded-lg cursor-pointer p-4 gap-3"
  >
    <select class="bg-gray-700 rounded p-2" v-model="filteredType">
      <option :value="null">ALL</option>
      <option v-for="type in CardTypes" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
    <ul
      class="flex flex-col h-full card-list-names cursor-pointer p-4 custom-scrollbar overflow-y-scroll"
    >
      <li
        class="flex justify-center items-center text-gray-400"
        v-if="filteredCards.length === 0"
      >
        NO CARDS FOUND
      </li>
      <template v-else>
        <li
          class="py-2 border-gray-600 first:border-t-0 border-t hover:bg-gray-600 flex justify-between items-center rounded text-sm"
          :class="{
            'bg-gray-600':
              chosenCard?.id === card.id && chosenCard.type === card.type,
            'text-gray-400':
              (type === 'buy' && playerContainsCard(card)) ||
              (type === 'sell' && !playerContainsCard(card)),
          }"
          v-for="card in filteredCards"
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
  </div>
</template>
