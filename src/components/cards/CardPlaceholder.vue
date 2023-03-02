<script setup lang="ts">
import { PropType } from "vue";
import { CardTypes } from "../../scripts/main";

defineProps({
  cardType: {
    type: String as PropType<CardTypes>,
    required: true,
  },
});
</script>

<template>
  <div
    class="w-64 h-96 border-4 border-double rounded-lg flex justify-center items-center font-semibold cursor-pointer placeholder"
    :class="{
      'border-blue-700': cardType === CardTypes.Hero,
      'border-red-600': cardType === CardTypes.Attack,
      'border-yellow-300': cardType === CardTypes.Weapon,
      'border-green-700': cardType === CardTypes.Monster,
    }"
  >
    <div class="slot z-20">
      <slot></slot>
    </div>
    <span
      class="slot-text uppercase absolute z-10"
      :class="{
        'text-blue-500': cardType === CardTypes.Hero,
        'text-red-600': cardType === CardTypes.Attack,
        'text-yellow-300': cardType === CardTypes.Weapon,
        'text-green-500': cardType === CardTypes.Monster,
      }"
    >
      {{ cardType }} CARD
    </span>
  </div>
</template>
