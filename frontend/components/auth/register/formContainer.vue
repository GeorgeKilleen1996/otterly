<script lang="ts" setup>
const step = ref(0)
const emit = defineEmits(['register'])

const register = () => {
  emit('register')
}
</script>
<template>
  <form
    class="w-full flex flex-col gap-2 justify-between h-full"
    @submit.prevent="register"
  >
    <div class="w-full mt-8 text-right flex justify-between items-center">
      <div class="flex items-center gap-2">
        <!-- <UILogo class="w-10 h-10" /> -->
        <h2 class="text-xl font-semibold text-black">Otterly</h2>
      </div>
      <NuxtLink
        to="/auth/login"
        class="text-primary hover:text-secondary transition-all"
        >Sign In</NuxtLink
      >
    </div>
    <div class="flex flex-1"></div>
    <div class="flex flex-col" v-if="step === 0">
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
      <button type="button" class="btn-primary mt-4" @click="step = 1">
        Get Started
      </button>
    </div>
    <div class="flex flex-1"></div>
    <UIStepperProgress :steps="4" :currentStep="step" class="mb-8 px-6" />
  </form>
</template>
