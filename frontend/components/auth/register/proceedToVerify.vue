<script setup lang="ts">
import type { TokenDetails } from "~/types/auth";
import type { Response } from "~/types/main";

// Imports
// Declared variables / objects
const props = defineProps<{
  email: string;
  password: string;
}>();
// Functions
const loginNewUser = async () => {
  await $fetch<Response<TokenDetails>>(
    useRuntimeConfig().public.apiBase + "auth/token/",
    {
      method: "POST",
      body: JSON.stringify({
        email: props.email,
        password: props.password,
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
        title: "Unable to proceed",
        description:
          error.response?.data?.message ||
          "Please check your login credentials and try again.",
        color: "error",
        icon: "i-lucide-octagon-x",
      });
    });
};
// Lifecycle hooks
</script>
<template>
  <UCard variant="subtle" class="mt-4">
    <div class="flex flex-col items-center gap-4">
      <UIcon name="i-lucide-blocks" size="2.5rem" />
      <h2>Verify Account</h2>
      <p class="text-sm text-center -mt-2">
        Before you can start using Otterly, we need to verify your account. All
        users who you invite to your organisation will also need to verify their
        accounts before they can access it.
      </p>
      <UButton
        type="button"
        label="Verify your account"
        color="primary"
        size="xl"
        block
        class="cursor-pointer"
        @click="loginNewUser"
      />
    </div>
  </UCard>
</template>
