<script setup lang="ts">
// Imports
import type { StepperItem } from "@nuxt/ui";

// Declared variables / objects
const active = ref(0);
const items = [
  {
    slot: "verify" as const,
    title: "Verify Email",
    icon: "i-lucide-send",
  },
  {
    slot: "enter-code" as const,
    title: "Enter Code",
    icon: "i-lucide-mail-check",
  },
  {
    slot: "reset-password" as const,
    title: "Reset Password",
    icon: "i-lucide-key",
  },
] satisfies StepperItem[];

// Functions

// Lifecycle hooks
</script>
<template>
  <UStepper v-model="active" :items="items" class="w-full" disabled>
    <template #verify>
      <AuthForgottenPasswordSendCode
        :step="active"
        @update:step="active = $event"
      />
    </template>

    <template #enter-code>
      <AuthForgottenPasswordEnterCode
        :step="active"
        @update:step="active = $event"
      />
    </template>

    <template #reset-password>
      <AuthForgottenPasswordResetPassword />
    </template>
  </UStepper>
</template>
