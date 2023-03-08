<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import {
  CardTypes,
  ICard,
  HeroTypes,
  IHeroCard,
  WeaponTypes,
  AttackTypes,
  IWeaponCard,
  IAttackCard,
  IMonsterCard,
} from "../../../scripts/main";

import Card from "../../cards/Card.vue";

const props = defineProps({
  cards: {
    type: Array as PropType<ICard[]>,
    required: true,
  },
  title: String,
  cardType: {
    type: String as PropType<CardTypes>,
    required: true,
  },
  visibleIds: {
    type: Array as PropType<number[]>,
    required: true,
  },
  flippableIds: {
    type: Array as PropType<number[]>,
    required: true,
  },
});

const heroTypeFilter = ref<HeroTypes>();
const weaponTypeFilter = ref<WeaponTypes>();
const attackTypeFilter = ref<AttackTypes>();

const resetFilters = () => {
  heroTypeFilter.value = undefined;
  weaponTypeFilter.value = undefined;
  attackTypeFilter.value = undefined;
}

const showWeaponTypeFilter = computed(() =>
  [CardTypes.Hero, CardTypes.Weapon, CardTypes.Attack].includes(props.cardType)
);

const showAttackTypeFilter = computed(() =>
  [CardTypes.Weapon, CardTypes.Attack, CardTypes.Monster].includes(
    props.cardType
  )
);

const filteredHeroCards = (): IHeroCard[] => {
  const cards = props.cards as IHeroCard[];
  const filteredByType = heroTypeFilter.value
    ? cards.filter((c) => c.attributes.type === heroTypeFilter.value)
    : cards;
  const filteredByWeaponType = weaponTypeFilter.value
    ? filteredByType.filter((c) =>
        c.attributes.weaponTypes.includes(weaponTypeFilter.value!)
      )
    : filteredByType;
  return filteredByWeaponType;
};

const filteredByWeaponCards = (): IWeaponCard[] => {
  const cards = props.cards as IWeaponCard[];
  const filteredByType = weaponTypeFilter.value
    ? cards.filter((c) => c.attributes.type === weaponTypeFilter.value)
    : cards;
  const filteredByAttackType = attackTypeFilter.value
    ? filteredByType.filter((c) =>
        c.attributes.attackTypes.includes(attackTypeFilter.value!)
      )
    : filteredByType;
  return filteredByAttackType;
};

const filteredAttackCards = (): IAttackCard[] => {
  const cards = props.cards as IAttackCard[];
  const filteredByType = attackTypeFilter.value
    ? cards.filter((c) => c.attributes.attackType === attackTypeFilter.value)
    : cards;
  const filteredByWeaponType = weaponTypeFilter.value
    ? filteredByType.filter((c) =>
        c.attributes.weaponTypes.includes(weaponTypeFilter.value!)
      )
    : filteredByType;
  return filteredByWeaponType;
};

const filteredMonsterCards = (): IMonsterCard[] => {
  const cards = props.cards as IMonsterCard[];
  const filteredByAttackType = attackTypeFilter.value
    ? cards.filter((c) => c.attributes.attackType === attackTypeFilter.value)
    : cards;
  return filteredByAttackType;
};

const filteredCards = computed((): ICard[] => {
  if (props.cardType === CardTypes.Hero) return filteredHeroCards();
  if (props.cardType === CardTypes.Weapon) return filteredByWeaponCards();
  if (props.cardType === CardTypes.Attack) return filteredAttackCards();
  if (props.cardType === CardTypes.Monster) return filteredMonsterCards();

  return props.cards;
});
</script>

<template>
  <div class="w-full flex flex-col">
    <div class="w-full border-b py-2 px-4 flex justify-between items-center">
      <h1 class="text-3xl">{{ title }}</h1>
      <div class="flex gap-2">
        <select
          class="block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 rounded"
          v-if="cardType === CardTypes.Hero"
          v-model="heroTypeFilter"
        >
          <option :value="undefined">All Heroes</option>
          <option v-for="hero in HeroTypes" :key="hero" :value="hero">
            {{ hero }}
          </option>
        </select>
        <select
          class="block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 rounded"
          v-if="showWeaponTypeFilter"
          v-model="weaponTypeFilter"
        >
          <option :value="undefined">All Weapons</option>
          <option v-for="weapon in WeaponTypes" :key="weapon" :value="weapon">
            {{ weapon }}
          </option>
        </select>
        <select
          class="block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 rounded"
          v-if="showAttackTypeFilter"
          v-model="attackTypeFilter"
        >
          <option :value="undefined">All Attacks</option>
          <option v-for="atk in AttackTypes" :key="atk" :value="atk">
            {{ atk }}
          </option>
        </select>
      </div>
    </div>
    <div
      class="cards flex flex-wrap gap-5 justify-center bg-gray-900 bg-opacity-70 py-5 rounded-lg rounded-t-none"
    >
      <div
        class="h-96 flex justify-center items-center"
        v-if="filteredCards.length === 0"
      >
        <h1 class="text-gray-600 font-semibold">
          NO CARDS FOUND, <button class="underline" @click="resetFilters">RESET FILTERS</button>
        </h1>
      </div>
      <template v-else>
      <TransitionGroup name="list">
        <div v-for="card in filteredCards" :key="`${cardType}_${card.id}`" class="relative">
          <div
            class="absolute w-full z-30 bottom-10 mx-auto text-center text-gray-500 font-bold"
            v-if="!flippableIds.includes(card.id) && !visibleIds.includes(card.id)"
          >
            UNDISCOVERED
          </div>
        <Card
          :card="card"
          :flip-on-hover="flippableIds.includes(card.id) && !visibleIds.includes(card.id)"
          :hideFront="false && !visibleIds.includes(card.id)"
          :hideContent="false && !flippableIds.includes(card.id) && !visibleIds.includes(card.id)"
        />
        </div>
      </TransitionGroup>
    </template>
    </div>
  </div>
</template>
