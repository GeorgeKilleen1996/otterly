<script setup lang="ts">
// Imports

// Declared variables / objects
const loading = ref(false);
const redirectionCounter = ref<number>(15);
const interval = setInterval(() => {
  if (redirectionCounter.value > 0) {
    redirectionCounter.value--;
  } else {
    loading.value = true;
    clearInterval(interval);
    // TODO: Update the cookie with the new is_verified value to prevent redirecting back to the verify page
    // Create a function for this which will be trigger when the button is also clicked :)
    // useRouter().push("/auth/login");
  }
}, 1000);
// Functions
</script>
<template>
  <UCard variant="subtle" class="mt-4">
    <div class="flex flex-col items-center gap-4">
      <UIcon name="i-lucide-verified" size="2.5rem" />
      <h2>Email successfully verified</h2>
      <p class="text-sm text-center -mt-2 mb-4">
        Your account has been verified successfully, login below or you will be
        redirected automatically in {{ redirectionCounter }} second{{
          redirectionCounter !== 1 ? "s" : ""
        }}. We hope you enjoy using Otterly.
      </p>
      <UButton
        type="button"
        label="Login"
        color="primary"
        size="xl"
        block
        class="cursor-pointer"
        :loading="loading"
      />
    </div>
  </UCard>
</template>
