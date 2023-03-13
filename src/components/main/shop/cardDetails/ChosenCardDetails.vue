<script setup lang="ts">
import { PropType } from "vue";
import { ICard } from "../../../../scripts/main";
import Card from "../../../cards/Card.vue";
import BuyCardDetailsMessage from "./BuyCardDetailsMessage.vue";
import SellCardDetailsMessage from "./SellCardDetailsMessage.vue";

defineProps({
  type: {
    type: String as PropType<"buy" | "sell">,
    required: true,
  },
  chosenCard: {
    type: Object as PropType<ICard>,
    required: true,
  },
  isShowingCard: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["cancelSelection", "buyCardFromMerchant", "sellCardToMerchant"]);
</script>

<template>
  <div
    class="absolute w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center rounded-lg"
  >
    <Card
      :card="chosenCard"
      class="-mt-20"
      :flip-on-hover="false"
      :hide-front="!isShowingCard"
    />
    <div
      class="absolute bottom-0 w-full p-5 flex justify-center items-center bg-gray-600 rounded-lg border border-gray-400 gap-4"
    >
      <BuyCardDetailsMessage
        :chosen-card="chosenCard"
        v-if="type === 'buy'"
        @buy-card-from-merchant="$emit('buyCardFromMerchant')"
        @cancel-selection="$emit('cancelSelection')"
      />
      <SellCardDetailsMessage
        :chosen-card="chosenCard"
        v-if="type === 'sell'"
        @sell-card-to-merchant="$emit('sellCardToMerchant')"
        @cancel-selection="$emit('cancelSelection')"
      />
    </div>
  </div>
</template>
