<script setup lang="ts">
// Imports
import type { StepperItem } from "@nuxt/ui";

// TODO: Add autofill for clicked link ?token=xxxxxx (query param)

// Declared variables / objects
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
    slot: "confirmation" as const,
    title: "Account Verified",
    icon: "i-lucide-verified",
  },
] satisfies StepperItem[];
const active = ref(0);

// Functions
</script>
<template>
  <UStepper v-model="active" :items="items" class="w-full" disabled>
    <template #verify>
      <AuthVerifySendCode :step="active" @update:step="active = $event" />
    </template>

    <template #enter-code>
      <AuthVerifyEnterCode :step="active" @update:step="active = $event" />
    </template>

    <template #confirmation>
      <AuthVerifyConfirmationComponent @update:step="active = $event" />
    </template>
  </UStepper>
</template>
