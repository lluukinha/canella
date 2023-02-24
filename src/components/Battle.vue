<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Snake from './cards/monsters/Snake.vue';
import Knight from './cards/heroes/Knight.vue';

const counter = 100;
const showHeroDamage = ref<boolean>(false);
const showMonsterDamage = ref<boolean>(false);
const currentHeroDamage = ref<number>(0);
const currentMonsterDamage = ref<number>(0);
const turnCounter = ref<number>(counter);
const myTurn = ref<boolean>(true);
const canAttack = ref<boolean>(true);
const canUseItems = ref<boolean>(true);
const showTurnMessage = ref<boolean>(false);
const showTurnTip = ref<boolean>(false);

const initialEnemyHp = ref<number>(10);
const enemyHp = ref<number>(initialEnemyHp.value);

const initialHeroHp = ref<number>(10);
const heroHp = ref<number>(initialHeroHp.value);

const restartGame = () => {
  turnCounter.value = counter;
  myTurn.value = true;
  canAttack.value = true;
  canUseItems.value = true;
  showTurnMessage.value = true;
  enemyHp.value = initialEnemyHp.value;
  heroHp.value = initialHeroHp.value;

  showMessage();
};

const attack = (qtd: number) => {
  if (!canAttack.value || gameOver.value) return;

  currentMonsterDamage.value = qtd;
  showMonsterDamage.value = true;
  setTimeout(() => (showMonsterDamage.value = false), 800);

  const nextEnemyHp = enemyHp.value - qtd;
  enemyHp.value = nextEnemyHp < 0 ? 0 : nextEnemyHp;
  canAttack.value = false;
};

const attackHero = (qtd: number) => {
  if (myTurn.value || gameOver.value) return;

  currentHeroDamage.value = qtd;
  showHeroDamage.value = true;
  setTimeout(() => (showHeroDamage.value = false), 800);

  const nextHeroHp = heroHp.value - qtd;
  heroHp.value = nextHeroHp < 0 ? 0 : nextHeroHp;
};

const overlayHeight = computed(() =>
  Math.floor((1 - enemyHp.value / initialEnemyHp.value) * 100)
);

const overlayHeroHeight = computed(() =>
  Math.floor((1 - heroHp.value / initialHeroHp.value) * 100)
);

const turnMessage = computed(() => {
  if (myTurn.value) return 'YOUR TURN';
  return 'ENEMY TURN';
});

const simulateEnemyTurn = async () => {
  setTimeout(() => {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    attackHero(randomNumber);
  }, 3000);

  setTimeout(() => {
    endTurn();
  }, 4000);
};

const gameOver = computed(() => enemyHp.value === 0 || heroHp.value === 0);

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
  if (gameOver.value || !myTurn.value || heroHp.value === initialHeroHp.value)
    return;

  const nextHeroHp = heroHp.value + qtd;
  heroHp.value =
    nextHeroHp > initialHeroHp.value ? initialEnemyHp.value : nextHeroHp;
  canUseItems.value = false;
};

const showMessage = () => {
  showTurnMessage.value = true;
  setTimeout(() => {
    showTurnMessage.value = false;
  }, 800);

  setTimeout(() => {
    showTurnTip.value = true;
  }, 1000);
};

onMounted(() => {
  showMessage();

  const updateCounter = () => {
    if (!gameOver.value) {
      if (turnCounter.value === 0) endTurn();
      turnCounter.value =
        turnCounter.value === 0 ? counter : turnCounter.value - 1;
    }

    setTimeout(() => {
      updateCounter();
    }, 1000);
  };

  updateCounter();
});

defineEmits(['quit']);

/*
const myPromise = new Promise((resolve, reject) => {
  const result = someOperationThatReturnsValue();
  if (result) {
    resolve(result); // Resolves the Promise with a value
  } else {
    reject("Error occurred"); // Rejects the Promise with an error message
  }
});
*/
</script>

