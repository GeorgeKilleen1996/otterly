<script setup lang="ts">
// Imports
import type { StepperItem } from "@nuxt/ui";

// Declared variables / objects
const active = ref(0);
const items = [
  {
    slot: "personal-details" as const,
    title: "Personal Details",
    icon: "i-lucide-user-pen",
  },
  {
    slot: "workspace-details" as const,
    title: "Workspace Details",
    icon: "i-lucide-blocks",
  },
  {
    slot: "proceed-to-verify" as const,
    title: "Verify Account",
    icon: "i-lucide-verified",
  },
] satisfies StepperItem[];

// Functions
// Lifecycle hooks
</script>
<template>
  <UStepper v-model="active" :items="items" class="w-full" disabled>
    <template #personal-details>
      <AuthRegisterPersonalDetails
        :step="active"
        @update:step="active = $event"
      />
    </template>

    <template #workspace-details>
      <AuthRegisterWorkspaceDetails
        :step="active"
        @update:step="active = $event"
      />
    </template>

    <template #proceed-to-verify>
      <AuthRegisterProceedToVerify />
    </template>
  </UStepper>
</template>
