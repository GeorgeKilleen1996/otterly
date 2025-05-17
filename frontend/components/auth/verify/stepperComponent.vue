<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";

// Declared variables / objects
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
const active = ref(0);
const code = ref([] as string[]);
const redirectionCounter = ref<number | null>(null);

// Redirection Counter
const interval = setInterval(() => {
  if (redirectionCounter.value === null) {
    return;
  }
  if (redirectionCounter.value > 0) {
    redirectionCounter.value--;
  } else {
    clearInterval(interval);
    // useRouter().push("/auth/login");
  }
}, 1000);
</script>
<template>
  <UStepper v-model="active" :items="items" class="w-full" disabled>
    <template #verify>
      <UCard variant="subtle" class="mt-4">
        <div class="flex flex-col items-center gap-4">
          <UIcon name="i-lucide-send" size="2.5rem" />
          <h2>Verify your email</h2>
          <p class="text-sm text-center -mt-2 mb-4">
            We need to make sure you're not a robot, and the best way to do that
            is to verify you have a valid email address.
          </p>
          <UButton
            type="button"
            label="Send verification code"
            color="primary"
            size="xl"
            block
            class="cursor-pointer"
            :loading="false"
          />
        </div>
      </UCard>
    </template>

    <template #enter-code>
      <UCard variant="subtle" class="mt-4">
        <div class="flex flex-col items-center gap-4">
          <UIcon name="i-lucide-mail-check" size="2.5rem" />
          <h2>Enter verification code</h2>
          <p class="text-sm text-center -mt-2">
            You should have received a verification code in your email. Please
            check your spam box, it may have landed in there. Enter it below.
          </p>
          <UForm
            :state="code"
            class="flex flex-col p-4 w-full justify-center items-center space-y-4 mx-auto"
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
              :loading="false"
            />
          </UForm>
        </div>
      </UCard>
    </template>

    <template #confirmation>
      <UCard variant="subtle" class="mt-4">
        <div class="flex flex-col items-center gap-4">
          <UIcon name="i-lucide-verified" size="2.5rem" />
          <h2>Email successfully verified</h2>
          <p class="text-sm text-center -mt-2 mb-4">
            Your account has been verified successfully, login below or you will
            be redirected automatically in {{ redirectionCounter }} second{{
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
            :loading="false"
          />
        </div>
      </UCard>
    </template>
  </UStepper>
</template>
