<script setup lang="ts">
// Imports

// Declared variables / objects
const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
});
const workspaceDetails = ref({
  name: "",
});
const emit = defineEmits<{
  (e: "update:step", payload: { step: number; workspaceName: string }): void;
}>();

// Functions
const addWorkspaceDetails = () => {
  emit("update:step", {
    step: props.step + 1,
    workspaceName: workspaceDetails.value.name,
  });
};

// Lifecycle hooks
</script>
<template>
  <UCard variant="subtle" class="mt-4">
    <div class="flex flex-col items-center gap-4">
      <UIcon name="i-lucide-blocks" size="2.5rem" />
      <h2>Workspace Details</h2>
      <p class="text-sm text-center -mt-2">
        Please provide a workspace name. This will be used to identify your
        collective workspace within Otterly. So if you're a company, this would
        be your company name.
      </p>
      <UForm
        :state="workspaceDetails"
        class="space-y-4 p-4 w-full"
        @submit.prevent="addWorkspaceDetails"
      >
        <UFormField label="Workspace Name" name="workspaceName" required>
          <UInput
            v-model="workspaceDetails.name"
            icon="i-lucide-user-round"
            placeholder="Enter your workspace name"
            size="xl"
            class="w-full"
          />
        </UFormField>
        <UButton
          type="submit"
          label="Create Otterly account"
          color="primary"
          size="xl"
          block
          class="cursor-pointer"
          :disabled="workspaceDetails.name === ''"
          :loading="false"
        />
      </UForm>
    </div>
  </UCard>
</template>
