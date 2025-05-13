import { useAuthStore } from '~/stores/auth';
import type { TokenDetails, User } from "~/types/auth";

export default defineNuxtRouteMiddleware(async(to) => {
  const area = to.path.split('/')[1];
  const otterlyCookie = useCookie('otterly_user').value as TokenDetails;

  if (otterlyCookie?.token && !useAuthStore().isLoggedIn) {
    const data = await $fetch<User>(`${useRuntimeConfig().public.apiBase}users/me/`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Token ${otterlyCookie?.token}`
        }
    });

    if (data) {
        useAuthStore().login(data, otterlyCookie?.token);
    }
  }

  if (otterlyCookie){
    if (!otterlyCookie?.is_verified && to.path !== '/auth/verify') return navigateTo('/auth/verify');
    else if (otterlyCookie?.is_verified && area === 'auth') return navigateTo('/');
  } else {
    if (area !== 'auth' || to.path === '/auth/verify') return navigateTo('/auth/login');
  }
})