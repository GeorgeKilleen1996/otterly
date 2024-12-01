<script setup lang="ts">
import type { LoginDetails } from '../../types/auth/LoginDetails';

const router = useRouter();

const loading = ref(false);
const errorMessage = ref('');

const login = async (loginDetails: LoginDetails) => {
  loading.value = true;
    await useFetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDetails),
      onResponse: (data) => {
        const token = data.response._data;
        const isLoggedinCookie = useCookie('is_logged_in_token', {
          maxAge: 60 * 60 * 24 * 7 * 365,
        });
        isLoggedinCookie.value = token;
        router.push('/app/')
      },
      onRequestError: (error) => {
        console.error(error);
      },
      onResponseError: (error) => {
        if(error.response.status === 404){
          errorMessage.value = 'Incorrect login details.';
        }
      },
    });
    loading.value = false;
}
</script>

<template>
    <div class="w-full h-[calc(100vh-3.5rem)] flex justify-center items-center">
        <div class="w-full max-w-sm border border-tertiary bg-secondary-medium shadow-xs rounded p-4 flex flex-col gap-4 items-center">
            <div class="w-full flex flex-col items-center">
              <div class="w-20 h-20 rounded-full border border-tertiary"></div>
              <h1 class="text-2xl font-bold text-center mt-2">Welcome back!</h1>
              <span class="text-sm font-light text-center text-secondary-light">Enter your email and password to login.</span>
            </div>
            <div class="flex justify-center items-center text-center text-xs h-6">
              <UISpinner v-if="loading" />
              <span class="text-red-500" v-if="errorMessage && !loading">{{ errorMessage }}</span>
            </div>
            <AuthLoginForm @login="login" :loading="loading" />
            <div class="flex flex-col text-xs text-center text-secondary-light">
              <span>Don't have an account? <NuxtLink class="text-primary hover:text-primary-light" to="/auth/register">Register here</NuxtLink>.</span>
              <span>Can't login? <NuxtLink class="text-primary hover:text-primary-light" to="/auth/reset-password">Reset your password</NuxtLink>.</span>
            </div>
        </div>
    </div>
</template>