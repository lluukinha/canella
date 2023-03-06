<script setup lang="ts">
import { allCards, ICard, CardTypes } from "../../../scripts/main";
import Card from "../../cards/Card.vue";
import { playerStore } from "../../../scripts/store";
import { computed } from "vue";
import CardsGroup from "./CardsGroup.vue";

const cardIds = computed(() => playerStore.value.cards.map((c) => c.id));

const allCanellaCards = computed(() => {
  const playerHeroCardIds: number[] = [];
  const playerWeaponCardIds: number[] = [];
  const playerAttackCardIds: number[] = [];
  const playerMonsterCardIds: number[] = playerStore.value.monsters.seen;

  const { hero, weapon, attacks } = playerStore.value.equipedCards;

  if (!!hero) playerHeroCardIds.push(hero.id);
  const heroCardIds = playerStore.value.cards
    .filter((c) => c.type === CardTypes.Hero)
    .map((c) => c.id);
  playerHeroCardIds.push(...heroCardIds);

  if (!!weapon) playerWeaponCardIds.push(weapon.id);
  const weaponCardIds = playerStore.value.cards
    .filter((c) => c.type === CardTypes.Weapon)
    .map((c) => c.id);
  playerWeaponCardIds.push(...weaponCardIds);

  if (attacks.length > 0) playerAttackCardIds.push(...attacks.map((c) => c.id));
  const attackCardsIds = playerStore.value.cards
    .filter((c) => c.type === CardTypes.Attack)
    .map((c) => c.id);
  playerAttackCardIds.push(...attackCardsIds);

  return [
    {
      title: "Heroes",
      cardType: CardTypes.Hero,
      cards: allCards.filter((c) => c.type === CardTypes.Hero),
      visibleIds: playerHeroCardIds,
    },
    {
      title: "Weapons",
      cardType: CardTypes.Weapon,
      cards: allCards.filter((c) => c.type === CardTypes.Weapon),
      visibleIds: playerWeaponCardIds,
    },
    {
      title: "Attacks",
      cardType: CardTypes.Attack,
      cards: allCards.filter((c) => c.type === CardTypes.Attack),
      visibleIds: playerAttackCardIds,
    },
    {
      title: "Monsters",
      cardType: CardTypes.Monster,
      cards: allCards.filter((c) => c.type === CardTypes.Monster),
      visibleIds: playerMonsterCardIds,
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
      :card-type="cardsConfig.cardType"
      v-for="cardsConfig in allCanellaCards"
    />
  </div>
</template>
