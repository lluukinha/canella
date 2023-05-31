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
import StarIcon from '../icons/StarIcon.vue';
import AttackCardAttributes from './attributes/AttackCardAttributes.vue';
import HeroCardAttributes from './attributes/HeroCardAttributes.vue';
import MonsterCardAttributes from './attributes/MonsterCardAttributes.vue';
import WeaponCardAttributes from './attributes/WeaponCardAttributes.vue';
import CardBackSide from './CardBackSide.vue';
import {
  findCardKey,
  IHeroExperienceInfo,
  playerStore,
} from '../../scripts/store';

const cardImageUrl = computed(() => {
  const card = props.card.image.length > 0 ? props.card.image : 'empty.jpg';
  return `../assets/cards/${card}`;
});

const props = defineProps({
  card: {
    type: Object as PropType<
      ICard | IHeroCard | IMonsterCard | IAttackCard | IWeaponCard
    >,
    required: true,
  },
  hideFront: {
    type: Boolean,
    required: false,
  },
  flipOnHover: {
    type: Boolean,
    required: false,
    default: true,
  },
  hideContent: {
    type: Boolean,
    default: false,
  },
  showFullAttack: {
    type: Boolean,
    required: false,
  },
});

const heroCardInfo = computed<IHeroExperienceInfo | null>(() => {
  if (props.card.type === CardTypes.Hero) {
    const key = findCardKey(props.card);
    return playerStore.value.experience[key] || null;
  }
  return null;
});

const frontSideClasses = computed(() => ({
  'from-blue-700 to-gray-900 border-blue-900':
    props.card.type === CardTypes.Hero,
  'from-red-700 to-gray-900 border-red-900':
    props.card.type === CardTypes.Attack,
  'from-yellow-300 to-gray-900 border-yellow-300':
    props.card.type === CardTypes.Weapon,
  'from-green-500 to-gray-900 border-green-700':
    props.card.type === CardTypes.Monster,
}));

const backSideClasses = computed(() => ({
  'border-blue-900': props.card.type === CardTypes.Hero,
  'border-red-900': props.card.type === CardTypes.Attack,
  'border-yellow-300': props.card.type === CardTypes.Weapon,
  'border-green-700': props.card.type === CardTypes.Monster,
}));
</script>

<template>
  <div
    class="flip-card w-64 h-96"
    :class="{ 'flip-card-on-hover': flipOnHover }"
  >
    <div class="flip-card-inner transition-all" :class="{ flip: !hideFront }">
      <div
        class="flip-card-front bg-gradient-to-t rounded-xl shadow-lg py-2 px-5 border-4 flex flex-col gap-2"
        :class="frontSideClasses"
      >
        <template v-if="!hideContent">
          <div class="top flex justify-between items-center font-bold">
            #{{ card.id }}
            <span class="uppercase">{{ card.type }}</span>
          </div>
          <div
            class="image border border-gray-700 rounded w-52 h-52 bg-gray-800 flex justify-center items-center relative bg-cover bg-center"
            :style="`background-image: url(${cardImageUrl})`"
          >
            <div
              class="flex items-center gap-1 absolute top-1 right-1 bg-gray-800 px-2 rounded drop-shadow text-sm"
              v-if="card.type === CardTypes.Weapon"
            >
              {{ (card.attributes as IWeaponCardAttributes).type }}
            </div>
            <div
              class="flex items-center absolute top-1 justify-between w-full"
              v-if="card.type === CardTypes.Hero && !!heroCardInfo"
            >
              <div
                class="flex gap-1 items-center ml-1 bg-gray-800 px-1 rounded"
              >
                <StarIcon class="w-4 h-4 text-yellow-300" />
                <span class="text-md font-bold uppercase">
                  {{ heroCardInfo.level }}
                </span>
              </div>
              <div class="mr-1 text-sm bg-gray-800 px-2 rounded drop-shadow">
                {{ (card.attributes as IHeroCardAttributes).type }}
              </div>
            </div>
            <div
              class="flex flex-wrap gap-x-1 gap-y-1 bottom-1 justify-center absolute"
            >
              <template
                v-if="[CardTypes.Attack, CardTypes.Hero].includes(card.type)"
              >
                <span
                  v-for="weapon in (card.attributes as IAttackCardAttributes).weaponTypes"
                  class="text-xs px-2 rounded bg-yellow-800 font-bold uppercase shadow"
                >
                  {{ weapon }}
                </span>
              </template>
              <template v-else-if="card.type === CardTypes.Weapon">
                <span
                  v-for="atk in (card.attributes as IWeaponCardAttributes).attackTypes"
                  class="text-xs px-2 rounded bg-gray-900 font-bold uppercase shadow"
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
                :expInfo="heroCardInfo"
                v-if="card.type === CardTypes.Hero"
              />
              <WeaponCardAttributes
                :attributes="card.attributes as IWeaponCardAttributes"
                v-if="card.type === CardTypes.Weapon"
              />
              <AttackCardAttributes
                :attributes="card.attributes as IAttackCardAttributes"
                :showFullAttack="showFullAttack"
                v-if="card.type === CardTypes.Attack"
              />
              <MonsterCardAttributes
                :attributes="card.attributes as IMonsterCardAttributes"
                v-if="card.type === CardTypes.Monster"
              />
            </div>
          </div>
        </template>
      </div>
      <CardBackSide :class="backSideClasses" />
    </div>
  </div>
</template>
