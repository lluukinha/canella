<script setup lang="ts">
import { computed, PropType } from 'vue';
import { IMonsterCard } from '../../scripts/main';

const props = defineProps({
  card: {
    type: Object as PropType<IMonsterCard>,
    required: true,
  },
  canFlip: {
    type: Boolean,
    required: false,
  },
});

const attackTypes = computed(() =>
  props.card.attributes.attackCards.map((a) => a.attributes.type)
);
</script>

<template>
  <div class="flip-card w-48 h-64 drop-shadow-lg">
    <div class="flip-card-inner transition-all" :class="{ flip: !canFlip }">
      <div
        class="flip-card-front bg-gradient-to-t rounded-xl shadow-lg py-1 px-2 border-4 flex flex-col from-green-500 to-gray-900 border-green-700 text-white items-center justify-center gap-1"
      >
        <div
          class="top flex justify-between items-center font-bold w-full text-xs"
        >
          #{{ card.id }}
          <span class="uppercase">{{ card.type }}</span>
        </div>
        <div
          class="image border border-gray-700 rounded w-44 h-40 bg-gray-800 flex justify-center items-center relative"
        >
          <component :is="card.component" v-if="card.component" />
          <span
            class="px-2 bg-gray-900 shadow rounded flex justify-center items-center font-bold absolute bottom-1 right-1 text-xs"
          >
            {{ card.attributes.attackType }}
          </span>
        </div>
        <div class="text-xs">
          <div
            class="name w-44 px-2 py-1 flex justify-between border rounded-md rounded-b-none bg-gray-600 border-gray-700 uppercase"
          >
            {{ card.name }}
          </div>
          <div
            class="name w-44 px-2 py-1 flex justify-between border rounded-md rounded-t-none bg-gray-600 border-gray-700 uppercase"
          >
            Attack
            <span
              class="px-2 bg-gray-900 shadow rounded flex justify-center items-center font-bold"
            >
              {{ card.attributes.attack }}
            </span>
          </div>
        </div>
      </div>
      <div
        class="flip-card-back bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border-4 border-green-500 flex justify-center items-center text-gray-700 font-extrabold"
      >
        CANELLA
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  background-color: transparent;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  position: relative;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the back side */
.flip-card-front {
  transform: rotateY(180deg);
}
</style>
