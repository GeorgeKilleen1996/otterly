<script>
import AuthRegisterStepperGetStarted from './components/auth/register/stepper/getStarted.vue'
import AuthRegisterStepperVerifyEmail from './components/auth/register/stepper/verifyEmail.vue'
import AuthRegisterStepperPersonalDetails from './components/auth/register/stepper/personalDetails.vue'
import AuthRegisterStepperCompanyDetails from './components/auth/register/stepper/companyDetails.vue'

export default {
  data() {
    return {
      step: 0,
      previousStep: null,
      components: [
        AuthRegisterStepperGetStarted,
        AuthRegisterStepperVerifyEmail,
        AuthRegisterStepperPersonalDetails,
        AuthRegisterStepperCompanyDetails
      ]
    }
  },
  computed: {
    transitionName() {
      return this.previousStep !== null && this.step < this.previousStep
        ? 'fade-slide-reverse'
        : 'fade-slide'
    }
  },
  methods: {
    updateStep(newStep) {
      this.previousStep = this.step
      this.step = newStep
    }
  }
}
</script>
<template>
  <form
    class="w-full flex flex-col gap-2 justify-between h-full overflow-hidden"
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
    <div class="min-h-96">
      <component :is="components[step]" @updateStep="updateStep"></component>
    </div>
    <div class="flex flex-1"></div>
    <div class="flex flex-col gap-2 items-center">
      <button
        type="button"
        class="text-border hover:text-primary text-xs flex items-center gap-1 transition-all"
        v-if="step > 0"
        @click="updateStep(step - 1)"
      >
        <Icon name="majesticons:arrow-left-line" size="1em" />
        Back
      </button>
      <UIStepperProgress :steps="4" :currentStep="step" class="mb-8 px-6" />
    </div>
  </form>
</template>
