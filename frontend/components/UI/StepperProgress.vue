<script lang="ts" setup>
const props = defineProps<{
  steps: number
  currentStep: number
}>()
</script>
<template>
  <div class="w-full flex gap-1 justify-center items-center">
    <div
      v-for="step in props.steps"
      :key="step"
      class="flex-1 h-1 rounded-lg"
      :class="{
        'bg-primary': step < props.currentStep,
        'bg-primary-light': step === props.currentStep,
        'bg-border': step > props.currentStep
      }"
    ></div>
  </div>
</template>
