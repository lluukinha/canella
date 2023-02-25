<script setup lang="ts">
import { computed, PropType } from 'vue';
import { IAttackCard, IHeroCard } from '../../scripts/main';

const props = defineProps({
  card: { type: Object as PropType<IAttackCard>, required: true },
  canAttack: Boolean,
  hero: { type: Object as PropType<IHeroCard>, required: true },
});

const min = computed(() => {
  if (!props.hero.equipedWeapon) return props.card.min;
  const weaponType = props.hero.equipedWeapon.type;
  if (
    props.hero.weaponType === props.card.type &&
    props.card.type === weaponType
  ) {
    return props.card.min + props.hero.equipedWeapon.attack;
  }
  return props.card.min;
});

const max = computed(() => {
  if (!props.hero.equipedWeapon) return props.card.max;
  const weaponType = props.hero.equipedWeapon.type;
  if (
    props.hero.weaponType === props.card.type &&
    props.card.type === weaponType
  ) {
    return props.card.max + props.hero.equipedWeapon.attack;
  }
  return props.card.max;
});

const emit = defineEmits(['attack']);

const attack = () => {
  const successProbability = props.card.chance / 100;
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
    <span>Chance: {{ card.chance }}%</span>
  </div>
</template>
