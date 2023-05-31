<script setup lang="ts">
import { PropType } from 'vue';
import { IHeroCardAttributes } from '../../../scripts/main';
import HeartIcon from '../../icons/HeartIcon.vue';
import SkillIcon from '../../icons/SkillIcon.vue';
import HeroCardExperience from './HeroCardExperience.vue';
import { IHeroExperienceInfo } from '../../../scripts/store';

defineProps({
  attributes: {
    type: Object as PropType<IHeroCardAttributes>,
    required: true,
  },
  expInfo: {
    type: Object as PropType<IHeroExperienceInfo | null>,
    required: false,
  },
});
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <div
      class="px-2 py-1 bg-gray-800 shadow rounded flex justify-center items-center font-bold text-xs gap-1 flex-col"
    >
      <HeroCardExperience
        :experience="expInfo.experience"
        :level="expInfo.level"
        v-if="expInfo"
      />
    </div>
    <div
      class="px-2 py-1 bg-gray-800 shadow rounded flex justify-around items-center font-bold text-xs gap-1"
    >
      <div class="flex items-center gap-1">
        <HeartIcon class="text-red-500 w-5 h-5" />
        <span class="text-xl font-bold uppercase">
          <template v-if="!!expInfo">
            {{ expInfo.healthPoints }}
          </template>
          <template v-else>???</template>
        </span>
      </div>
      <div class="flex items-center gap-1">
        <SkillIcon />
        <span class="text-xl font-bold uppercase">
          <template v-if="!!expInfo">
            {{ expInfo.attack }}
          </template>
          <template v-else>???</template>
        </span>
      </div>
    </div>
  </div>
</template>
