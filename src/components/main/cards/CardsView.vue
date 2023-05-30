<script setup lang="ts">
import {
  CardTypes,
  attackCards,
  heroCards,
  monsterCards,
  weaponCards,
} from '../../../scripts/main';
import {
  playerStore,
  toAttackCard,
  toHeroCard,
  toMonsterCard,
  toWeaponCard,
} from '../../../scripts/store';
import { computed } from 'vue';
import CardsGroup from './CardsGroup.vue';

const allCanellaCards = computed(() => {
  const playerHeroCardIds: number[] = [];
  const playerWeaponCardIds: number[] = [];
  const playerAttackCardIds: number[] = [];

  const { hero, weapon, attacks } = playerStore.value.equipedCards;

  if (!!hero) playerHeroCardIds.push(toHeroCard(hero).id);
  const heroCardIds = playerStore.value.cards.heroes
    .map(toHeroCard)
    .map((c) => c.id);
  playerHeroCardIds.push(...heroCardIds);

  if (!!weapon) playerWeaponCardIds.push(toWeaponCard(weapon).id);
  const weaponCardIds = playerStore.value.cards.weapons
    .map(toWeaponCard)
    .map((c) => c.id);
  playerWeaponCardIds.push(...weaponCardIds);

  if (attacks.length > 0)
    playerAttackCardIds.push(...attacks.map(toAttackCard).map((c) => c.id));
  const attackCardsIds = playerStore.value.cards.attacks
    .map(toAttackCard)
    .map((c) => c.id);
  playerAttackCardIds.push(...attackCardsIds);

  return [
    {
      title: 'Heroes',
      cardType: CardTypes.Hero,
      cards: Object.values(heroCards),
      visibleIds: playerHeroCardIds,
      flippableIds: playerHeroCardIds,
    },
    {
      title: 'Weapons',
      cardType: CardTypes.Weapon,
      cards: Object.values(weaponCards),
      visibleIds: playerWeaponCardIds,
      flippableIds: playerWeaponCardIds,
    },
    {
      title: 'Attacks',
      cardType: CardTypes.Attack,
      cards: Object.values(attackCards),
      visibleIds: playerAttackCardIds,
      flippableIds: playerAttackCardIds,
    },
    {
      title: 'Monsters',
      cardType: CardTypes.Monster,
      cards: Object.values(monsterCards),
      visibleIds: playerStore.value.monsters.won
        .map(toMonsterCard)
        .map((c) => c.id),
      flippableIds: playerStore.value.monsters.seen
        .map(toMonsterCard)
        .map((c) => c.id),
    },
  ];
});
</script>

<template>
  <div
    class="w-full h-full relative custom-scrollbar overflow-y-auto p-5 flex flex-col gap-y-5"
  >
    <CardsGroup
      :cards="cardsConfig.cards"
      :title="cardsConfig.title"
      :visible-ids="cardsConfig.visibleIds"
      :flippable-ids="cardsConfig.flippableIds"
      :card-type="cardsConfig.cardType"
      v-for="cardsConfig in allCanellaCards"
    />
  </div>
</template>
