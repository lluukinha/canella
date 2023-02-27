<script setup lang="ts">
import { computed, PropType } from 'vue';
import { IAttackCard, IHeroCard, IWeaponCard } from '../../scripts/main';

const props = defineProps({
  card: { type: Object as PropType<IAttackCard>, required: true },
  canAttack: Boolean,
  weapon: { type: Object as PropType<IWeaponCard>, required: true },
});

const min = computed(() => {
  if (!props.weapon) return props.card.attributes.min;
  return props.card.attributes.min + props.weapon.attributes.attack;
});

const max = computed(() => {
  if (!props.weapon) return props.card.attributes.max;
  return props.card.attributes.max + props.weapon.attributes.attack;
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
    class="card w-28 h-40 bg-black flex flex-col items-center justify-center text-white cursor-pointer transition-all"
    :class="{ 'hover:scale-125': canAttack, 'opacity-50': !canAttack }"
    @click="attack"
  >
    <span>{{ card.name }}</span>
    <span>MIN: {{ min }}</span>
    <span>MAX: {{ max }}</span>
    <span>Chance: {{ card.attributes.chance }}%</span>
  </div>
</template>
