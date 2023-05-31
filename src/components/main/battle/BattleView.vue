<script setup lang="ts">
import { ref } from 'vue';
import { delay, FieldConfig, levelConfigs } from '../../../scripts/main';
import LockIcon from '../../icons/LockIcon.vue';
import UnlockIcon from '../../icons/UnlockIcon.vue';
import { playerStore } from '../../../scripts/store';
import FieldLevels from './FieldLevels.vue';

const isUnlockingDarkForest = ref<boolean>(false);
const isUnlockingCastle = ref<boolean>(false);
const isUnlockingCastleRuins = ref<boolean>(false);
const unlockField = async (field: FieldConfig) => {
  if (field === 'second') isUnlockingDarkForest.value = true;
  if (field === 'third') isUnlockingCastle.value = true;
  if (field === 'fourth') isUnlockingCastleRuins.value = true;
  await delay(1);
  playerStore.value.story[field].isEnabled = true;
};

const chosenField = ref<FieldConfig>();

const unlockNextField = async () => {
  if (!chosenField.value) return;
  const { nextField } = playerStore.value.story[chosenField.value];
  chosenField.value = undefined;
  await delay(0.5);
  unlockField(nextField);
};

defineEmits(['startBattle']);
</script>

<template>
  <div class="w-full h-full">
    <Transition name="fade" mode="out-in">
      <FieldLevels
        v-if="!!chosenField"
        :field="chosenField"
        @back="chosenField = undefined"
        @start-battle="$emit('startBattle', $event)"
        @field-finished="unlockNextField"
      />
      <div class="h-full flex justify-around items-center" v-else>
        <div class="flex flex-col gap-2 items-center justify-center">
          <button
            class="w-40 h-40 bg-gray-900 rounded-lg flex justify-center items-center text-7xl ring ring-gray-900 bg-cover bg-center relative"
            :style="`background-image: url('../assets/backgrounds/${levelConfigs.first.background}')`"
            @click="chosenField = 'first'"
          >
            <div
              class="absolute w-full h-full bg-black bg-opacity-50 hover:opacity-0 transition-all rounded-lg"
            ></div>
          </button>
          {{ levelConfigs.first.name }}
        </div>

        <div class="flex flex-col gap-2 items-center justify-center">
          <Transition name="fade" mode="out-in">
            <button
              class="w-40 h-40 bg-gray-900 rounded-lg flex justify-center items-center text-7xl ring ring-gray-900 bg-cover bg-center relative"
              :style="`background-image: url('../assets/backgrounds/${levelConfigs.second.background}')`"
              @click="chosenField = 'second'"
              v-if="playerStore.story.second.isEnabled"
            >
              <div
                class="absolute w-full h-full bg-black bg-opacity-50 hover:opacity-0 transition-all rounded-lg"
              ></div>
            </button>
            <div
              class="w-40 h-40 bg-gray-900 rounded-lg flex justify-center items-center text-7xl ring ring-blue-900"
              v-else
            >
              ?
            </div>
          </Transition>
          <Transition name="slide-left" mode="out-in">
            <div v-if="playerStore.story.second.isEnabled">
              {{ levelConfigs.second.name }}
            </div>
            <div v-else>
              <Transition name="fade" mode="out-in">
                <UnlockIcon v-if="isUnlockingDarkForest" />
                <LockIcon v-else />
              </Transition>
            </div>
          </Transition>
        </div>

        <div class="flex flex-col gap-2 items-center justify-center">
          <Transition name="fade" mode="out-in">
            <button
              class="w-40 h-40 bg-gray-900 rounded-lg flex justify-center items-center text-7xl ring ring-gray-900 bg-cover bg-center relative"
              :style="`background-image: url('../assets/backgrounds/${levelConfigs.third.background}')`"
              @click="chosenField = 'third'"
              v-if="playerStore.story.third.isEnabled"
            >
              <div
                class="absolute w-full h-full bg-black bg-opacity-50 hover:opacity-0 transition-all rounded-lg"
              ></div>
            </button>
            <div
              class="w-40 h-40 bg-gray-900 rounded-lg flex justify-center items-center text-7xl ring ring-blue-900"
              v-else
            >
              ?
            </div>
          </Transition>
          <Transition name="slide-left" mode="out-in">
            <div v-if="playerStore.story.third.isEnabled">
              {{ levelConfigs.third.name }}
            </div>
            <div v-else>
              <Transition name="fade" mode="out-in">
                <UnlockIcon v-if="isUnlockingCastle" />
                <LockIcon v-else />
              </Transition>
            </div>
          </Transition>
        </div>

        <div class="flex flex-col gap-2 items-center justify-center">
          <Transition name="fade" mode="out-in">
            <button
              class="w-40 h-40 bg-gray-900 rounded-lg flex justify-center items-center text-7xl ring ring-gray-900 bg-cover bg-center relative"
              :style="`background-image: url('../assets/backgrounds/${levelConfigs.fourth.background}')`"
              @click="chosenField = 'fourth'"
              v-if="playerStore.story.fourth.isEnabled"
            >
              <div
                class="absolute w-full h-full bg-black bg-opacity-50 hover:opacity-0 transition-all rounded-lg"
              ></div>
            </button>
            <div
              class="w-40 h-40 bg-gray-900 rounded-lg flex justify-center items-center text-7xl ring ring-blue-900"
              v-else
            >
              ?
            </div>
          </Transition>
          <Transition name="slide-left" mode="out-in">
            <div v-if="playerStore.story.fourth.isEnabled">
              {{ levelConfigs.fourth.name }}
            </div>
            <div v-else>
              <Transition name="fade" mode="out-in">
                <UnlockIcon v-if="isUnlockingCastleRuins" />
                <LockIcon v-else />
              </Transition>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>