<template>
  <div
    class="w-full h-full absolute z-50 flex justify-center items-center select-none"
    v-if="gameOver"
  >
    <div class="z-50 flex flex-col justify-center items-center gap-5">
      <div class="message text-8xl text-white drop-shadow-xl">
        <template v-if="enemyHp === 0">YOU WON!</template>
        <template v-else>YOU LOSE!</template>
      </div>

      <button
        class="px-4 py-2 bg-gray-400 hover:bg-gray-300 transition-all rounded shadow"
        @click="restartGame()"
      >
        PLAY AGAIN
      </button>
      <button
        class="px-4 py-2 bg-gray-400 hover:bg-gray-300 transition-all rounded shadow"
        @click="$emit('quit')"
      >
        QUIT
      </button>
    </div>
    <div class="overlay bg-black opacity-70 w-full h-full absolute z-40"></div>
  </div>
  <div
    class="h-screen w-screen flex flex-col justify-center select-none bg-yellow-100"
  >
    <div class="w-full h-full flex justify-center items-center">
      <div class="cards flex flex-col gap-1">
        <div class="card-holder flex relative">
          <div
            class="snake card w-52 h-64 bg-blue-600 flex items-center justify-center border border-black p-4"
          >
            <Snake />
          </div>
          <div
            class="absolute w-full h-full text-3xl flex justify-center items-center drop-shadow-2xl text-white animate-ping"
            v-if="showMonsterDamage"
          >
            -{{ currentMonsterDamage }}
          </div>
          <div
            :style="`height: ${overlayHeight}%`"
            class="top-0 absolute w-full h-full bg-black bg-opacity-50 text-white flex justify-center items-center transition-all"
          />
        </div>
        <div class="card-info flex justify-between">
          <div class="info-slot p-1 border border-black">ATK 10</div>
          <div class="info-slot p-1 border border-black">DEF 02</div>
          <div class="info-slot p-1 border border-black">MAG 00</div>
        </div>
      </div>
    </div>
    <div class="w-full h-full flex items-center justify-center gap-5">
      <div class="hero-card flex flex-col gap-1">
        <div class="card-holder flex relative">
          <div
            class="card w-52 h-64 bg-red-600 flex items-center justify-center border border-black p-4"
          >
            <Knight />
          </div>
          <div
            class="absolute w-full h-full text-3xl flex justify-center items-center drop-shadow-2xl text-white animate-ping"
            v-if="showHeroDamage"
          >
            -{{ currentHeroDamage }}
          </div>
          <div
            :style="`height: ${overlayHeroHeight}%`"
            class="top-0 absolute w-full h-full bg-black bg-opacity-50 text-white flex justify-center items-center transition-all"
          />
        </div>
        <div class="card-info flex justify-between">
          <div class="info-slot p-1 border border-black">ATK 10</div>
          <div class="info-slot p-1 border border-black">DEF 02</div>
          <div class="info-slot p-1 border border-black">MAG 00</div>
        </div>
      </div>
      <div
        class="card w-28 h-40 bg-black flex items-center justify-center text-white cursor-pointer transition-all"
        :class="{
          'hover:scale-125': canAttack,
          'opacity-50': !canAttack || !myTurn,
        }"
        @click="attack(1)"
      >
        ATK 1
      </div>
      <div
        class="card w-28 h-40 bg-black flex items-center justify-center text-white cursor-pointer transition-all"
        :class="{
          'hover:scale-125': canAttack,
          'opacity-50': !canAttack || !myTurn,
        }"
        @click="attack(3)"
      >
        ATK 2
      </div>
      <div
        class="card w-28 h-40 bg-black flex items-center justify-center text-white cursor-pointer transition-all"
        :class="{
          'hover:scale-125': canAttack,
          'opacity-50': !canAttack || !myTurn,
        }"
        @click="attack(5)"
      >
        ATK 3
      </div>
      <div
        class="card w-28 h-40 bg-black flex items-center justify-center text-white cursor-pointer transition-all"
        :class="{
          'hover:scale-125': canAttack,
          'opacity-50': !canAttack || !myTurn,
        }"
        @click="attack(7)"
      >
        ATK 4
      </div>
      <div
        class="card w-28 h-40 bg-black flex items-center text-center justify-center text-white cursor-pointer transition-all"
        :class="{
          'hover:scale-125': canUseItems && heroHp < initialHeroHp,
          'opacity-50': !canUseItems || heroHp === initialHeroHp || gameOver,
        }"
        @click="recovery(5)"
      >
        POTION
      </div>
    </div>
  </div>
  <div class="floating-buttons absolute top-10 right-10 flex gap-5">
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
    class="counter absolute top-5 left-10 text-5xl bg-white p-4 rounded-full w-24 h-24 flex justify-center items-center"
  >
    {{ turnCounter }}
    <div
      class="absolute animate-ping text-sm bottom-0"
      v-if="showTurnTip && !gameOver"
    >
      {{ turnMessage }}
    </div>
  </div>
</template>

<style>
body {
  overflow: hidden;
}
</style>
