<script setup lang="ts">
import { computed, PropType } from "vue";
import { IMonsterCard } from "../../scripts/main";

const props = defineProps({
  card: {
    type: Object as PropType<IMonsterCard>,
    required: true,
  },
});

const attackTypes = computed(() =>
  props.card.attributes.attackCards.map((a) => a.attributes.type)
);
</script>

<template>
  <div>
    <div
      class="flex justify-center items-center flex-col gap-2 bg-slate-800 p-5 rounded ring text-white select-none relative w-40 h-56"
    >
      <component v-if="card.component" :is="card.component"></component>
      <div class="flex gap-2">
        <span
          v-for="type in attackTypes"
          class="py-1 px-2 text-xs rounded bg-blue-900"
        >
          {{ type }}
        </span>
      </div>
      <div>
        <span class="font-normal text-xs">Base attack</span>
        {{ card.attributes.attack }}
      </div>
    </div>
  </div>
</template>
