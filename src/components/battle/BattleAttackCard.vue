<script setup lang="ts">
import { PropType, computed } from 'vue';
import { IAttackCard } from '../../scripts/main';
import CardBackSide from '../cards/CardBackSide.vue';
import { playerStore, calculateAttack } from '../../scripts/store';

const props = defineProps({
  card: { type: Object as PropType<IAttackCard>, required: true },
  canAttack: Boolean,
  isFlipped: { type: Boolean, default: true },
});

const emit = defineEmits(['attack']);

const attack = () => {
  const { min, max, chance } = props.card.attributes;
  emit('attack', { min, max, chance });
};

const heroAttack = computed(() => {
  return playerStore.value.equipedCards.hero?.attributes.attack || 0;
});

const weaponAttack = computed(() => {
  return playerStore.value.equipedCards.weapon?.attributes.attack || 0;
});

const minAttack = computed(() => {
  const { min } = props.card.attributes;
  return calculateAttack(min, min, weaponAttack.value, heroAttack.value);
});

const maxAttack = computed(() => {
  const { max } = props.card.attributes;
  return calculateAttack(max, max, weaponAttack.value, heroAttack.value);
});
</script>

<template>
  <div
    class="flip-card drop-shadow-lg w-32 h-40 transition-all"
    @click="attack"
  >
    <div class="flip-card-inner transition-all" :class="{ flip: !isFlipped }">
      <div
        class="flip-card-front bg-gradient-to-t rounded-xl shadow-lg py-2 px-5 border-4 flex flex-col justify-center gap-2 relative transition-all from-red-700 to-gray-900 border-red-900 text-white"
      >
        <div
          class="flex flex-col gap-1 w-full justify-center uppercase text-center font-bold items-center"
        >
          {{ card.name }}
        </div>
        <p
          class="text-center text-red-400 flex flex-col items-center justify-center"
        >
          <span class="text-xl font-bold">{{ card.attributes.chance }}%</span>
        </p>
        <div class="flex justify-between" v-if="card.price > 0">
          <div
            class="bg-red-900 p-1 rounded flex flex-col items-center gap-1 border border-red-700"
          >
            <span class="text-xs scale-75 text-red-500">MIN</span>
            <span class="-mt-2 text-sm font-bold text-red-300">
              {{ minAttack }}
            </span>
          </div>
          <div
            class="bg-red-900 p-1 rounded flex flex-col items-center gap-1 border border-red-700"
          >
            <span class="text-xs scale-75 text-red-500">MAX</span>
            <span class="-mt-2 text-sm font-bold text-red-300">
              {{ maxAttack }}
            </span>
          </div>
        </div>
      </div>
      <CardBackSide class="border-red-900" />
    </div>
  </div>
</template>
