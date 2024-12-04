<script setup lang="ts">
import type { LoginDetails } from '../../types/auth/LoginDetails'

const loginDetails: LoginDetails = {
  email: '',
  password: ''
}

const emit = defineEmits(['login'])

const login = () => {
  emit('login')
}
</script>

<template>
  <form
    class="w-full flex flex-col gap-2 justify-between h-full"
    @submit.prevent="login"
  >
    <div class="w-full mt-8 text-right flex justify-between items-center">
      <div class="flex items-center gap-2">
        <!-- <UILogo class="w-10 h-10" /> -->
        <h2 class="text-xl font-semibold text-black">Otterly</h2>
      </div>
      <NuxtLink
        to="/auth/register"
        class="text-primary hover:text-secondary transition-all"
        >Create an account</NuxtLink
      >
    </div>
    <div class="flex flex-1"></div>
    <div class="w-full flex justify-center lg:justify-start items-center">
      <div
        class="w-16 h-16 rounded-lg border flex justify-center items-center mb-4"
      >
        <Icon
          name="majesticons:user-circle-line"
          size="2em"
          class="text-primary"
        />
      </div>
    </div>
    <h1 class="text-2xl font-bold lg:text-start text-center">Welcome back!</h1>
    <p class="text-xs text-tertiary-light lg:text-start text-center mb-4">
      Please enter your login credentials
    </p>
    <label for="email" class="input-label">Email Address</label>
    <div class="relative">
      <Icon
        name="majesticons:mail-line"
        size="1.4em"
        class="absolute top-1/2 transform -translate-y-1/2 left-2 text-border"
      />
      <input
        id="email"
        v-model="loginDetails.email"
        type="email"
        name="email"
        placeholder="Enter your email"
        class="input pl-10 w-full"
      />
    </div>
    <label for="password" class="input-label">Password</label>
    <div class="relative">
      <Icon
        name="majesticons:lock-line"
        size="1.4em"
        class="absolute top-1/2 transform -translate-y-1/2 left-2 text-border"
      />
      <input
        id="password"
        v-model="loginDetails.email"
        type="password"
        name="password"
        placeholder="Enter your password"
        class="input pl-10 w-full"
      />
    </div>
    <button type="submit" class="btn-primary mt-4">Login</button>
    <p class="text-xs text-tertiary-light lg:text-start text-center mt-4">
      Forgot your password?
      <NuxtLink to="/auth/forgot-password" class="text-primary"
        >Reset it here</NuxtLink
      >
    </p>
    <div class="flex flex-1"></div>
  </form>
</template>
