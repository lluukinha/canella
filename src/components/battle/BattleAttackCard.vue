<script setup lang="ts">
import { computed, PropType } from "vue";
import { IAttackCard } from "../../scripts/main";

const props = defineProps({
  card: { type: Object as PropType<IAttackCard>, required: true },
  canAttack: Boolean,
  baseAttack: { type: Number, required: false },
  isFlipped: { type: Boolean, default: true },
});

const min = computed(() => {
  if (!props.baseAttack) return props.card.attributes.min;
  return props.card.attributes.min + props.baseAttack;
});

const max = computed(() => {
  if (!props.baseAttack) return props.card.attributes.max;
  return props.card.attributes.max + props.baseAttack;
});

const emit = defineEmits(["attack"]);

const attack = () => {
  const successProbability = props.card.attributes.chance / 100;
  let damage =
    Math.floor(Math.random() * (max.value - min.value + 1)) + min.value;
  if (Math.random() >= successProbability) damage = 0;
  emit("attack", damage);
};
</script>

<template>
  <div class="flip-card w-32 h-40" @click="attack">
    <div
      class="flip-card-inner transition-all"
      :class="{ 'is-inactive': isFlipped }"
    >
      <div
        class="flip-card-front flex flex-col gap-2 bg-slate-800 p-5 rounded text-white select-none relative transition-all"
        :class="{ 'hover:ring-2 ring-blue-200 hover:scale-110': canAttack }"
      >
        <div
          class="flex flex-col gap-1 w-full justify-center uppercase text-center font-bold"
        >
          <div>{{ card.name }}</div>

          <div>
            <span class="font-normal text-xs">ATK:</span>
            {{ min }}~{{ max }}
          </div>
        </div>
        <p class="text-center text-3xl text-slate-600">
          {{ card.attributes.chance }}%
        </p>
      </div>
      <div
        class="flip-card-back flex flex-col gap-2 bg-slate-800 p-5 rounded text-white select-none relative transition-all"
      >
        back
      </div>
    </div>
  </div>
</template>

<style scoped>
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
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
.is-inactive {
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
.flip-card-back {
  transform: rotateY(180deg);
}
</style>
