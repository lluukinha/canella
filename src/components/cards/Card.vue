<script setup lang="ts">
import { PropType } from "vue";
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
} from "../../scripts/main";
import AttackCardAttributes from "./attributes/AttackCardAttributes.vue";
import HeroCardAttributes from "./attributes/HeroCardAttributes.vue";
import WeaponCardAttributes from "./attributes/WeaponCardAttributes.vue";

defineProps({
  card: {
    type: Object as PropType<
      ICard | IHeroCard | IMonsterCard | IAttackCard | IWeaponCard
    >,
    required: true,
  },
  size: {
    type: String as PropType<"small" | "medium" | "large">,
    required: false,
    default: "large",
  },
  canFlip: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <div class="flip-card w-64 h-96">
    <div class="flip-card-inner transition-all" :class="{ flip: !canFlip }">
      <div
        class="flip-card-front bg-gradient-to-t rounded-xl shadow-lg py-2 px-5 border-4 flex flex-col gap-2"
        :class="{
          'from-blue-700 to-gray-900 border-blue-900': card.type === CardTypes.Hero,
          'from-red-700 to-gray-900 border-red-900': card.type === CardTypes.Attack,
          'from-yellow-300 to-gray-900 border-yellow-300': card.type === CardTypes.Weapon,
        }"
      >
        <div class="top flex justify-between items-center font-bold">
          #{{ card.id }}
          <span class="uppercase">{{ card.type }}</span>
        </div>
        <div class="image border border-gray-700 rounded w-52 h-52 bg-gray-800">
          <component :is="card.component" v-if="card.component" />
        </div>
        <div>
          <div
            class="name w-52 px-2 py-1 flex justify-between border rounded-md rounded-b-none bg-gray-600 border-gray-700 uppercase"
          >
            {{ card.name }}
            <span class="px-2 bg-gray-900 shadow rounded flex justify-center items-center font-bold text-xs">{{ card.attributes.attackType }}</span>
          </div>
          <div
            class="description border rounded-md rounded-t-none mt-1 h-20 border-gray-700 bg-gradient-to-b from-gray-600 to-gray-300 px-2 py-1"
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
          </div>
        </div>
      </div>
      <div
        class="flip-card-back bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border-4 border-blue-900 flex justify-center items-center text-gray-700 font-extrabold"
      >
        CANELLA
      </div>
    </div>
  </div>
  <!-- <div>
    <div
      class="flex flex-col gap-2 bg-gradient-to-br from-amber-100 to-green-500 p-5 rounded ring text-white select-none relative"
      :class="{
        'w-60 h-72' : size === 'large',
        'w-40 h-52' : size === 'medium',
        'ring-blue-600' : card.type === CardTypes.Hero,
        'ring-yellow-400' : card.type === CardTypes.Weapon,
        'ring-red-600' : card.type === CardTypes.Attack
      }"
    >
      <div class="absolute top-3 right-3 px-4 rounded shadow" :class="{
        'bg-blue-600' : card.type === CardTypes.Hero,
        'bg-yellow-400' : card.type === CardTypes.Weapon,
        'bg-red-600' : card.type === CardTypes.Attack
      }">
        {{ card.type }}
      </div>

      <component v-if="card.component" :is="card.component"></component>
      <div>
        <h2 class="text-sm font-semibold">Name</h2>
        <span class="text-md">{{ card.name }}</span>
      </div>
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
    </div>
  </div> -->
</template>

<style scoped>
.flip-card {
  background-color: transparent;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  position: relative;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover > .flip-card-inner:not(.flip),
.flip {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the back side */
.flip-card-front {
  transform: rotateY(180deg);
}
</style>
