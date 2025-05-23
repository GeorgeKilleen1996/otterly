<script setup lang="ts">
import type { Res } from "~/types/main";

// Imports

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
}>();

// Functions
const sendVerificationCode = async () => {
  useToast().add({
    title: "Verification code sent",
    description:
      "We have sent a verification code to your email. Please check your inbox.",
    color: "success",
    icon: "i-lucide-send",
  });
  // TODO: Trigger verification code sending for the user...
  loading.value = true;
  await $fetch<Res>(
    useRuntimeConfig().public.apiBase + "users/generate-token/",
    {
      method: "POST",
      body: JSON.stringify({
        email: useAuthStore().getUser?.email,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${useAuthStore().getToken}`,
      },
    }
  )
    .then((response) => {
      if (response.status === 200) {
        loading.value = false;
        emit("update:step", props.step + 1);
      }
    })
    .catch((error) => {
      loading.value = false;
      useToast().add({
        title: "Unable to generate verification code",
        color: "error",
        description:
          error.data.message ||
          "Please try again later. If the problem persists, contact support.",
        icon: "i-lucide-octagon-x",
      });
    });
};
</script>
<template>
  <UCard variant="subtle" class="mt-4">
    <div class="flex flex-col items-center gap-4">
      <!-- <UIcon name="i-lucide-send" size="2.5rem" /> -->
      <div class="flex justify-center items-center pb-4 pt-2">
        <img
          src="~/assets/img/otterly-logo.png"
          alt="Otterly Logo"
          class="w-20 h-auto"
        />
      </div>
      <h2>Verify your email</h2>
      <p class="text-sm text-center -mt-2 mb-4">
        We need to make sure you're not a robot, and the best way to do that is
        to verify you have a valid email address.
      </p>
      <UButton
        type="button"
        label="Send verification code"
        color="primary"
        size="xl"
        block
        class="cursor-pointer"
        :loading="loading"
        @click="sendVerificationCode"
      />
    </div>
  </UCard>
</template>
