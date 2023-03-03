<script setup lang="ts">
defineEmits(["startBattle"]);
</script>

<template>
  <div class="p-5 w-full h-full flex justify-around items-center">
    <div>
        <button
            class="w-40 h-40 bg-green-600 rounded-lg flex justify-center items-center ring ring-blue-900 text-2xl"
            @click="$emit('startBattle')"
        >
            FOREST
        </button>
    </div>

    <div>
        <div class="w-40 h-40 bg-gray-900 rounded-lg flex justify-center items-center text-7xl ring ring-blue-900">?</div>
    </div>

    <div>
        <div class="w-40 h-40 bg-gray-900 rounded-lg flex justify-center items-center text-7xl ring ring-blue-900">?</div>
    </div>

    <div>
        <div class="w-40 h-40 bg-gray-900 rounded-lg flex justify-center items-center text-7xl ring ring-blue-900">?</div>
    </div>
  </div>
</template>
