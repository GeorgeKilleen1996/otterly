import { defineStore } from 'pinia';
import type { User } from '~/types/auth';

interface AuthState {
    user: User | null;
    token: string | null;
    loggedIn: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: null,
        loggedIn: false,
    }),
    actions: {
        login(user: User, token: string) {
            this.user = user;
            this.token = token;
            this.loggedIn = true;
        },
        logout() {
            this.user = null;
            this.token = null;
            this.loggedIn = false;
        },
    },
    getters: {
        getUser(): User | null {
            return this.user;
        },
        getToken(): string | null {
            return this.token;
        },
        isLoggedIn(): boolean {
            return this.loggedIn;
        },
    },
});