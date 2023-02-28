<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { monsterCards } from "../scripts/main";
import HpBar from "./battle/HpBar.vue";
import FinalDetails from "./battle/FinalDetails.vue";
import { playerStore } from "../scripts/store";

import BattleAttackCard from "./battle/BattleAttackCard.vue";
import BattleHeroCard from "./battle/BattleHeroCard.vue";
import BattleMonsterCard from "./battle/BattleMonsterCard.vue";

const heroCard = playerStore.value.equipedCards.hero!;
const weaponCard = playerStore.value.equipedCards.weapon!;
const heroAttackCards = playerStore.value.equipedCards.attacks;

const monsterCard = monsterCards[0];
const counter = 100;
const showDamage = ref<boolean>(false);
const currentDamage = ref<number>(0);
const turnCounter = ref<number>(counter);
const myTurn = ref<boolean>(true);
const canAttack = ref<boolean>(true);
const canUseItems = ref<boolean>(true);
const showTurnMessage = ref<boolean>(false);
const showTurnTip = ref<boolean>(false);
const showFailed = ref<boolean>(false);
const gameOver = ref<boolean>(false);
const enemyHp = ref<number>(monsterCard.attributes.healthPoints);
const heroHp = ref<number>(heroCard.attributes.healthPoints);

const restartGame = () => {
  gameOver.value = false;
  setTimeout(() => {
    turnCounter.value = counter;
    myTurn.value = true;
    canAttack.value = true;
    canUseItems.value = true;
    showTurnMessage.value = true;
    enemyHp.value = monsterCard.attributes.healthPoints;
    heroHp.value = heroCard.attributes.healthPoints;
    showMessage();
  }, 1200);
};

const attack = (damage: number) => {
  if (!canAttack.value || gameOver.value) return;

  if (damage === 0) {
    showFailedMessage();
    canAttack.value = false;
    if (suppliesBlocked.value) setTimeout(endTurn, 800);
    return;
  }

  currentDamage.value = damage;
  showDamage.value = true;
  setTimeout(() => (showDamage.value = false), 800);

  const nextEnemyHp = enemyHp.value - damage;
  enemyHp.value = nextEnemyHp < 0 ? 0 : nextEnemyHp;
  canAttack.value = false;
  setTimeout(checkGameOver, 1200);
  if (suppliesBlocked.value) setTimeout(endTurn, 1200);
};

const showFailedMessage = () => {
  showFailed.value = true;
  setTimeout(() => (showFailed.value = false), 800);
};

const attackHero = () => {
  if (myTurn.value || gameOver.value) return;

  const randomIndex = Math.floor(
    Math.random() * monsterCard.attributes.attackCards.length
  );
  const chosenAttack = monsterCard.attributes.attackCards[randomIndex];

  const successProbability = chosenAttack.attributes.chance / 100;
  if (Math.random() >= successProbability) {
    showFailedMessage();
    return;
  }

  const { min, max } = chosenAttack.attributes;
  const damage = Math.floor(Math.random() * (max - min + 1)) + min;
  const enemyDamage = damage + monsterCard.attributes.attack;

  currentDamage.value = enemyDamage;
  showDamage.value = true;
  setTimeout(() => (showDamage.value = false), 800);

  const nextHeroHp = heroHp.value - enemyDamage;
  heroHp.value = nextHeroHp < 0 ? 0 : nextHeroHp;

  setTimeout(checkGameOver, 1000);
};

const overlayHeight = computed(() =>
  Math.floor((1 - enemyHp.value / monsterCard.attributes.healthPoints) * 100)
);

const overlayHeroHeight = computed(() =>
  Math.floor((1 - heroHp.value / heroCard.attributes.healthPoints) * 100)
);

const turnMessage = computed(() => (myTurn.value ? "YOUR TURN" : "ENEMY TURN"));

const simulateEnemyTurn = async () => {
  setTimeout(attackHero, 1000);
  setTimeout(endTurn, 3000);
};

const endTurn = () => {
  if (gameOver.value) return;

  showTurnTip.value = false;
  turnCounter.value = counter;

  if (myTurn.value) {
    // is my turn
    myTurn.value = false;
    canAttack.value = false;
    canUseItems.value = false;
    simulateEnemyTurn();
  } else {
    // is enemy turn
    myTurn.value = true;
    canAttack.value = true;
    canUseItems.value = true;
  }

  showMessage();
};

const recovery = (qtd: number) => {
  if (suppliesBlocked.value) return;
  const nextHeroHp = heroHp.value + qtd;
  heroHp.value =
    nextHeroHp > heroCard.attributes.healthPoints
      ? heroCard.attributes.healthPoints
      : nextHeroHp;
  canUseItems.value = false;
};

const showMessage = () => {
  showTurnMessage.value = true;
  setTimeout(() => (showTurnMessage.value = false), 800);
  setTimeout(() => (showTurnTip.value = true), 1000);
};

