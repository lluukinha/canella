<script setup lang="ts">
import { computed, onMounted, PropType, ref } from "vue";
import {
  experienceTable,
  IMonsterCard,
  delay,
  upLevel,
  downLevel,
  ICard,
  calculateAverage,
  successProbability,
  CardTypes,
} from "../../scripts/main";
import Card from "../cards/Card.vue";

import { playerStore } from "../../scripts/store";
import CardPlaceholder from "../cards/CardPlaceholder.vue";
import DoubleUp from "../icons/DoubleUp.vue";

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
      <div class="flex gap-10 w-full">
        <div class="flex-grow">
          <div class="px-4 py-1">Choose a {{ cardType }} card to equip:</div>
          <ul
            class="flex flex-col h-96 overflow-y-scroll card-list-names bg-gray-800 rounded-lg cursor-pointer"
          >
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
          <div>
            <button
              class="py-1 px-4 bg-green-600 opacity-50 rounded-lg rounded-b-none drop-shadow-lg transition-all hover:opacity-100 disabled:opacity-0"
              :disabled="!chosenCard"
              @click="$emit('confirm', chosenCard)"
            >
              <DoubleUp />
            </button>
          </div>
          <CardPlaceholder :cardType="cardType">
            <Transition name="slide">
              <Card
                :card="chosenCard"
                v-if="!!chosenCard"
                :flipOnHover="false"
                :canFlip="!isShowingCard"
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

<style lang="postcss" scoped>
.card-list-names::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.card-list-names::-webkit-scrollbar-track {
  @apply bg-gray-900;
  border-radius: 10px;
}

/* Handle */
.card-list-names::-webkit-scrollbar-thumb {
  @apply bg-gray-700;
  border-radius: 10px;
}

/* Handle on hover */
.card-list-names::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
