<script setup lang="ts">
import { delay, ICard } from '../../../scripts/main';
import { ref } from 'vue';
import CardsToTrade from './CardsToTrade.vue';
import { buyCard, sellCard } from '../../../scripts/store';
import ChosenCardDetails from './cardDetails/ChosenCardDetails.vue';

const merchantType = ref<'buy' | 'sell'>();
const chosenCard = ref<ICard>();
const isShowingCard = ref<boolean>(false);

const chooseCard = async (card: ICard) => {
  if (card.id === chosenCard.value?.id && card.type === chosenCard.value.type)
    return;

  isShowingCard.value = false;
  if (!!chosenCard.value) await delay(0.25);
  chosenCard.value = card;
  await delay(0.5);

  isShowingCard.value = true;
};

const cancelSelection = async () => {
  isShowingCard.value = false;
  await delay(0.5);
  chosenCard.value = undefined;
  merchantType.value = undefined;
};

const buyCardFromMerchant = () => {
  if (!chosenCard.value) return;
  buyCard(chosenCard.value);
};

const sellCardToMerchant = () => {
  if (!chosenCard.value) return;
  sellCard(chosenCard.value);
};
</script>

<template>
  <div class="p-5 h-[calc(100vh-4rem)]">
    <div class="flex h-full gap-4">
      <div class="w-2/5">
        <Transition name="slide-right">
          <CardsToTrade
            :chosen-card="chosenCard"
            @choose-card="chooseCard"
            :type="merchantType"
            v-if="!!merchantType"
          />
        </Transition>
      </div>
      <div
        class="w-full flex justify-center items-start relative bg-cover bg-top bg-no-repeat transition-all"
        :style="`background-image: url('../assets/characters/small_merchant.png')`"
      >
        <Transition name="fade">
          <ChosenCardDetails
            :chosen-card="chosenCard"
            :is-showing-card="isShowingCard"
            :type="merchantType"
            v-if="!!merchantType && !!chosenCard"
            @buy-card-from-merchant="buyCardFromMerchant"
            @sell-card-to-merchant="sellCardToMerchant"
            @cancel-selection="cancelSelection"
          />
        </Transition>
        <div
          class="absolute bottom-0 w-full mx-4 p-5 flex justify-center items-center flex-col gap-2 bg-gray-600 rounded-lg border border-gray-400 z-10 transition-all"
        >
          <Transition name="fade">
            <div v-if="!merchantType">
              <div>Hello traveller, what brings you to my shop?</div>
              <div class="flex gap-4 justify-center">
                <button @click="merchantType = 'buy'">BUY</button>
                <button @click="merchantType = 'sell'">SELL</button>
              </div>
            </div>
            <div class="flex justify-center gap-5" v-else>
              <span>What do you want to {{ merchantType }}?</span>
              <div class="flex gap-2 text-xs">
                <button
                  class="hover:underline"
                  @click="merchantType = undefined"
                >
                  Return
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
