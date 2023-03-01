<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {
  calculateAverage,
  delay,
  monsterCards,
  successProbability,
} from '../scripts/main';
import HpBar from './battle/HpBar.vue';
import FinalDetails from './battle/FinalDetails.vue';
import { playerStore } from '../scripts/store';

import BattleAttackCard from './battle/BattleAttackCard.vue';
import BattleHeroCard from './battle/BattleHeroCard.vue';
import BattleMonsterCard from './battle/BattleMonsterCard.vue';
import EmptyAttackCardSpace from './battle/EmptyAttackCardSpace.vue';
import Card from './cards/Card.vue';
import BattleWeaponCard from './battle/BattleWeaponCard.vue';

const heroCard = playerStore.value.equipedCards.hero!;
const weaponCard = playerStore.value.equipedCards.weapon!;
const heroAttackCards = playerStore.value.equipedCards.attacks;

const isShowingMosterCard = ref(false);
const battleStarted = ref(false);
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

const attack = async (damage: number) => {
  if (!canAttack.value || gameOver.value) return;

  if (damage === 0) {
    showFailedMessage();
    canAttack.value = false;

    // if (suppliesBlocked.value) setTimeout(endTurn, 800);
    await delay(0.8);
    endTurn();
    return;
  }

  currentDamage.value = damage;
  showDamage.value = true;
  const nextEnemyHp = enemyHp.value - damage;
  enemyHp.value = nextEnemyHp < 0 ? 0 : nextEnemyHp;

  await delay(0.8);
  showDamage.value = false;

  canAttack.value = false;
  await delay(0.4);
  checkGameOver();

  endTurn();
  // if (suppliesBlocked.value) setTimeout(endTurn, 1200);
};

const showFailedMessage = async () => {
  showFailed.value = true;
  await delay(0.8);
  showFailed.value = false;
};

const attackHero = async () => {
  if (myTurn.value || gameOver.value) return;

  const randomIndex = Math.floor(
    Math.random() * monsterCard.attributes.attackCards.length
  );
  const chosenAttack = monsterCard.attributes.attackCards[randomIndex];

  if (successProbability(chosenAttack.attributes.chance)) {
    showFailedMessage();
    return;
  }

  const { min, max } = chosenAttack.attributes;
  const damage = calculateAverage(min, max);
  const enemyDamage = damage + monsterCard.attributes.attack;

  currentDamage.value = enemyDamage;
  showDamage.value = true;
  const nextHeroHp = heroHp.value - enemyDamage;
  heroHp.value = nextHeroHp < 0 ? 0 : nextHeroHp;

  await delay(0.8);
  showDamage.value = false;

  await delay(0.2);
  checkGameOver();
};

const overlayHeight = computed(() =>
  Math.floor((1 - enemyHp.value / monsterCard.attributes.healthPoints) * 100)
);

const overlayHeroHeight = computed(() =>
  Math.floor((1 - heroHp.value / heroCard.attributes.healthPoints) * 100)
);

const turnMessage = computed(() => (myTurn.value ? 'YOUR TURN' : 'ENEMY TURN'));

