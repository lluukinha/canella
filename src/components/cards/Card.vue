<script setup lang="ts">
import { PropType } from 'vue';
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
} from '../../scripts/main';
import AttackCardAttributes from './attributes/AttackCardAttributes.vue';
import HeroCardAttributes from './attributes/HeroCardAttributes.vue';
import WeaponCardAttributes from './attributes/WeaponCardAttributes.vue';

defineProps({
  card: {
    type: Object as PropType<
      ICard | IHeroCard | IMonsterCard | IAttackCard | IWeaponCard
    >,
    required: true,
  },
});
</script>

<template>
  <div>
    <div
      class="flex flex-col gap-2 bg-slate-800 p-5 rounded ring w-60 h-72 text-white select-none relative"
    >
      <div class="absolute top-3 right-3 px-4 bg-blue-500 rounded shadow">
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
  </div>
</template>