// const suppliesBlocked = computed(
//   () =>
//     !canUseItems.value ||
//     heroHp.value === heroCard.attributes.healthPoints ||
//     gameOver.value
// );
const suppliesBlocked = computed(() => true);

const checkGameOver = () => {
  gameOver.value = enemyHp.value === 0 || heroHp.value === 0;
};

const updateCounter = () => {
  if (!gameOver.value) {
    if (turnCounter.value === 0) endTurn();
    turnCounter.value =
      turnCounter.value === 0 ? counter : turnCounter.value - 1;
  }

  setTimeout(updateCounter, 1000);
};

onMounted(() => {
  showMessage();
  updateCounter();
});

defineEmits(["quit"]);
</script>

<template>
  <div
    class="flex flex-col justify-center select-none bg-yellow-100 w-full h-full text-black relative"
  >
    <Transition name="bounce">
      <FinalDetails
        :enemy="monsterCard"
        :enemyHp="enemyHp"
        @restart="restartGame"
        @quit="$emit('quit')"
        v-if="gameOver"
      />
    </Transition>
    <div class="w-full h-full flex items-center justify-center gap-5 px-5">
      <div class="flex flex-grow justify-center">
        <BattleAttackCard
          v-for="atk in monsterCard.attributes.attackCards"
          :card="atk"
          :baseAttack="monsterCard.attributes.attack"
          :canAttack="false"
          :isFlipped="myTurn"
        />
      </div>
      <div class="hero-card flex flex-col gap-1">
        <HpBar :hp="monsterCard.attributes.healthPoints" :remaining="enemyHp" />
        <div class="card-holder flex relative">
          <BattleMonsterCard :card="monsterCard" />
          <div
            class="absolute w-full h-full text-3xl flex justify-center items-center drop-shadow-2xl text-white animate-ping"
            v-if="showDamage && myTurn"
          >
            -{{ currentDamage }}
          </div>
          <div
            :style="`height: ${overlayHeight}%`"
            class="top-0 absolute w-full h-full bg-black bg-opacity-50 text-white flex justify-center items-center transition-all"
          />
        </div>
      </div>
    </div>
    <div class="w-full h-full flex items-center justify-center gap-5 px-5">
      <div class="hero-card flex flex-col gap-1">
        <HpBar :hp="heroCard.attributes.healthPoints" :remaining="heroHp" />
        <div class="card-holder flex relative">
          <BattleHeroCard :card="heroCard" />
          <div
            class="absolute w-full h-full text-3xl flex justify-center items-center drop-shadow-2xl text-white animate-ping"
            v-if="showDamage && !myTurn"
          >
            -{{ currentDamage }}
          </div>
          <div
            :style="`height: ${overlayHeroHeight}%`"
            class="top-0 absolute w-full h-full bg-black bg-opacity-50 text-white flex justify-center items-center transition-all"
          />
        </div>
      </div>
      <div class="flex flex-grow justify-center">
        <BattleAttackCard
          v-for="atk in heroAttackCards"
          :card="atk"
          :baseAttack="weaponCard.attributes.attack"
          :canAttack="canAttack && myTurn"
          :isFlipped="!myTurn"
          @attack="attack"
        />
      </div>
      <!-- <div
        class="card w-28 h-40 bg-black flex items-center text-center justify-center text-white cursor-pointer transition-all"
        :class="{
          'hover:scale-125': !suppliesBlocked,
          'opacity-50': suppliesBlocked,
        }"
        @click="recovery(5)"
      >
        POTION
      </div> -->
    </div>
    <div class="floating-buttons absolute bottom-5 right-5 flex gap-5">
      <button
        class="py-2 px-4 rounded bg-blue-600 text-white shadow hover:bg-blue-500 disabled:hover:bg-blue-600 disabled:opacity-70"
        :disabled="!myTurn || gameOver"
        @click="endTurn()"
      >
        END TURN
      </button>
      <button
        class="py-2 px-4 rounded bg-blue-600 text-white shadow hover:bg-blue-500 disabled:hover:bg-blue-600 disabled:opacity-70"
        @click="$emit('quit')"
      >
        RUN AWAY
      </button>
    </div>
    <div
      class="text-8xl absolute flex w-full h-full justify-center items-center top-0 drop-shadow-2xl animate-ping"
      v-if="showTurnMessage"
    >
      {{ turnMessage }}
    </div>
    <div
      class="text-8xl absolute flex w-full h-full justify-center items-center top-0 drop-shadow-2xl animate-ping"
      v-if="showFailed"
    >
      FAILED
    </div>
    <div
      class="counter absolute top-5 left-10 text-5xl bg-white p-4 rounded-full w-24 h-24 flex justify-center items-center"
      v-if="myTurn"
    >
      {{ turnCounter }}
      <div
        class="absolute animate-ping text-sm bottom-0"
        v-if="showTurnTip && !gameOver"
      >
        {{ turnMessage }}
      </div>
    </div>
  </div>
</template>

<style>
body {
  overflow: hidden;
}
</style>
