<script setup lang="ts">
import { computed, PropType, ref, watch } from "vue";
import { ICard } from "../../../../scripts/main";
import { playerContainsCard, playerStore } from "../../../../scripts/store";
import GoldIcon from "../../../icons/GoldIcon.vue";

const props = defineProps({
  chosenCard: {
    type: Object as PropType<ICard>,
    required: true,
  },
});

const canBuy = computed(
  () => !!props.chosenCard && playerStore.value.gold >= props.chosenCard.price
);

const emit = defineEmits(["cancelSelection", "buyCardFromMerchant"]);

const buyCard = async () => {
  isShowingCustomMessage.value = true;
  emit("buyCardFromMerchant");
};

const isShowingCustomMessage = ref<boolean>(false);

watch(
  () => props.chosenCard,
  () => {
    isShowingCustomMessage.value = false;
  },
  { deep: true }
);
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="isShowingCustomMessage" class="flex gap-5 items-center">
      Thanks for your purchase. Your new card is already in your deck.
      <button class="hover:underline text-xs" @click="$emit('cancelSelection')">
        Return
      </button>
    </div>
    <div class="flex items-center gap-5" v-else>
      <div
        class="flex items-center gap-5"
        v-if="playerContainsCard(chosenCard)"
      >
        <span>You already have this card</span>
        <button
          class="hover:underline text-xs"
          @click="$emit('cancelSelection')"
        >
          Cancel
        </button>
      </div>
      <template v-else>
        <div class="flex items-center">
          <span>
            {{ chosenCard.name }}? It will cost you {{ chosenCard.price }}
          </span>
          <GoldIcon />
        </div>
        <div class="flex gap-2 text-xs items-center" v-if="canBuy">
          <button class="hover:underline" @click="$emit('cancelSelection')">
            Cancel
          </button>
          <button class="hover:underline" @click="buyCard">Accept</button>
        </div>
        <div class="flex gap-2 items-center" v-else>
          but you dont have enough money to buy it.
          <button
            class="hover:underline text-xs"
            @click="$emit('cancelSelection')"
          >
            Cancel
          </button>
        </div>
      </template>
    </div>
  </Transition>
</template>
