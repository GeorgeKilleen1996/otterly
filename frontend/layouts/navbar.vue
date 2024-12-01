<script setup lang="ts">

const token = useCookie('is_logged_in_token');
const router = useRouter();

const userMenuOpen = ref(false);
const notificationMenuOpen = ref(false);

const userMenuItems = [
    { icon: 'ion:plus', title: 'Link 1', to: '#', exact: false, active: false },
    { icon: 'ion:plus', title: 'Link 2', to: '#', exact: false, active: false }
];

const logout = () => {
    token.value = null;
    userMenuOpen.value = false;
    notificationMenuOpen.value = false;
    router.push('/auth/login');
}
</script>

<template>
    <div class="flex-1 h-14 border-b border-tertiary z-40">
        <div class="flex items-center justify-between h-full px-4" :class="{'container mx-auto md:px-0' : !token}">
            <div class="flex items-center gap-4">
                <NuxtLink to="/" class="text-xl font-bold">NuxtJS</NuxtLink>
            </div>
            <div class="flex items-center gap-4" v-if="!token">
                <NuxtLink to="/auth/login" class="text-sm">Login</NuxtLink>
                <NuxtLink to="/auth/register" class="text-sm">Register</NuxtLink>
            </div>
            <div class="flex items-center gap-1" v-else>
                <div class="relative">
                    <button 
                        type="button" 
                        name="UserMenuButton" 
                        @click="notificationMenuOpen = !notificationMenuOpen; userMenuOpen = false" 
                        class="w-9 h-9 rounded flex justify-center items-center"
                        :class="{'bg-primary-10 text-primary hover:text-primary-light' : notificationMenuOpen, 'hover:text-primary hover:bg-primary-10 text-secondary-light': !notificationMenuOpen}">
                        <Icon name="ion:notifications" />
                    </button>
                    <Transition name="fade-down" mode="out-in">
                        <UIPopover class="md:w-[30vw] w-[60vw] flex flex-col gap-2 h-fit absolute top-[calc(100%+0.25rem)] md:right-0 -right-10" v-if="notificationMenuOpen">
                            <div class="p-2">
                                <span class="text-xs text-primary">Notifications</span>
                            </div>
                            <div class="w-full h-0 border-b border-tertiary"></div>
                            <div class="flex flex-col justify-center items-center p-4">
                                <Icon name="ion:mail-open" class="text-2xl text-secondary-light" />
                                <span class="text-xs text-secondary-light">It's looking a bit empty in here.</span>
                            </div>
                            <div class="w-full h-0 border-b border-tertiary"></div>
                            <NuxtLink to="#" class="flex gap-2 rounded hover:bg-primary-10 p-2.5 items-center hover:text-primary text-secondary-light w-full text-center justify-center">
                                <span class="text-xs">View All</span>
                            </NuxtLink>
                        </UIPopover>
                    </Transition>
                </div>
                <div class="relative">
                    <button 
                        type="button" 
                        name="UserMenuButton" 
                        @click="userMenuOpen = !userMenuOpen; notificationMenuOpen = false" 
                        class="w-9 h-9 rounded flex justify-center items-center"
                        :class="{'bg-primary-10 text-primary hover:text-primary-light' : userMenuOpen, 'hover:text-primary hover:bg-primary-10 text-secondary-light': !userMenuOpen}">
                        <Icon name="ion:person" />
                    </button>
                    <Transition name="fade-down" mode="out-in">
                        <UIPopover class="min-w-40 max-w-60 flex flex-col gap-2 h-fit absolute top-[calc(100%+0.25rem)] right-0" v-if="userMenuOpen">
                            <div class="w-full flex gap-2 items-center">
                                <div class="w-8 h-8 rounded-full border border-tertiary overflow-hidden"></div>
                                <div class="flex flex-col">
                                    <span class="text-xs text-primary">John Doe</span>
                                    <span class="text-xs text-secondary-light">Role</span>
                                </div>
                            </div>
                            <div class="w-full h-0 border-b border-tertiary"></div>
                            <div class="flex flex-col">
                                <UIMenuLink v-for="item in userMenuItems" :item="item" />
                            </div>
                            <div class="w-full h-0 border-b border-tertiary"></div>
                            <button type="button" @click="logout" name="LogoutButton" class="flex gap-2 rounded hover:bg-primary-10 p-2.5 items-center hover:text-primary text-secondary-light w-full">
                                <Icon name="ion:log-out" />
                                <span class="text-xs">Sign Out</span>
                            </button>
                        </UIPopover>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-down-enter-active, .fade-down-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}
.fade-down-enter-from, .fade-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
.fade-down-enter-to, .fade-down-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>