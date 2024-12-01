<script setup lang="ts">
import type { LoginDetails } from '../../types/auth/LoginDetails';

const props = defineProps<{
    loading: boolean;
}>();

const loginDetails = reactive<LoginDetails>({
    email: '',
    password: '',
});

const emit = defineEmits(['login']);

const login = () => {
    emit('login', loginDetails);
};
</script>

<template>
    <form @submit.prevent="login" class="w-full flex flex-col">
        <input v-model="loginDetails.email" type="email" placeholder="Email" class="w-full border border-tertiary rounded p-2 bg-secondary focus:ring-primary focus:ring-1 focus:outline-none" />
        <input v-model="loginDetails.password" type="password" placeholder="Password" class="w-full border border-tertiary rounded p-2 mt-2 bg-secondary focus:ring-primary focus:ring-1 focus:outline-none" />
        <button type="submit" :disabled="loading" class="w-full bg-primary hover:bg-primary-light transition-all text-white rounded p-2 mt-2">Login</button>
    </form>
</template>