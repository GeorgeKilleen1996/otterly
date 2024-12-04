<script setup lang="ts">
const token = useCookie('otterly_token')
</script>

<template>
  <div class="w-screen h-screen flex">
    <NuxtLayout v-if="token" name="sidebar" class="hidden md:block" />
    <NuxtLayout v-if="token" name="navbar" />
    <NuxtPage />
  </div>
</template>
