<script setup lang="ts">
// Imports
import type { Res } from "~/types/main";

// Declared variables / objects
const code = ref([] as string[]);

const loading = ref(false);
const timeout = ref(0);
const counter = ref(0);
const props = defineProps({
  step: {
    type: Number,
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

const resendVerificationCode = async () => {
  startTimer();
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
        useToast().add({
          title: "Verification code sent",
          description:
            "We have sent a new verification code to your email. Please check your inbox.",
          color: "success",
          icon: "i-lucide-send",
        });
      }
    })
    .catch((error) => {
      useToast().add({
        title: "Unable to resend verification code",
        color: "error",
        description:
          error.data.message ||
          "Please try again later. If the problem persists, contact support.",
        icon: "i-lucide-octagon-x",
      });
    });
};

const startTimer = () => {
  counter.value++;
  timeout.value = 60;
  const interval = setInterval(() => {
    if (timeout.value > 0) {
      timeout.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

const onCodeChange = () => {
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
        <p>
          <span class="text-sm text-center">
            Need another code?
            <UButton
              label="Resend code"
              color="primary"
              variant="link"
              size="lg"
              class="cursor-pointer px-0"
              :disabled="timeout > 0 || counter > 3"
              @click="resendVerificationCode"
            />
          </span>
        </p>
        <p class="-mt-5">
          <span
            v-if="timeout > 0 && counter < 3"
            class="text-xs text-neutral-500 text-center"
          >
            ({{ timeout }} seconds until resend)
          </span>
          <span
            v-else-if="counter > 3"
            class="text-xs text-neutral-500 text-center"
          >
            Resend limit reached. Please try again later.
          </span>
        </p>
      </UForm>
    </div>
  </UCard>
</template>
