<script setup lang="ts">
import { CardTypes, IAttackCard } from "../../../scripts/main";
import CardPlaceholder from "../../cards/CardPlaceholder.vue";
import DoubleDown from "../../icons/DoubleDown.vue";
import { playerStore, removeAttack } from "../../../scripts/store";
import { computed } from "vue";
import Card from "../../cards/Card.vue";

const battleCards = computed<IAttackCard[]>(() => playerStore.value.equipedCards.attacks);
const canEquipBattleCards = computed<boolean>(() => {
  const { hero, weapon } = playerStore.value.equipedCards;
  return !!hero && !!weapon;
})

const equipCard = () => {
  if (!canEquipBattleCards.value) return;
  emit('equipCard', CardTypes.Attack);
}

const emit = defineEmits(["equipCard"]);
</script>

<template>
  <div class="flex gap-4 w-full">
    <div class="flex flex-col justify-start">
      <CardPlaceholder
        :card-type="CardTypes.Attack"
        @click="equipCard"
        :class="{ 'hover:ring': !battleCards[0] }"
      >
        <Transition name="slide" mode="out-in">
          <Card :card="battleCards[0]" v-if="!!battleCards[0]" />
        </Transition>
      </CardPlaceholder>
      <div class="flex justify-center">
        <button
          class="py-1 px-4 bg-red-600 opacity-50 rounded-lg rounded-t-none drop-shadow-lg transition-all hover:opacity-100 disabled:opacity-0"
          @click="removeAttack(0)"
          :disabled="!battleCards[0]"
        >
          <DoubleDown />
        </button>
      </div>
    </div>

    <div class="flex flex-col justify-start">
      <CardPlaceholder
        :card-type="CardTypes.Attack"
        @click="equipCard"
        :class="{ 'hover:ring': !battleCards[1] && canEquipBattleCards  }"
      >
        <Transition name="slide" mode="out-in">
          <Card :card="battleCards[1]" v-if="!!battleCards[1]" />
        </Transition>
      </CardPlaceholder>
      <div class="flex justify-center">
        <button
          class="py-1 px-4 bg-red-600 opacity-50 rounded-lg rounded-t-none drop-shadow-lg transition-all hover:opacity-100 disabled:opacity-0"
          @click="removeAttack(1)"
          :disabled="!battleCards[1]"
        >
          <DoubleDown />
        </button>
      </div>
    </div>

    <div class="flex flex-col justify-start">
      <CardPlaceholder
        :card-type="CardTypes.Attack"
        @click="equipCard"
        :class="{ 'hover:ring': !battleCards[2] && canEquipBattleCards }"
      >
        <Transition name="slide" mode="out-in">
          <Card :card="battleCards[2]" v-if="!!battleCards[2]" />
        </Transition>
      </CardPlaceholder>
      <div class="flex justify-center">
        <button
          class="py-1 px-4 bg-red-600 opacity-50 rounded-lg rounded-t-none drop-shadow-lg transition-all hover:opacity-100 disabled:opacity-0"
          @click="removeAttack(2)"
          :disabled="!battleCards[2]"
        >
          <DoubleDown />
        </button>
      </div>
    </div>

    <div class="flex flex-col justify-start">
      <CardPlaceholder
        :card-type="CardTypes.Attack"
        @click="equipCard"
        :class="{ 'hover:ring': !battleCards[3] && canEquipBattleCards }"
      >
        <Transition name="slide" mode="out-in">
          <Card :card="battleCards[3]" v-if="!!battleCards[3]" />
        </Transition>
      </CardPlaceholder>
      <div class="flex justify-center">
        <button
          class="py-1 px-4 bg-red-600 opacity-50 rounded-lg rounded-t-none drop-shadow-lg transition-all hover:opacity-100 disabled:opacity-0"
          @click="removeAttack(3)"
          :disabled="!battleCards[3]"
        >
          <DoubleDown />
        </button>
      </div>
    </div>
  </div>
</template>
