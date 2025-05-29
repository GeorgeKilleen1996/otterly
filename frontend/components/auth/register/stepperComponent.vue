<script setup lang="ts">
// Imports
import type { StepperItem } from "@nuxt/ui";
import type { UserDetails } from "~/types/auth";
import type { Res } from "~/types/main";

// Declared variables / objects
const active = ref(0);
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
  if (active.value === 0) {
    userDetails.value = payload.userDetails;
  } else if (active.value === 1) {
    userDetails.value.password = payload.userDetails.password;
    userDetails.value.confirm_password = payload.userDetails.confirm_password;
  }
  active.value = payload.step;
};

const createUser = async (payload: { step: number; workspaceName: string }) => {
  await $fetch<Res>(useRuntimeConfig().public.apiBase + "users/create/", {
    method: "POST",
    body: JSON.stringify({
      ...userDetails.value,
      workspace_name: payload.workspaceName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        active.value = payload.step;
      }
    })
    .catch((error) => {
      useToast().add({
        title: "Error creating user",
        color: "error",
        description:
          error.data.message ||
          "Please try again later. If the problem persists, contact support.",
        icon: "i-lucide-octagon-x",
      });
    });
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
      <AuthRegisterWorkspaceDetails :step="active" @update:step="createUser" />
    </template>

    <template #proceed-to-verify>
      <AuthRegisterProceedToVerify />
    </template>
  </UStepper>
</template>
