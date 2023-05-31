<script setup lang="ts">
import { computed, onMounted, PropType, ref } from 'vue';
import {
  delay,
  IAttackCard,
  IBattleData,
  successProbability,
  heroCards,
  weaponCards,
} from '../scripts/main';
import HpBar from './battle/HpBar.vue';
import FinalDetails from './battle/FinalDetails.vue';
import {
  calculateAttack,
  playerStore,
  seeMonster,
  toAttackCard,
  toMonsterCard,
  toMonsterAttackCard,
  IHeroExperienceInfo,
  findCardKey,
} from '../scripts/store';

import BattleAttackCard from './battle/BattleAttackCard.vue';
import BattleHeroCard from './battle/BattleHeroCard.vue';
import BattleMonsterCard from './battle/BattleMonsterCard.vue';
import EmptyAttackCardSpace from './battle/EmptyAttackCardSpace.vue';
import Card from './cards/Card.vue';
import BattleWeaponCard from './battle/BattleWeaponCard.vue';
import { IMonsterCard } from '../scripts/main';

const heroCard = heroCards[playerStore.value.equipedCards.hero!];
const weaponCard = weaponCards[playerStore.value.equipedCards.weapon!];
const heroAttackCards =
  playerStore.value.equipedCards.attacks.map(toAttackCard);

const heroExpInfo = computed<IHeroExperienceInfo>(
  () => playerStore.value.experience[playerStore.value.equipedCards.hero!]
);

const isShowingMosterCard = ref(false);
const battleStarted = ref(false);
const counter = 100;
const showDamage = ref<boolean>(false);
const currentDamage = ref<number>(0);
const turnCounter = ref<number>(counter);
const myTurn = ref<boolean>(false);
const canAttack = ref<boolean>(false);
const canUseItems = ref<boolean>(false);
const showTurnMessage = ref<boolean>(false);
const showTurnTip = ref<boolean>(false);
const showFailed = ref<boolean>(false);
const gameOver = ref<boolean>(false);
const enemyHp = ref<number>(99999);
const heroHp = ref<number>(heroExpInfo.value.healthPoints);
const showBattleDetails = ref<boolean>(false);
const enemyChosenCard = ref<IAttackCard>();

const attack = async ({
  min,
  max,
  chance,
}: {
  min: number;
  max: number;
  chance: number;
}) => {
  if (!canAttack.value || gameOver.value || !enemyHp.value) return;
  canAttack.value = false;

  if (!successProbability(chance)) {
    await showFailedMessage();
    canAttack.value = false;
    await delay(0.8);
    endTurn();
    return;
  }

  const damage = calculateAttack(
    min,
    max,
    weaponCard.attributes.attack,
    heroExpInfo.value.attack
  );

  currentDamage.value = damage;
  showDamage.value = true;
  const nextEnemyHp = enemyHp.value - damage;
  enemyHp.value = nextEnemyHp < 0 ? 0 : nextEnemyHp;

  await delay(0.8);
  showDamage.value = false;

  await delay(0.4);
  checkGameOver();

  endTurn();
};

const showFailedMessage = async () => {
  showFailed.value = true;
  await delay(0.8);
  showFailed.value = false;
};

const attackHero = async () => {
  if (myTurn.value || gameOver.value) return;

  const chosenAttack = enemyChosenCard.value!;

  if (!successProbability(chosenAttack.attributes.chance)) {
    await showFailedMessage();
    return;
  }

  const { min, max } = chosenAttack.attributes;
  const damage = calculateAttack(
    min,
    max,
    5,
    monsterCard.value.attributes.attack
  );

  currentDamage.value = damage;
  showDamage.value = true;
  const nextHeroHp = heroHp.value - damage;
  heroHp.value = nextHeroHp < 0 ? 0 : nextHeroHp;

  await delay(0.8);
  showDamage.value = false;

  await delay(0.2);
  checkGameOver();
};

const turnMessage = computed(() => (myTurn.value ? 'YOUR TURN' : 'ENEMY TURN'));

const simulateEnemyTurn = async () => {
  const randomIndex = Math.floor(Math.random() * enemyAttackCards.value.length);

  await delay(1);
  enemyChosenCard.value = enemyAttackCards.value[randomIndex];
  await delay(1);
  await attackHero();
  enemyChosenCard.value = undefined;
  endTurn();
};

