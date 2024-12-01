export default defineNuxtRouteMiddleware((to, from) => {
    const path = to.path.split('/')[1];
    const token = useCookie('is_logged_in_token');
    
    if (path === 'app') {
        if (!token.value) {
            return navigateTo('/auth/login');
        }
    } else if (path === 'auth') {
        if (token.value) {
            return navigateTo('/app');
        }
    }
})