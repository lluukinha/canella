<script setup lang="ts">
import { PropType } from "vue";
import { IHeroCard } from "../../scripts/main";

defineProps({
  card: {
    type: Object as PropType<IHeroCard>,
    required: true,
  },
});
</script>

<template>
  <div>
    <div
      class="flex justify-center items-center flex-col gap-2 bg-slate-800 p-5 rounded ring text-white select-none relative w-40 h-56"
    >
      <component v-if="card.component" :is="card.component"></component>
      <div class="flex gap-2">
        <span class="py-1 px-2 text-xs rounded bg-blue-900"
        >
        {{ card.attributes.attackType }}
        </span>
      </div>
    </div>
  </div>
</template>
