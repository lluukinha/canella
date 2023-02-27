<script setup lang="ts">
import { ref } from 'vue';
import Battle from './Battle.vue';
import ChoosingHero from './ChoosingHero.vue';
import BookIcon from './icons/BookIcon.vue';
import CardsIcon from './icons/CardsIcon.vue';
import PersonIcon from './icons/PersonIcon.vue';
import ShopIcon from './icons/ShopIcon.vue';
import GoldIcon from './icons/GoldIcon.vue';

const isFighting = ref<boolean>(false);
const current = ref<string>('hero');
</script>

<template>
  <Transition mode="out-in">
    <Battle @quit="isFighting = false" v-if="isFighting" />

    <div class="flex flex-col w-full h-full p-5 pb-10 gap-10" v-else>
      <div class="w-full h-full bg-blue-600">
        <ChoosingHero @start-battle="isFighting = true" v-if="!isFighting" />
      </div>
      <div class="flex w-full justify-around">
        <div
          class="w-32 h-32 rounded text-center flex justify-center items-center bg-red-500 flex-col transition-all opacity-50 hover:opacity-100"
          :class="{ 'scale-125 opacity-100': current === 'hero' }"
        >
          <PersonIcon class="w-20 h-20" />

          Hero
        </div>
        <div
          class="w-32 h-32 rounded text-center flex justify-center items-center bg-red-500 flex-col transition-all opacity-50 hover:opacity-100"
        >
          <BookIcon class="w-20 h-20" />
          Story
        </div>
        <div
          class="w-32 h-32 rounded text-center flex justify-center items-center bg-red-500 flex-col transition-all opacity-50 hover:opacity-100"
        >
          <CardsIcon class="w-20 h-20" />
          Cards
        </div>
        <div
          class="w-32 h-32 rounded text-center flex justify-center items-center bg-red-500 flex-col transition-all opacity-50 hover:opacity-100"
        >
          <ShopIcon class="w-20 h-20" />

          Shop
        </div>
        <div
          class="w-32 h-32 rounded text-center flex justify-center items-center flex-col text-2xl"
        >
          Level 1
          <div class="flex gap-2">
            <GoldIcon class="w-10 h-10 text-yellow-400" />
            0
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <!-- <Transition name="bounce" mode="out-in">
    <Battle @quit="isFighting = false" v-if="isFighting" />
    <ChoosingHero @start-battle="isFighting = true" v-else />
  </Transition> -->
</template>