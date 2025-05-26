<script setup lang="ts">
// Imports
// Declared variables / objects
// Functions
// Lifecycle hooks
</script>
<template>
  <UCard variant="subtle" class="mt-4">
    <div class="flex flex-col items-center gap-4">
      <UIcon name="i-lucide-key" size="2.5rem" />
      <h2>Account Password</h2>
      <p class="text-sm text-center -mt-2">
        Set a strong password for your account. Make sure to use a combination
        of letters, numbers, and special characters.
      </p>
      <UIAuthPasswordStrength />
    </div>
  </UCard>
</template>
