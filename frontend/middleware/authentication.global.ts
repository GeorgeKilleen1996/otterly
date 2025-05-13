import type { TokenDetails } from "~/types/auth";

export default defineNuxtRouteMiddleware((to) => {
  const path = to.path.split('/')[1];
  const otterlyCookie = useCookie('otterly_user').value as TokenDetails;
  
  if (!otterlyCookie) navigateTo('/auth/login');
  else if (!otterlyCookie["is_verified"]) navigateTo('/auth/verify');
  else navigateTo('/');
})