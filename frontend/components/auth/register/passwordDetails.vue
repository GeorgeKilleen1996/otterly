<script setup lang="ts">
// Imports
import type { UserDetails } from "~/types/auth";

// Declared variables / objects
const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
});
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
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
function checkStrength(str: string) {
  const requirements = [
    { regex: /.{6,}/, text: "At least 6 characters" },
    { regex: /\d/, text: "At least 1 number" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least 1 special character" },
  ];

  return requirements.map((req) => ({
    met: req.regex.test(str),
    text: req.text,
  }));
}

const checkPasswordDetails = () => {
  emit("update:step", {
    step: props.step + 1,
    userDetails: userDetails.value,
  });
};

// Lifecycle hooks
const strength = computed(() => checkStrength(userDetails.value.password));
const score = computed(() => strength.value.filter((req) => req.met).length);

const color = computed(() => {
  if (score.value === 0) return "neutral";
  if (score.value <= 1) return "error";
  if (score.value <= 2) return "warning";
  if (score.value === 3) return "warning";
  return "success";
});

const passwordCompliant = computed(() => {
  return (
    userDetails.value.password === "" ||
    userDetails.value.password !== userDetails.value.confirm_password ||
    score.value < 4
  );
});
</script>
<template>
  <UCard variant="subtle" class="mt-4">
    <div class="flex flex-col items-center gap-4">
      <UIcon name="i-lucide-key" size="2.5rem" />
      <h2>Account Password</h2>
      <p class="text-sm text-center -mt-2">
        Set a strong password for your account. Make sure to use a combination
        of letters, numbers, and special characters.
      </p>
      <UForm
        :state="userDetails"
        class="space-y-4 p-4 w-full"
        @submit.prevent="checkPasswordDetails"
      >
        <UFormField label="Password">
          <UInput
            v-model="userDetails.password"
            :color="color"
            :type="showPassword ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
            :aria-invalid="score < 4"
            aria-describedby="password-strength"
            size="xl"
            class="w-full"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="lg"
                class="cursor-pointer"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                aria-controls="password"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>
        <UFormField label="Confirm Password">
          <UInput
            v-model="userDetails.confirm_password"
            :color="color"
            :type="showConfirmPassword ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
            :aria-invalid="score < 4"
            aria-describedby="password-strength"
            size="xl"
            class="w-full"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="lg"
                class="cursor-pointer"
                :icon="
                  showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'
                "
                :aria-label="
                  showConfirmPassword ? 'Hide password' : 'Show password'
                "
                :aria-pressed="showConfirmPassword"
                aria-controls="confirm password"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </UInput>
        </UFormField>
        <UProgress :color="color" :model-value="score" :max="4" size="sm" />

        <p id="password-strength" class="text-sm font-medium">
          Your created password must contain:
        </p>

        <ul class="space-y-1" aria-label="Password requirements">
          <li
            v-for="(req, index) in strength"
            :key="index"
            class="flex items-center gap-0.5"
            :class="req.met ? 'text-success' : 'text-muted'"
          >
            <UIcon
              :name="req.met ? 'i-lucide-check' : 'i-lucide-x'"
              class="size-4 shrink-0"
            />

            <span class="text-xs font-light">
              {{ req.text }}
              <span class="sr-only">
                {{ req.met ? " - Requirement met" : " - Requirement not met" }}
              </span>
            </span>
          </li>
        </ul>
        <UButton
          type="submit"
          label="Lock in your password"
          color="primary"
          size="xl"
          block
          class="cursor-pointer"
          :disabled="passwordCompliant"
          :loading="loading"
        />
      </UForm>
    </div>
  </UCard>
</template>
