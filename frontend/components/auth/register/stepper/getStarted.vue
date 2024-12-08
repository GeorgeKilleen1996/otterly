<script lang="ts" setup>
const emit = defineEmits(['updateStep'])

const updateStep = () => {
  emit('updateStep', 1)
}
</script>

<template>
  <div class="flex flex-col">
    <div class="w-full flex justify-center lg:justify-start items-center">
      <div
        class="w-16 h-16 rounded-lg border flex justify-center items-center mb-4"
      >
        <Icon
          name="majesticons:user-add-line"
          size="2em"
          class="text-primary"
        />
      </div>
    </div>
    <h1 class="text-2xl font-bold lg:text-start text-center">
      Join the family
    </h1>
    <p class="text-xs text-tertiary-light lg:text-start text-center mb-4">
      Follow the steps to create your Otterly account
    </p>
    <button type="button" class="btn-primary mt-4" @click="updateStep">
      Get Started
    </button>
  </div>
</template>
