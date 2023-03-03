<script setup lang="ts">
import { computed, PropType } from 'vue';
import {
  IHeroCard,
  IAttackCard,
  IMonsterCard,
  IWeaponCard,
  CardTypes,
  ICard,
  IHeroCardAttributes,
  IWeaponCardAttributes,
  IAttackCardAttributes,
  IMonsterCardAttributes,
} from '../../scripts/main';
import AttackCardAttributes from './attributes/AttackCardAttributes.vue';
import HeroCardAttributes from './attributes/HeroCardAttributes.vue';
import MonsterCardAttributes from './attributes/MonsterCardAttributes.vue';
import WeaponCardAttributes from './attributes/WeaponCardAttributes.vue';

const cardImageUrl = computed(() => {
  const card = props.card.image.length > 0 ? props.card.image : 'empty.jpg';
  return new URL(`../../assets/cards/${card}`, import.meta.url).href;
});

const props = defineProps({
  card: {
    type: Object as PropType<
      ICard | IHeroCard | IMonsterCard | IAttackCard | IWeaponCard
    >,
    required: true,
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
    default: 'large',
  },
  canFlip: {
    type: Boolean,
    required: false,
  },
  flipOnHover: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>

<template>
  <div
    class="flip-card w-64 h-96"
    :class="{ 'flip-card-on-hover': flipOnHover }"
  >
    <div class="flip-card-inner transition-all" :class="{ flip: !canFlip }">
      <div
        class="flip-card-front bg-gradient-to-t rounded-xl shadow-lg py-2 px-5 border-4 flex flex-col gap-2"
        :class="{
          'from-blue-700 to-gray-900 border-blue-900':
            card.type === CardTypes.Hero,
          'from-red-700 to-gray-900 border-red-900':
            card.type === CardTypes.Attack,
          'from-yellow-300 to-gray-900 border-yellow-300':
            card.type === CardTypes.Weapon,
          'from-green-500 to-gray-900 border-green-700':
            card.type === CardTypes.Monster,
        }"
      >
        <div class="top flex justify-between items-center font-bold">
          #{{ card.id }}
          <span class="uppercase">{{ card.type }}</span>
        </div>
        <div
          class="image border border-gray-700 rounded w-52 h-52 bg-gray-800 flex justify-center items-center relative bg-cover bg-center"
          :style="`background-image: url(${cardImageUrl})`"
        >
          <div
            class="flex flex-wrap gap-x-1 gap-y-1 bottom-1 justify-center absolute"
          >
            <template v-if="card.type === CardTypes.Attack">
              <span
                v-for="weapon in (card.attributes as IAttackCardAttributes).weaponTypes"
                class="text-xs px-2 rounded bg-yellow-400 bg-opacity-30 font-bold uppercase shadow"
              >
                {{ weapon }}
              </span>
            </template>
            <template v-else-if="card.type === CardTypes.Weapon">
              <span
                v-for="atk in (card.attributes as IWeaponCardAttributes).attackTypes"
                class="text-xs px-2 rounded bg-gray-900 bg-opacity-30 font-bold uppercase shadow"
              >
                {{ atk }}
              </span>
            </template>
          </div>
        </div>
        <div>
          <div
            class="name w-52 px-2 py-1 flex justify-center items-center border rounded-md rounded-b-none bg-gray-600 border-gray-700 uppercase"
          >
            {{ card.name }}
          </div>
          <div
            class="description border rounded-md rounded-t-none mt-1 h-20 border-gray-700 bg-gradient-to-b from-gray-600 to-gray-300 px-2 py-1 flex justify-center items-center"
          >
            <HeroCardAttributes
              :attributes="card.attributes as IHeroCardAttributes"
              v-if="card.type === CardTypes.Hero"
            />
            <WeaponCardAttributes
              :attributes="card.attributes as IWeaponCardAttributes"
              v-if="card.type === CardTypes.Weapon"
            />
            <AttackCardAttributes
              :attributes="card.attributes as IAttackCardAttributes"
              v-if="card.type === CardTypes.Attack"
            />
            <MonsterCardAttributes
              :attributes="card.attributes as IMonsterCardAttributes"
              v-if="card.type === CardTypes.Monster"
            />
          </div>
        </div>
      </div>
      <div
        class="flip-card-back bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border-4 flex justify-center items-center text-gray-700 font-extrabold"
        :class="{
          'border-blue-900': card.type === CardTypes.Hero,
          'border-red-900': card.type === CardTypes.Attack,
          'border-yellow-300': card.type === CardTypes.Weapon,
          'border-green-700': card.type === CardTypes.Monster,
        }"
      >
        CANELLA
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card-on-hover:hover > .flip-card-inner:not(.flip),
.flip {
  transform: rotateY(180deg);
}
</style>
