<script setup lang="ts">
import { computed, PropType } from 'vue';
import { IAttackCard } from '../../scripts/main';
import CardBackSide from '../cards/CardBackSide.vue';

const props = defineProps({
  card: { type: Object as PropType<IAttackCard>, required: true },
  canAttack: Boolean,
  baseAttack: { type: Number, required: false },
  isFlipped: { type: Boolean, default: true },
});

const min = computed(() => {
  if (!props.baseAttack) return props.card.attributes.min;
  return props.card.attributes.min + props.baseAttack;
});

const max = computed(() => {
  if (!props.baseAttack) return props.card.attributes.max;
  return props.card.attributes.max + props.baseAttack;
});

const emit = defineEmits(['attack']);

const attack = () => {
  const successProbability = props.card.attributes.chance / 100;
  let damage =
    Math.floor(Math.random() * (max.value - min.value + 1)) + min.value;
  if (Math.random() >= successProbability) damage = 0;
  emit('attack', damage);
};
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
          class="flex flex-col gap-1 w-full justify-center uppercase text-center font-bold"
        >
          <div>{{ card.name }}</div>

          <div>
            <span class="font-normal text-xs">ATK</span>
            {{ min }}~{{ max }}
          </div>
        </div>
        <p
          class="text-center text-red-400 flex flex-col items-center justify-center"
        >
          <span class="text-xs">Chance</span>
          <span class="text-3xl">{{ card.attributes.chance }}%</span>
        </p>
      </div>
      <CardBackSide class="border-red-900" />
    </div>
  </div>
</template>
