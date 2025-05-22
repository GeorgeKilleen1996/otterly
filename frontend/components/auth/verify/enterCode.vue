<script setup lang="ts">
// Imports
import type { Res } from "~/types/main";

// Declared variables / objects
const code = ref([] as string[]);
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
const checkVerificationCode = async () => {
  const verificationCode = code.value.join("");
  console.log("Verification code entered:", verificationCode);
  // TODO: Actually check the verification code entered with the expected one...
  // For now, just simulate a successful verification
  loading.value = true;
  await $fetch<Res>(useRuntimeConfig().public.apiBase + "users/verify-token/", {
    method: "POST",
    body: JSON.stringify({
      email: useAuthStore().getUser?.email,
      token: verificationCode,
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Token ${useAuthStore().getToken}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        loading.value = false;
        emit("update:step", props.step + 1);
      }
    })
    .catch((error) => {
      // TODO: Handle error here...
    });
};
</script>
<template>
  <UCard variant="subtle" class="mt-4">
    <div class="flex flex-col items-center gap-4">
      <UIcon name="i-lucide-mail-check" size="2.5rem" />
      <h2>Enter verification code</h2>
      <p class="text-sm text-center -mt-2">
        You should have received a verification code in your email. Please check
        your spam box, it may have landed in there. Enter it below.
      </p>
      <UForm
        :state="code"
        class="flex flex-col p-4 w-full justify-center items-center space-y-4 mx-auto"
        @submit.prevent="checkVerificationCode"
      >
        <UPinInput v-model="code" length="6" size="xl" otp required />
        <UButton
          type="submit"
          label="Check verification code"
          color="primary"
          size="xl"
          block
          class="cursor-pointer"
          :disabled="code.length < 6"
          :loading="loading"
        />
      </UForm>
    </div>
  </UCard>
</template>
