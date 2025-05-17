<script setup lang="ts">
// Imports
import type { TokenDetails } from "~/types/auth";

// Declared variables / objects
const loading = ref(false);
const redirectionCounter = ref<number>(15);
const interval = setInterval(() => {
  if (redirectionCounter.value > 0) {
    redirectionCounter.value--;
  } else {
    loading.value = true;
    clearInterval(interval);
    redirectToLogin();
  }
}, 1000);

// Functions
const redirectToLogin = () => {
  loading.value = true;
  clearInterval(interval);

  const oldCookie = useCookie("otterly_user").value as TokenDetails;
  oldCookie.is_verified = true;

  const newCookie = useCookie("otterly_user", {
    maxAge: 60 * 60 * 24 * 7 * 365,
  });
  newCookie.value = JSON.stringify(oldCookie);
  useRouter().push("/");
};
</script>
<template>
  <UCard variant="subtle" class="mt-4">
    <div class="flex flex-col items-center gap-4">
      <UIcon name="i-lucide-verified" size="2.5rem" />
      <h2>Email successfully verified</h2>
      <p class="text-sm text-center -mt-2 mb-4">
        Your account has been verified successfully, login below or you will be
        redirected automatically in
        <span class="font-bold"
          >{{ redirectionCounter }} second{{
            redirectionCounter !== 1 ? "s" : ""
          }}</span
        >. We hope you enjoy using Otterly.
      </p>
      <UButton
        type="button"
        label="Login"
        color="primary"
        size="xl"
        block
        class="cursor-pointer"
        :loading="loading"
        @click="redirectToLogin"
      />
    </div>
  </UCard>
</template>
