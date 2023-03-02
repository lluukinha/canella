<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import { delay, ICard, CardTypes } from "../../scripts/main";
import Card from "../cards/Card.vue";

import { playerStore } from "../../scripts/store";
import CardPlaceholder from "../cards/CardPlaceholder.vue";

const props = defineProps({
  cardType: {
    type: String as PropType<CardTypes>,
    required: true,
  },
});

const availableCards = computed(() => {
  return playerStore.value.cards.filter((c) => c.type === props.cardType);
});

const isShowingCard = ref<boolean>(false);
const chosenCard = ref<ICard>();

const chooseCard = async (card: ICard) => {
  if (card.id === chosenCard.value?.id) return;

  isShowingCard.value = false;
  if (!!chosenCard.value) await delay(0.5);
  chosenCard.value = card;
  await delay(0.5);

  isShowingCard.value = true;
};

defineEmits(["confirm"]);
</script>

<template>
  <div
    class="w-full h-full absolute z-50 flex justify-center items-start select-none"
  >
    <div class="z-50 flex flex-col gap-4 justify-center w-2/3 mt-10">
      <div class="px-4 py-1 class flex justify-between items-center">
        <span>Choose a {{ cardType }} card to equip:</span>
        <button @click="$emit('confirm')">Close</button>
      </div>
      <div class="flex gap-10 w-full">
        <div class="flex-grow">
          <ul
            class="flex flex-col h-96 custom-scrollbar overflow-y-scroll card-list-names bg-gray-800 rounded-lg cursor-pointer"
            :class="{
              ' justify-center items-center text-gray-500':
                availableCards.length === 0,
            }"
          >
            <li v-if="availableCards.length === 0">NO CARDS FOUND</li>
            <li
              v-for="(card, index) in availableCards"
              :key="`${card.id}_${index}`"
              class="py-2 border-gray-600 first:border-t-0 border-t hover:bg-gray-600 flex justify-between"
              :class="{ 'bg-gray-600': card.id === chosenCard?.id }"
              @click="chooseCard(card)"
            >
              <div class="py-1 px-4">{{ card.name }} - {{ index }}</div>
              <button
                class="py-1 px-4 mx-2 rounded bg-green-500 opacity-50 hover:opacity-100 drop-shadow-lg disabled:opacity-0 transition-all"
                :disabled="!chosenCard"
                @click="$emit('confirm', chosenCard)"
              >
                Choose
              </button>
            </li>
          </ul>
        </div>
        <div class="flex flex-col justify-center items-center">
          <CardPlaceholder :cardType="cardType">
            <Transition name="slide">
              <Card
                :card="chosenCard"
                v-if="!!chosenCard"
                :flipOnHover="false"
                :canFlip="!isShowingCard"
                @click="$emit('confirm', chosenCard)"
              />
            </Transition>
          </CardPlaceholder>
        </div>
      </div>
    </div>
    <div
      class="overlay bg-black opacity-90 w-full h-full absolute z-40"
      @click="$emit('confirm')"
    ></div>
  </div>
</template>
