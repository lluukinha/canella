<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import {
  delay,
  ICard,
  CardTypes,
  IWeaponCardAttributes,
  IAttackCardAttributes,
  IHeroCardAttributes,
  heroCards,
  weaponCards,
  attackCards,
} from '../../scripts/main';
import Card from '../cards/Card.vue';
import CheckIcon from '../icons/CheckIcon.vue';
import ErrorIcon from '../icons/ErrorIcon.vue';

import {
  playerStore,
  toAttackCard,
  toHeroCard,
  toWeaponCard,
} from '../../scripts/store';
import CardPlaceholder from '../cards/CardPlaceholder.vue';

const props = defineProps({
  cardType: {
    type: String as PropType<CardTypes>,
    required: true,
  },
});

const availableCards = computed<ICard[]>(() => {
  const cards = [];
  if (props.cardType === CardTypes.Hero)
    cards.push(...playerStore.value.cards.heroes.map(toHeroCard));
  if (props.cardType === CardTypes.Attack)
    cards.push(...playerStore.value.cards.attacks.map(toAttackCard));
  if (props.cardType === CardTypes.Weapon)
    cards.push(...playerStore.value.cards.weapons.map(toWeaponCard));
  return cards;
});

const isShowingCard = ref<boolean>(false);
const chosenCard = ref<ICard>();
const chosenIndex = ref<number>();

const chooseCard = async (card: ICard, index: number) => {
  if (index === chosenIndex.value) return;

  isShowingCard.value = false;
  chosenIndex.value = index;

  if (!!chosenCard.value) await delay(0.25);
  chosenCard.value = card;
  await delay(0.5);

  isShowingCard.value = true;
};

const canEquip = (card: ICard) => {
  if (props.cardType === CardTypes.Hero) return true;
  if (
    props.cardType === CardTypes.Attack &&
    !playerStore.value.equipedCards.weapon
  )
    return true;
  if (
    props.cardType === CardTypes.Weapon &&
    !playerStore.value.equipedCards.hero
  )
    return true;

  if (props.cardType === CardTypes.Weapon) {
    const heroCard = heroCards[playerStore.value.equipedCards.hero!];
    const allowedWeapons = heroCard.attributes.weaponTypes;
    return allowedWeapons.includes(
      (card.attributes as IWeaponCardAttributes).type
    );
  }

  if (props.cardType === CardTypes.Attack) {
    const weaponCard = weaponCards[playerStore.value.equipedCards.weapon!];
    const { type, attackTypes } = weaponCard.attributes;
    const attributes = card.attributes as IAttackCardAttributes;
    const isWeaponAllowed = attributes.weaponTypes.includes(type);
    const isAttackAllowed = attackTypes.includes(attributes.attackType);
    return isWeaponAllowed && isAttackAllowed;
  }
};

const emit = defineEmits(['confirm', 'close']);

const confirmCard = () => {
  if (!chosenCard.value || !canEquip(chosenCard.value)) return;

  let cardsToLookFor = {};
  if (props.cardType === CardTypes.Attack) cardsToLookFor = attackCards;
  if (props.cardType === CardTypes.Hero) cardsToLookFor = heroCards;
  if (props.cardType === CardTypes.Weapon) cardsToLookFor = weaponCards;

  const index = (Object.values(cardsToLookFor) as ICard[]).findIndex(
    (c) => c.id === chosenCard.value!.id
  );
  const cardKey = Object.keys(cardsToLookFor)[index];

  emit('confirm', { cardKey, type: props.cardType });
};
</script>

<template>
  <div
    class="w-full h-full absolute z-50 flex justify-center items-start select-none"
  >
    <div class="z-50 flex flex-col gap-4 justify-center w-2/3 mt-10">
      <div class="px-4 py-1 class flex justify-between items-center">
        <span>Choose a {{ cardType }} card to equip:</span>
        <button @click="$emit('close')">Close</button>
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
              class="py-2 border-gray-600 first:border-t-0 border-t hover:bg-gray-600 flex justify-between items-center"
              :class="{ 'bg-gray-600': index === chosenIndex }"
              @click="chooseCard(card, index)"
            >
              <div
                class="py-1 pl-4 pr-2 flex items-center justify-between w-full"
              >
                <span>#{{ card.id }} - {{ card.name }}</span>
                <div class="flex items-center gap-1">
                  <template v-if="cardType === CardTypes.Hero">
                    <span
                      class="px-2 bg-gray-800 rounded text-xs font-semibold uppercase"
                    >
                      {{ (card.attributes as IHeroCardAttributes).type }}
                    </span>
                  </template>
                  <template v-else-if="cardType === CardTypes.Weapon">
                    <span
                      class="px-1 bg-gray-100 rounded text-xs text-black font-semibold uppercase"
                    >
                      {{ (card.attributes as IWeaponCardAttributes).type }}
                    </span>
                    <span class="px-1 bg-red-600 rounded text-xs font-semibold">
                      ATK:
                      {{ (card.attributes as IWeaponCardAttributes).attack }}
                    </span>
                  </template>
                  <template v-else-if="cardType === CardTypes.Attack">
                    <span class="px-1 bg-red-600 rounded text-xs font-semibold">
                      MIN: {{ (card.attributes as IAttackCardAttributes).min }}
                    </span>
                    <span class="px-1 bg-red-600 rounded text-xs font-semibold">
                      MAX: {{ (card.attributes as IAttackCardAttributes).max }}
                    </span>
                    <span
                      class="px-1 bg-gray-100 rounded text-xs text-black font-semibold"
                    >
                      CHANCE:
                      {{ (card.attributes as IAttackCardAttributes).chance }}%
                    </span>
                  </template>
                </div>
              </div>

              <button
                class="py-1 px-2 mx-2 rounded bg-transparent drop-shadow-lg text-gray-500"
                :disabled="true"
                v-if="!canEquip(card)"
              >
                <ErrorIcon />
              </button>
              <button
                class="py-1 px-2 mx-2 rounded bg-green-500 drop-shadow-lg disabled:opacity-0 transition-all"
                :disabled="
                  !chosenCard || (!!chosenCard && chosenIndex != index)
                "
                @click="confirmCard"
                v-else
              >
                <CheckIcon />
              </button>
            </li>
          </ul>
        </div>
        <div class="flex flex-col justify-center items-center">
          <CardPlaceholder :cardType="cardType">
            <Transition name="fade">
              <div
                class="absolute flex justify-center z-50 w-full h-full bg-gray-600 bg-opacity-30"
                v-if="!!chosenCard && !canEquip(chosenCard)"
              >
                <div
                  class="absolute bg-red-500 w-full py-2 h-10 top-20 flex justify-center ml-2"
                >
                  INCOMPATIBLE
                </div>
              </div>
            </Transition>
            <Transition name="slide">
              <Card
                :card="chosenCard"
                v-if="!!chosenCard"
                :flipOnHover="false"
                :hideFront="!isShowingCard"
                @click="confirmCard"
              />
            </Transition>
          </CardPlaceholder>
        </div>
      </div>
    </div>
    <div
      class="overlay bg-black opacity-90 w-full h-full absolute z-40"
      @click="$emit('close')"
    ></div>
  </div>
</template>
