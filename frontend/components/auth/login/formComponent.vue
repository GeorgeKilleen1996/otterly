<script setup lang="ts">
import type { Response } from "~/types/main";
import type { LoginDetails, TokenDetails } from "~/types/auth";

const state = reactive<LoginDetails>({
  email: "",
  password: "",
});

const show = ref(false);

const onSubmit = async () => {
  await $fetch<Response<TokenDetails>>(
    useRuntimeConfig().public.apiBase + "/auth/token/",
    {
      method: "POST",
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (response.status === 200 && response.data) {
        const otterlyUser = {
          token: response.data.token,
          is_verified: response.data.is_verified,
        };
        const otterlyCookie = useCookie("otterly_user", {
          maxAge: 60 * 60 * 24 * 7 * 365,
        });
        otterlyCookie.value = JSON.stringify(otterlyUser);
        useRouter().push("/");
      }
    })
    .catch((error) => {
      useToast().add({
        title: "Unable to login",
        description:
          error.response?.data?.message ||
          "Please check your login credentials and try again.",
        color: "error",
        icon: "i-lucide-octagon-x",
      });

      // TODO: Trigger error state in form
    });
};
</script>
<template>
  <UCard variant="subtle">
    <div class="flex flex-col items-center gap-4">
      <UIcon name="i-lucide-log-in" size="3rem" />
      <h1>Welcome back!</h1>
      <p class="text-sm text-center -mt-2 mb-4">
        Please enter your credentials to access your account.
      </p>
    </div>
    <!-- TODO: Setup Auth w/ External providers -->
    <div class="flex space-x-4 p-4">
      <UButton
        label="Google"
        color="neutral"
        block
        size="xl"
        disabled
        variant="subtle"
        icon="i-cib-google"
        class="cursor-pointer"
      />
      <UButton
        label="GitHub"
        color="neutral"
        block
        size="xl"
        disabled
        variant="subtle"
        icon="i-cib-github"
        class="cursor-pointer"
      />
    </div>
    <USeparator label="or" />
    <UForm :state="state" class="space-y-4 p-4" @submit="onSubmit">
      <UFormField label="Email Address" required>
        <UInput
          v-model="state.email"
          icon="i-lucide-user-round"
          placeholder="Enter your email"
          size="xl"
          class="w-full"
        />
      </UFormField>
      <UFormField label="Password" required>
        <UInput
          v-model="state.password"
          icon="i-lucide-key"
          placeholder="Enter your password"
          size="xl"
          class="w-full"
          :type="show ? 'text' : 'password'"
          :ui="{ trailing: 'pe-1' }"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="lg"
              :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="show ? 'Hide password' : 'Show password'"
              :aria-pressed="show"
              aria-controls="password"
              class="cursor-pointer"
              @click="show = !show"
            />
          </template>
        </UInput>
      </UFormField>
      <UButton
        type="submit"
        label="Login"
        color="primary"
        size="xl"
        block
        class="cursor-pointer"
        :loading="false"
      />
    </UForm>
    <div class="flex items-center justify-between px-4 -mt-2">
      <UCheckbox label="Remember me" size="lg" class="cursor-pointer" />
      <UButton
        label="Forgotten password?"
        color="primary"
        variant="link"
        size="lg"
        class="cursor-pointer"
        to="/auth/forgotten-password"
      />
    </div>
    <div class="flex flex-col items-center justify-center px-4 mt-2">
      <USeparator class="my-4" />
      <p class="text-sm text-center">
        Don't have an account?
        <UButton
          label="Sign up"
          color="primary"
          variant="link"
          size="lg"
          class="cursor-pointer px-0"
          to="/auth/register"
        />
      </p>
    </div>
  </UCard>
</template>
