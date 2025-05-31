<script setup lang="ts">
// Imports
import type { UserDetails } from "~/types/auth";
import * as v from "valibot";
import type { Res } from "~/types/main";

// Declared variables / objects
const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
});
const loading = ref(false);
const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email address")),
  first_name: v.pipe(v.string(), v.minLength(1, "First name is required")),
  last_name: v.pipe(v.string(), v.minLength(1, "Last name is required")),
});
const emit = defineEmits<{
  (e: "update:step", payload: { step: number; userDetails: UserDetails }): void;
}>();
const userDetails = ref<UserDetails>({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
});

// Functions
const handlePersonalDetailsSubmit = async () => {
  loading.value = true;
  await $fetch<Res>(useRuntimeConfig().public.apiBase + "users/available/", {
    method: "POST",
    body: JSON.stringify({
      email: userDetails.value.email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        emit("update:step", {
          step: props.step + 1,
          userDetails: userDetails.value,
        });
      }
    })
    .catch((error) => {
      useToast().add({
        title: "Error with peronal details",
        color: "error",
        description:
          error.data.message ||
          "Please try again later. If the problem persists, contact support.",
        icon: "i-lucide-octagon-x",
      });
    });
  loading.value = false;
};
</script>

<template>
  <UCard variant="subtle" class="mt-4">
    <div class="flex flex-col items-center gap-4">
      <UIcon name="i-lucide-user-pen" size="2.5rem" />
      <h2>Personal Details</h2>
      <p class="text-sm text-center -mt-2">
        Fill in your personal details to create your account. Your email will be
        used to log into Otterly.
      </p>
      <UForm
        :state="userDetails"
        :schema="schema"
        class="space-y-4 p-4"
        @submit.prevent="handlePersonalDetailsSubmit"
      >
        <div class="flex gap-2">
          <UFormField label="First name" name="first_name" required>
            <UInput
              v-model="userDetails.first_name"
              icon="i-lucide-user-round"
              placeholder="John"
              size="xl"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Last name" name="last_name" required>
            <UInput
              v-model="userDetails.last_name"
              icon="i-lucide-user-round"
              placeholder="Smith"
              size="xl"
              class="w-full"
            />
          </UFormField>
        </div>
        <UFormField label="Email address" name="email" required>
          <UInput
            v-model="userDetails.email"
            icon="i-lucide-user-round"
            placeholder="Enter your email"
            size="xl"
            class="w-full"
          />
        </UFormField>
        <UButton
          type="submit"
          label="Set account password"
          color="primary"
          size="xl"
          block
          class="cursor-pointer"
          :disabled="
            userDetails.email === '' ||
            userDetails.first_name === '' ||
            userDetails.last_name === ''
          "
          :loading="loading"
        />
      </UForm>
      <div class="flex flex-col items-center justify-center px-4">
        <USeparator class="mb-4" />
        <p class="text-sm text-center">
          Already have an account?
          <UButton
            label="Sign in"
            color="primary"
            variant="link"
            size="lg"
            class="cursor-pointer px-0"
            to="/auth/login"
          />
        </p>
      </div>
    </div>
  </UCard>
</template>
