<script setup lang="ts">
const props = defineProps({
  navItems: {
    type: Array as PropType<
      Array<{
        group: string
        items: Array<{
          icon: string
          title: string
          to: string
          exact: boolean
          active: boolean
        }>
      }>
    >,
    required: true,
    default: () => []
  }
})

const hasNext = (index: number) => index < props.navItems.length - 1
</script>

<template>
  <div></div>
</template>
