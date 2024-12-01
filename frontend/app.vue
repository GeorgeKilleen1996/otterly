<script setup lang="ts">
const token = useCookie('is_logged_in_token');
const route = useRoute();

const navItems = [
  {
    group: 'General',
    items: [
      {
        icon: 'ion:home',
        title: 'Dashboard',
        to: '/app',
        exact: true,
        active: route.path === '/app'
      },
      {
        icon: 'ion:plus',
        title: 'Other items here',
        to: '#',
        exact: true,
        active: route.path === '#'
      }
    ]
  },
  {
    group: '2nd Group',
    items: [
      {
        icon: 'ion:plus',
        title: 'Some other group of items',
        to: '#',
        exact: true,
        active: route.path === '#'
      },
      {
        icon: 'ion:plus',
        title: 'A completely ridiculously long title for a new menu item',
        to: '#',
        exact: true,
        active: route.path === '#'
      }
    ]
  }
]
</script>

<template>
  <div class="w-screen h-screen flex"> 
    <NuxtLayout name="sidebar" :navItems="navItems" v-if="token" class="hidden md:block" />
    <div class="flex flex-col w-full">
      <NuxtLayout name="navbar" :class="{'md:ml-[3.5rem]' : token}" />
      <div class="px-4" :class="{'container mx-auto md:px-0' : !token, 'md:pl-[4.5rem]' : token}">
        <NuxtPage :class="{'py-4' : token}" />
      </div>
    </div>
  </div>
</template>