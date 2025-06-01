<script setup lang="ts">
// Imports
import type { Res } from "~/types/main";
import * as v from "valibot";

// Declared variables / objects
const loading = ref(false);
const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "update:step", step: number): void;
  (e: "update:email", email: string): void;
}>();

const state = reactive({
  email: "",
});
const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email address")),
});

// Functions
const sendVerificationCode = async () => {
  loading.value = true;
  await $fetch<Res>(
    useRuntimeConfig().public.apiBase + "auth/password-reset/",
    {
      method: "POST",
      body: JSON.stringify({
        email: state.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  loading.value = false;
  useToast().add({
    title: "Verification code sent",
    description:
      "If an account is associated with this email, a verification code has been sent.",
    color: "success",
    icon: "i-lucide-send",
  });
  emit("update:step", props.step + 1);
  emit("update:email", state.email);
};
</script>
<template>
  <UCard variant="subtle" class="mt-4">
    <div class="flex flex-col items-center gap-4">
      <div class="flex justify-center items-center pb-4 pt-2">
        <img
          src="~/assets/img/otterly-logo.png"
          alt="Otterly Logo"
          class="w-20 h-auto"
        />
      </div>
      <h2>Verify your email</h2>
      <p class="text-sm text-center -mt-2 mb-4">
        Before you can reset your password, we need to verify your email
        address.
      </p>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 p-4 w-full"
        @submit="sendVerificationCode"
      >
        <UFormField label="Email address" name="email" required>
          <UInput
            v-model="state.email"
            icon="i-lucide-user-round"
            placeholder="Enter your email"
            size="xl"
            class="w-full"
          />
        </UFormField>
        <UButton
          type="submit"
          label="Send verification code"
          color="primary"
          size="xl"
          block
          class="cursor-pointer"
          :loading="loading"
        />
      </UForm>
    </div>
  </UCard>
</template>
