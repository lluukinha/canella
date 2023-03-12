<script setup lang="ts">
import Card from '../../cards/Card.vue';
import GoldIcon from '../../icons/GoldIcon.vue';
import { delay, ICard } from '../../../scripts/main';
import { computed, ref } from 'vue';
import CardsToTrade from './CardsToTrade.vue';
import {
  buyCard,
  playerContainsCard,
  playerStore,
  sellCard,
} from '../../../scripts/store';

const merchant = new URL(
  '../../../assets/characters/small_merchant.png',
  import.meta.url
).href;

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
};

const canBuy = computed(
  () => !!chosenCard.value && playerStore.value.gold >= chosenCard.value.price
);

const buyCardFromMerchant = () => {
  if (!chosenCard.value) return;
  buyCard(chosenCard.value);
  chosenCard.value = undefined;
};

const sellCardToMerchant = () => {
  if (!chosenCard.value) return;
  sellCard(chosenCard.value);
  chosenCard.value = undefined;
};
</script>

<template>
  <div class="p-5 h-[calc(100vh-4rem)]">
    <div class="flex h-full gap-4">
      <Transition name="slide-right">
        <div class="w-2/5" v-if="!!merchantType">
          <CardsToTrade
            :chosen-card="chosenCard"
            @choose-card="chooseCard"
            :type="merchantType"
          />
        </div>
      </Transition>
      <div
        class="w-full flex justify-center items-start relative bg-cover bg-top bg-no-repeat transition-all"
        :style="`background-image: url(${merchant})`"
      >
        <Transition name="fade">
          <div
            class="absolute w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center rounded-lg"
            v-if="!!chosenCard"
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
              <template v-if="merchantType === 'buy'">
                <template v-if="!!chosenCard && playerContainsCard(chosenCard)">
                  <div class="flex items-center gap-5">
                    <span>You already have this card</span>
                    <button
                      class="hover:underline text-xs"
                      @click="cancelSelection"
                    >
                      Cancel
                    </button>
                  </div>
                </template>
                <template v-else>
                  <div class="flex items-center">
                    <span
                      >{{ chosenCard.name }}? It will cost you
                      {{ chosenCard.price }}</span
                    >
                    <GoldIcon />
                  </div>
                  <div class="flex gap-2 text-xs items-center" v-if="canBuy">
                    <button class="hover:underline" @click="cancelSelection">
                      Cancel
                    </button>
                    <button
                      class="hover:underline"
                      @click="buyCardFromMerchant"
                    >
                      Accept
                    </button>
                  </div>
                  <div class="flex gap-2 items-center" v-else>
                    but you dont have enough money to buy it.
                    <button
                      class="hover:underline text-xs"
                      @click="cancelSelection"
                    >
                      Cancel
                    </button>
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="flex">
                  <span
                    >{{ chosenCard.name }}? I can pay you
                    {{ chosenCard.price }}</span
                  >
                  <GoldIcon class="mx-2" />
                  <span>for it.</span>
                </div>
                <div class="flex gap-2 text-xs">
                  <button class="hover:underline" @click="cancelSelection">
                    Cancel
                  </button>
                  <button class="hover:underline" @click="sellCardToMerchant">
                    Accept
                  </button>
                </div>
              </template>
            </div>
          </div>
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
