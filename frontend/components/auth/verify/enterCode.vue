<script setup lang="ts">
// Imports

// Declared variables / objects
const code = ref([] as string[]);
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
const checkVerificationCode = () => {
  const verificationCode = code.value.join("");
  console.log("Verification code entered:", verificationCode);
  // TODO: Actually check the verification code entered with the expected one...
  // For now, just simulate a successful verification
  emit("update:step", props.step + 1);
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
          :loading="false"
        />
      </UForm>
    </div>
  </UCard>
</template>