const simulateEnemyTurn = async () => {
  await delay(1);
  attackHero();

  await delay(1);
  endTurn();
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

// const recovery = (qtd: number) => {
//   if (suppliesBlocked.value) return;
//   const nextHeroHp = heroHp.value + qtd;
//   heroHp.value =
//     nextHeroHp > heroCard.attributes.healthPoints
//       ? heroCard.attributes.healthPoints
//       : nextHeroHp;
//   canUseItems.value = false;
// };

const showMessage = async () => {
  showTurnMessage.value = true;

  await delay(0.8);
  showTurnMessage.value = false;

  await delay(0.2);
  showTurnTip.value = true;
};

// const suppliesBlocked = computed(
//   () =>
//     !canUseItems.value ||
//     heroHp.value === heroCard.attributes.healthPoints ||
//     gameOver.value
// );
// const suppliesBlocked = computed(() => true);

const checkGameOver = () => {
  gameOver.value = enemyHp.value === 0 || heroHp.value === 0;
};

const updateCounter = async () => {
  if (!gameOver.value) {
    if (turnCounter.value === 0) endTurn();
    turnCounter.value =
      turnCounter.value === 0 ? counter : turnCounter.value - 1;
  }

  await delay(1);
  updateCounter();
};

const startBattle = async () => {
  await delay(1.2);
  isShowingMosterCard.value = true;

  await delay(2.3);
  battleStarted.value = true;

  await delay(1);
  showMessage();
  updateCounter();
};

onMounted(startBattle);

defineEmits(['quit']);
</script>

<template>
  <div class="select-none bg-yellow-100 w-full h-full text-black relative">
    <Transition name="fade" mode="out-in">
      <div
        class="bg-black bg-opacity-70 w-full h-full z-50 flex justify-center items-center text-white gap-20"
        v-if="!battleStarted"
      >
        <Card :card="heroCard" />
        <div class="flex justify-center text-5xl">VS</div>
        <Card
          :card="monsterCard"
          :can-flip="!isShowingMosterCard"
          :flip-on-hover="false"
        />
      </div>
      <div
        class="flex flex-col justify-center bg-yellow-100 w-full h-full text-black"
        v-else
      >
        <Transition name="bounce">
          <FinalDetails
            :enemy="monsterCard"
            :enemyHp="enemyHp"
            @continue="$emit('quit')"
            v-if="gameOver"
          />
        </Transition>
        <div class="w-full h-full flex items-center justify-center gap-5 px-5">
          <div class="flex flex-grow justify-center gap-2">
            <EmptyAttackCardSpace
              v-for="_ in 4 - monsterCard.attributes.attackCards.length"
            />
            <BattleAttackCard
              v-for="atk in monsterCard.attributes.attackCards"
              :card="atk"
              :baseAttack="monsterCard.attributes.attack"
              :canAttack="false"
              :isFlipped="myTurn"
            />
          </div>
          <div class="hero-card flex flex-col gap-1">
            <HpBar
              :hp="monsterCard.attributes.healthPoints"
              :remaining="enemyHp"
            />
            <div class="card-holder flex relative">
              <BattleMonsterCard :card="monsterCard" />
              <div
                class="absolute w-full h-full text-5xl flex justify-center items-center drop-shadow-2xl text-white animate-ping"
                v-if="showDamage && myTurn"
              >
                -{{ currentDamage }}
              </div>
              <div
                :style="`height: ${overlayHeight}%`"
                class="top-0 absolute w-full h-full bg-black bg-opacity-50 text-white flex justify-center items-center rounded-lg transition-all"
              />
            </div>
          </div>
        </div>
        <div class="w-full h-full flex items-center justify-center gap-2 px-5">
          <div class="hero-card flex flex-col gap-1">
            <HpBar :hp="heroCard.attributes.healthPoints" :remaining="heroHp" />
            <div class="card-holder flex relative">
              <BattleHeroCard :card="heroCard" />
              <div
                class="absolute w-full h-full text-5xl flex justify-center items-center drop-shadow-2xl text-white animate-ping"
                v-if="showDamage && !myTurn"
              >
                -{{ currentDamage }}
              </div>
              <div
                :style="`height: ${overlayHeroHeight}%`"
                class="top-0 absolute w-full h-full bg-black bg-opacity-50 text-white flex justify-center items-center transition-all rounded-lg"
              />
            </div>
          </div>
          <BattleWeaponCard :card="weaponCard" />
          <div class="flex flex-grow justify-center gap-2">
            <BattleAttackCard
              v-for="atk in heroAttackCards"
              :card="atk"
              :baseAttack="weaponCard.attributes.attack"
              :canAttack="canAttack && myTurn"
              :isFlipped="!myTurn"
              @attack="attack"
              :class="{ 'opacity-50': !canAttack && myTurn }"
            />
            <EmptyAttackCardSpace v-for="_ in 4 - heroAttackCards.length" />
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
    </Transition>
  </div>
</template>

<style scoped>
.monster-card-battle {
  position: initial;
  top: 1;
  right: 1;
  transform: inherit;
  z-index: 1;
  transition: all 1s ease;
}

.suspense-monster-card {
  position: fixed;
  top: 30%;
  right: 50%;
  transform: scale(200%);
  z-index: 999;
}
</style>
