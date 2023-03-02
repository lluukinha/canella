<script setup lang="ts">
import { CardTypes } from '../../../scripts/main';
import CardPlaceholder from '../../cards/CardPlaceholder.vue';

</script>

<template>
  <div class="flex justify-between w-full p-5">
    <CardPlaceholder :cardType="CardTypes.Attack" :class="{ 'hover:ring': true }" />
    <CardPlaceholder :cardType="CardTypes.Attack" :class="{ 'hover:ring': true }" />
    <CardPlaceholder :cardType="CardTypes.Attack" :class="{ 'hover:ring': true }" />
    <CardPlaceholder :cardType="CardTypes.Attack" :class="{ 'hover:ring': true }" />
  </div>
</template>
