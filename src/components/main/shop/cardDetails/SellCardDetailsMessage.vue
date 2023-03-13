<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { ICard } from "../../../../scripts/main";
import GoldIcon from "../../../icons/GoldIcon.vue";
import { playerContainsCard } from "../../../../scripts/store";

const props = defineProps({
  chosenCard: {
    type: Object as PropType<ICard>,
    required: true,
  },
});

const emit = defineEmits(["cancelSelection", "sellCardToMerchant"]);

const sellCard = async () => {
  isShowingCustomMessage.value = true;
  emit("sellCardToMerchant");
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
    <div v-if="isShowingCustomMessage" class="flex items-center gap-5">
      Thanks for selling me this item. I transfered the gold to your account.
      <button class="hover:underline text-xs" @click="$emit('cancelSelection')">
        Return
      </button>
    </div>
    <div class="flex gap-5" v-else>
      <div
        class="flex items-center gap-5"
        v-if="!playerContainsCard(chosenCard)"
      >
        <span>You don't have this card anymore</span>
        <button
          class="hover:underline text-xs"
          @click="$emit('cancelSelection')"
        >
          Cancel
        </button>
      </div>
      <template v-else>
        <div class="flex items-center">
          <span
            >{{ chosenCard.name }}? I can pay you {{ chosenCard.price }}</span
          >
          <GoldIcon class="mx-2" />
          <span>for it.</span>
        </div>
        <div class="flex gap-2 text-xs">
          <button class="hover:underline" @click="$emit('cancelSelection')">
            Cancel
          </button>
          <button class="hover:underline" @click="sellCard">Accept</button>
        </div>
      </template>
    </div>
  </Transition>
</template>
