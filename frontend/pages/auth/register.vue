<script setup lang="ts">
const register = () => {
  console.log('register')
}
</script>

<template>
  <div class="w-screen h-screen flex container mx-auto">
    <div class="lg:flex flex-1 hidden p-2">
      <div class="w-full h-full rounded-lg bg-background-secondary"></div>
    </div>
    <div
      class="flex w-full lg:max-w-md flex-col justify-center items-center px-8"
    >
      <AuthRegisterFormContainer @register="register" />
    </div>
  </div>
</template>
