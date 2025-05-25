<script setup lang="ts">
// Imports
import type { StepperItem } from "@nuxt/ui";

// Declared variables / objects
const token = ref("");
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
    slot: "confirmation" as const,
    title: "Account Verified",
    icon: "i-lucide-verified",
  },
] satisfies StepperItem[];

// Functions

// Lifecycle hooks
onMounted(() => {
  const query = useRoute().query;
  if (query.token) {
    token.value = query.token as string;
    active.value = 1; // Move to the enter-code step
  } else {
    active.value = 0; // Start at the verify step
  }
});
</script>
<template>
  <UStepper v-model="active" :items="items" class="w-full" disabled>
    <template #verify>
      <AuthVerifySendCode :step="active" @update:step="active = $event" />
    </template>

    <template #enter-code>
      <AuthVerifyEnterCode
        :step="active"
        :token="token"
        @update:step="active = $event"
      />
    </template>

    <template #confirmation>
      <AuthVerifyConfirmationComponent @update:step="active = $event" />
    </template>
  </UStepper>
</template>
