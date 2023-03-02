<script setup lang="ts">
import { computed, ref } from "vue";
import Card from "../../cards/Card.vue";
import { playerStore } from "../../../scripts/store";
import {
  CardTypes,
  ICard,
  IHeroCard,
  IWeaponCard,
} from "../../../scripts/main";
import CardPlaceholder from "../../cards/CardPlaceholder.vue";
import EquipCard from "../EquipCard.vue";
import DoubleDown from "../../icons/DoubleDown.vue";

const cardTypetoInclude = ref<CardTypes | null>(null);

const heroCard = computed(
  (): IHeroCard | null => playerStore.value.equipedCards.hero
);
const weaponCard = computed(
  (): IWeaponCard | null => playerStore.value.equipedCards.weapon
);

const removeHero = () => {
  const heroCard = playerStore.value.equipedCards.hero as ICard;
  playerStore.value.cards.push(heroCard);
  playerStore.value.equipedCards.hero = null;
};

const removeWeapon = () => {
  const weaponCard = playerStore.value.equipedCards.weapon as ICard;
  playerStore.value.cards.push(weaponCard);
  playerStore.value.equipedCards.weapon = null;
};

const equipCard = (cardType: CardTypes) => {
  if (cardType === CardTypes.Hero && !!heroCard.value) return;
  if (cardType === CardTypes.Weapon && !!weaponCard.value) return;
  cardTypetoInclude.value = cardType;
};

const removeCardFromDeck = (cardId: number) => {
  const index = playerStore.value.cards.findIndex((c) => c.id === cardId);
  if (index > -1) playerStore.value.cards.splice(index, 1);
};

const confirmEquip = async (card: ICard) => {
  cardTypetoInclude.value = null;
  removeCardFromDeck(card.id);
  if (card.type === CardTypes.Hero)
    playerStore.value.equipedCards.hero = card as IHeroCard;
  if (card.type === CardTypes.Weapon)
    playerStore.value.equipedCards.weapon = card as IWeaponCard;

  const { hero, weapon } = playerStore.value.equipedCards;
  if (card.type === CardTypes.Hero && !!weapon) {
    const heroCanUseEquipedWeapon = (
      card as IHeroCard
    ).attributes.weaponTypes.includes(weapon.attributes.type);
    if (!heroCanUseEquipedWeapon) removeWeapon();
  }

  if (card.type === CardTypes.Weapon && !!hero) {
    const weaponCanBeUsedByEquipedHero = hero.attributes.weaponTypes.includes(
      (card as IWeaponCard).attributes.type
    );
    if (!weaponCanBeUsedByEquipedHero) removeHero();
  }
};
</script>

<template>
  <div class="w-full">
    <Transition name="fade">
      <EquipCard
        :cardType="cardTypetoInclude"
        v-if="cardTypetoInclude"
        @confirm="confirmEquip"
      />
    </Transition>
    <div class="flex justify-between p-5">
      <div>content</div>
      <div class="flex gap-2">
        <div class="flex flex-col justify-start">
          <CardPlaceholder
            :card-type="CardTypes.Hero"
            @click="equipCard(CardTypes.Hero)"
            :class="{ 'hover:ring': !heroCard }"
          >
            <Transition name="slide" mode="out-in">
              <Card :card="heroCard" v-if="heroCard" />
            </Transition>
          </CardPlaceholder>
          <div class="flex justify-center" v-if="heroCard">
            <button
              class="py-1 px-4 bg-red-600 opacity-50 rounded-lg rounded-t-none drop-shadow-lg transition-all hover:opacity-100 hover:py-3"
              @click="removeHero"
            >
              <DoubleDown />
            </button>
          </div>
        </div>
        <div class="flex flex-col justify-start">
          <CardPlaceholder
            :card-type="CardTypes.Weapon"
            @click="equipCard(CardTypes.Weapon)"
            :class="{ 'hover:ring': !weaponCard }"
          >
            <Transition name="slide" mode="out-in">
              <Card :card="weaponCard" v-if="weaponCard" />
            </Transition>
          </CardPlaceholder>
          <div class="flex justify-center" v-if="weaponCard">
            <button
              class="py-1 px-4 bg-red-600 opacity-50 rounded-lg rounded-t-none drop-shadow-lg transition-all hover:opacity-100 hover:py-3"
              @click="removeWeapon"
            >
              <DoubleDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