const endTurn = async () => {
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

const showMessage = async () => {
  showTurnMessage.value = true;

  await delay(0.8);
  showTurnMessage.value = false;

  await delay(0.2);
  showTurnTip.value = true;
};

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

const monsterKey = computed(() => findCardKey(monsterCard.value));
const playerSawMonster = computed(
  () => !!playerStore.value.monsters.seen.find((c) => c === monsterKey.value)
);

const startBattle = async () => {
  enemyHp.value = monsterCard.value.attributes.healthPoints;

  await delay(1.5);
  showBattleDetails.value = true;

  if (!playerSawMonster.value) {
    seeMonster(monsterKey.value);
    await delay(2);
  }

  isShowingMosterCard.value = true;

  await delay(2.3);
  battleStarted.value = true;

  await delay(1);
  showMessage();
  updateCounter();
  myTurn.value = true;
  canAttack.value = true;
};

const escape = () => {
  playerStore.value.escapes -= 1;
  emit('quit');
};

const props = defineProps({
  battleData: {
    type: Object as PropType<IBattleData>,
    required: true,
  },
});

const monsterCard = computed<IMonsterCard>(() =>
  toMonsterCard(props.battleData.monster)
);

const enemyAttackCards = computed<IAttackCard[]>(() =>
  monsterCard.value.attributes.attackCards.map(toMonsterAttackCard)
);

onMounted(startBattle);

const emit = defineEmits(['quit', 'continue']);
</script>

<template>
  <div
    class="select-none bg-yellow-100 w-full h-full text-white absolute bg-cover top-0 left-0 z-50"
    :style="`background-image: url(${battleData.bg})`"
  >
    <Transition name="fade" mode="out-in">
      <div
        class="bg-black bg-opacity-70 w-full h-full z-50"
        v-if="!battleStarted"
      >
        <Transition name="fade">
          <div
            v-if="showBattleDetails"
            class="w-full h-full flex justify-center items-center gap-20"
          >
            <Card :card="heroCard" />
            <div class="flex justify-center text-5xl bordered-text">VS</div>
            <Card
              :card="monsterCard"
              :hideFront="!isShowingMosterCard"
              :flip-on-hover="false"
            />
          </div>
        </Transition>
      </div>
      <div class="flex flex-col justify-center w-full h-full" v-else>
        <Transition name="bounce">
          <FinalDetails
            :enemy="monsterCard"
            :enemyHp="enemyHp"
            @continue="$emit('continue')"
            @quit="$emit('quit')"
            v-if="gameOver"
          />
        </Transition>
        <div class="w-full h-full flex items-center justify-center gap-5 px-5">
          <div class="flex flex-grow justify-center gap-2">
            <EmptyAttackCardSpace v-for="_ in 4 - enemyAttackCards.length" />
            <BattleAttackCard
              v-for="atk in enemyAttackCards"
              :card="atk"
              :baseAttack="monsterCard.attributes.attack"
              :canAttack="false"
              :isFlipped="myTurn || (!myTurn && atk.id != enemyChosenCard?.id)"
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
                class="absolute w-full h-full text-5xl flex justify-center items-center drop-shadow-2xl text-white animate-ping bordered-text"
                v-if="showDamage && myTurn"
              >
                -{{ currentDamage }}
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-full flex items-center justify-center gap-2 px-5">
          <div class="hero-card flex flex-col gap-1">
            <HpBar :hp="heroExpInfo.healthPoints" :remaining="heroHp" />
            <div class="card-holder flex relative">
              <BattleHeroCard :card="heroCard" />
              <div
                class="absolute w-full h-full text-5xl flex justify-center items-center drop-shadow-2xl text-white animate-ping bordered-text"
                v-if="showDamage && !myTurn"
              >
                -{{ currentDamage }}
              </div>
            </div>
          </div>
          <BattleWeaponCard :card="weaponCard" />
          <div class="flex flex-grow justify-center gap-2">
            <BattleAttackCard
              v-for="atk in heroAttackCards"
              :card="atk"
              :canAttack="canAttack && myTurn"
              :isFlipped="!myTurn"
              @attack="attack"
              :class="{
                'opacity-50':
                  (!canAttack && myTurn) || (myTurn && showTurnMessage),
                'hover:scale-110': canAttack,
              }"
            />
            <EmptyAttackCardSpace v-for="_ in 4 - heroAttackCards.length" />
          </div>
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
            @click="escape"
            v-if="playerStore.escapes > 0"
          >
            ESCAPE ({{ playerStore.escapes }})
          </button>
        </div>
        <div
          class="text-8xl absolute flex w-full h-full justify-center items-center top-0 drop-shadow-2xl animate-ping bordered-text"
          v-if="showTurnMessage"
        >
          {{ turnMessage }}
        </div>
        <div
          class="text-8xl absolute flex w-full h-full justify-center items-center top-0 drop-shadow-2xl animate-ping bordered-text"
          v-if="showFailed"
        >
          FAILED
        </div>
        <div
          class="counter absolute top-5 left-10 text-5xl bg-white p-4 rounded-full w-24 h-24 flex justify-center items-center drop-shadow-xl text-black"
          v-if="myTurn"
        >
          {{ turnCounter }}
          <div
            class="absolute animate-ping text-sm bottom-0 bordered-text-sm text-white"
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
