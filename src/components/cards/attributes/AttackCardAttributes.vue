<script setup lang="ts">
import { PropType, computed } from 'vue';
import { IAttackCardAttributes } from '../../../scripts/main';
import { calculateAttack, playerStore } from '../../../scripts/store';

const props = defineProps({
  attributes: {
    type: Object as PropType<IAttackCardAttributes>,
    required: true,
  },
  showFullAttack: {
    type: Boolean,
    required: false,
  },
});

const heroAttack = computed(() => {
  return playerStore.value.equipedCards.hero?.attributes.attack || 0;
});

const weaponAttack = computed(() => {
  return playerStore.value.equipedCards.weapon?.attributes.attack || 0;
});

const minAttack = computed(() => {
  const { min } = props.attributes;
  if (!props.showFullAttack) return min;
  return calculateAttack(min, min, weaponAttack.value, heroAttack.value);
});

const maxAttack = computed(() => {
  const { max } = props.attributes;
  if (!props.showFullAttack) return max;
  return calculateAttack(max, max, weaponAttack.value, heroAttack.value);
});
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <div
      class="px-2 py-1 bg-gray-800 shadow rounded flex justify-around items-center font-bold text-xs gap-1"
    >
      <div class="flex justify-between items-center gap-1 w-full">
        <div>
          <span class="text-md font-bold uppercase">
            {{ attributes.attackType }}
          </span>
        </div>
        <div
          class="flex gap-1 rounded px-1"
          :class="{ 'bg-red-900': showFullAttack }"
        >
          <span class="font-light scale-75">MIN</span>
          <span>{{ minAttack }}</span>
          <span class="font-light scale-75">MAX</span>
          <span>{{ maxAttack }}</span>
        </div>
      </div>
    </div>
    <div
      class="px-2 py-1 bg-gray-800 shadow rounded flex justify-center items-center font-bold text-xs gap-1 uppercase"
    >
      <div class="flex items-center gap-1">
        <span class="text-xs font-light">Accuracy:</span>
        <span class="text-lg font-bold text-md">{{ attributes.chance }}%</span>
      </div>
    </div>
  </div>
</template>
