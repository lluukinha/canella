<script setup lang="ts">
import Battle from './components/Battle.vue';
import ChoosingHero from './components/ChoosingHero.vue';
import { ref } from 'vue';

const isFighting = ref(false);
</script>

<template>
  <ChoosingHero @start-battle="isFighting = true" v-if="!isFighting" />
  <Battle @quit="isFighting = false" v-else />
</template>

<style scoped></style>
