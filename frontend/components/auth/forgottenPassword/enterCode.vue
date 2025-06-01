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
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: () => "",
    required: false,
  },
});
const emit = defineEmits<{
  (e: "update:step", step: number): void;
}>();

// Functions
const checkVerificationCode = async () => {
  const verificationCode = code.value.join("");
  loading.value = true;
  await $fetch<Res>(useRuntimeConfig().public.apiBase + "auth/verify-token/", {
    method: "POST",
    body: JSON.stringify({
      email: props.email,
      token: verificationCode,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        loading.value = false;
        emit("update:step", props.step + 1);
      }
    })
    .catch((error) => {
      loading.value = false;
      useToast().add({
        title: "Unable to verify",
        color: "error",
        description:
          error.data.message || "Invalid verification code. Please try again.",
        icon: "i-lucide-octagon-x",
      });
      code.value = [];
    });
};

const onCodeChange = () => {
  console.log("Code changed:", code.value.join(""));
  if (code.value.length > 5) {
    checkVerificationCode();
  }
};

// Lifecycle hooks
onMounted(() => {
  const token = props.token;

  if (token || token !== "") {
    code.value = token.split("");
  }
});
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
      >
        <UPinInput
          v-model="code"
          length="6"
          size="xl"
          otp
          required
          @input="onCodeChange"
        />
      </UForm>
    </div>
  </UCard>
</template>
