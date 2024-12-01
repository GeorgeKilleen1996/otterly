<script setup lang="ts">

const props = defineProps({
  navItems: {
    type: Array as PropType<Array<{
      group: string;
      items: Array<{
        icon: string;
        title: string;
        to: string;
        exact: boolean;
        active: boolean;
      }>;
    }>>,
    required: true,
    default: () => []
  }
});

const navOpen = ref(false);

const hasNext = (index: number) => index < props.navItems.length - 1;
</script>

<template>
    <div 
        class="navbar-transition h-screen border-r border-tertiary fixed top-0 left-0 hover:shadow-sm hover:shadow-tertiary z-50 transition-all bg-secondary" 
        :class="{'w-14' : !navOpen, 'w-56' : navOpen}"
        @mouseover="navOpen = true" @mouseleave="navOpen = false">
        <div class="flex flex-col h-full">
            <div class="h-14 w-full p-2.5 flex justify-start items-center"></div>
            <div class="flex-1 flex flex-col p-2 gap-2">
                <template v-for="(items, index) in props.navItems" :key="index">
                    <UIMenuLink v-for="item in items.items" :item="item" :navOpen="navOpen" />
                    <div class="w-full h-0 border-b border-tertiary" v-if="hasNext(index)"></div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.navbar-transition {
  transition: width 0.15s ease-in-out;
}
</style>