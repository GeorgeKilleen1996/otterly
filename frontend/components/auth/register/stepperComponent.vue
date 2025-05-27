<script setup lang="ts">
// Imports
import type { StepperItem } from "@nuxt/ui";
import type { UserDetails } from "~/types/auth";

// Declared variables / objects
const active = ref(1);
const items = [
  {
    slot: "personal-details" as const,
    title: "Personal",
    icon: "i-lucide-user-pen",
  },
  {
    slot: "password" as const,
    title: "Password",
    icon: "i-lucide-key",
  },
  {
    slot: "workspace-details" as const,
    title: "Workspace",
    icon: "i-lucide-blocks",
  },
  {
    slot: "proceed-to-verify" as const,
    title: "Verify",
    icon: "i-lucide-verified",
  },
] satisfies StepperItem[];
const userDetails = ref<UserDetails>({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
});

// Functions
const handleStepUpdate = (payload: {
  step: number;
  userDetails: UserDetails;
}) => {
  Object.assign(userDetails.value, payload.userDetails);
  active.value = payload.step;
};
// Lifecycle hooks
</script>
<template>
  <UStepper v-model="active" :items="items" class="w-full" disabled>
    <template #personal-details>
      <AuthRegisterPersonalDetails
        :step="active"
        :user-details="userDetails"
        @update:step="handleStepUpdate"
      />
    </template>

    <template #password>
      <AuthRegisterPasswordDetails
        :step="active"
        @update:step="handleStepUpdate"
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
