<script setup lang="ts">
import { computed } from "vue";
import Card from "../../cards/Card.vue";
import { playerStore, removeHero, removeWeapon } from "../../../scripts/store";
import { CardTypes, IHeroCard, IWeaponCard } from "../../../scripts/main";
import CardPlaceholder from "../../cards/CardPlaceholder.vue";
import DoubleDown from "../../icons/DoubleDown.vue";
const heroCard = computed(
  (): IHeroCard | null => playerStore.value.equipedCards.hero
);
const weaponCard = computed(
  (): IWeaponCard | null => playerStore.value.equipedCards.weapon
);

defineEmits(["equipCard"]);
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col justify-start">
      <CardPlaceholder
        :card-type="CardTypes.Hero"
        @click="$emit('equipCard', CardTypes.Hero)"
        :class="{ 'hover:ring': !heroCard }"
      >
        <Transition name="slide" mode="out-in">
          <Card :card="heroCard" v-if="heroCard" />
        </Transition>
      </CardPlaceholder>
      <div class="flex justify-center">
        <button
          class="py-1 px-4 bg-red-600 opacity-50 rounded-lg rounded-t-none drop-shadow-lg transition-all hover:opacity-100 disabled:opacity-0"
          @click="removeHero"
          :disabled="!heroCard"
        >
          <DoubleDown />
        </button>
      </div>
    </div>
    <div class="flex flex-col justify-start">
      <CardPlaceholder
        :card-type="CardTypes.Weapon"
        @click="$emit('equipCard', CardTypes.Weapon)"
        :class="{ 'hover:ring': !weaponCard }"
      >
        <Transition name="slide" mode="out-in">
          <Card :card="weaponCard" v-if="weaponCard" />
        </Transition>
      </CardPlaceholder>
      <div class="flex justify-center" v-if="weaponCard">
        <button
          class="py-1 px-4 bg-red-600 opacity-50 rounded-lg rounded-t-none drop-shadow-lg transition-all hover:opacity-100 disabled:opacity-0"
          @click="removeWeapon"
          :disabled="!weaponCard"
        >
          <DoubleDown />
        </button>
      </div>
    </div>
  </div>
</template>
