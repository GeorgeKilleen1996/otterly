<script setup lang="ts">
import type { LoginDetails } from '../../types/auth/LoginDetails'

const login = () => {
  console.log('login')
}
const loginDetails: LoginDetails = {
  email: '',
  password: ''
}
</script>

<template>
  <div class="w-screen h-screen flex container mx-auto">
    <div
      class="flex w-full lg:max-w-md flex-col justify-center items-center px-8"
    >
      <AuthLoginForm @login="login" />
    </div>
    <div class="lg:flex flex-1 hidden p-2">
      <div class="w-full h-full rounded-lg bg-background-secondary"></div>
    </div>
  </div>
</template>
