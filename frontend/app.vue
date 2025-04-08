<script setup lang="ts">
const appConfig = useAppConfig()
</script>
<template>
  <UApp :tooltip="appConfig.tooltip" :toaster="appConfig.toaster">
    <NuxtPage />
  </UApp>
</template>
