<script setup lang="ts">
const props = defineProps({
    item: {
        type: Object as PropType<{
            icon: string;
            title: string;
            to: string;
            exact: boolean;
            active: boolean;
        }>,
        required: true,
        default: () => ({ icon: '', title: '', to: '', exact: false, active: false })
    },
    navOpen: {
        type: Boolean as PropType<boolean>,
        required: false,
        default: true
    }
});
</script>

<template>
    <NuxtLink
        :to="props.item.to"
        :exact="props.item.exact"
        class="flex gap-2 rounded hover:bg-primary-10 p-2.5 items-center"
        :class="{'bg-primary-10 text-primary hover:text-primary-light' : props.item.active, 'hover:text-primary text-secondary-light': !props.item.active , 'w-full' : props.navOpen, 'w-9': !props.navOpen}"
    >
        <div class="flex-shrink-0 flex items-center">
            <Icon :name="props.item.icon" />
        </div>
        <span class="text-xs max-w-40 overflow-hidden truncate" v-if="props.navOpen">{{ props.item.title }}</span>
    </NuxtLink>
</template>