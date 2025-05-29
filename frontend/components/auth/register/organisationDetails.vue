<script setup lang="ts">
// Imports

// Declared variables / objects
const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
});
const organisationDetails = ref({
  name: "",
});
const emit = defineEmits<{
  (e: "update:step", payload: { step: number; organisationName: string }): void;
}>();

// Functions
const addOrganisationDetails = () => {
  emit("update:step", {
    step: props.step + 1,
    organisationName: organisationDetails.value.name,
  });
};

// Lifecycle hooks
</script>
<template>
  <UCard variant="subtle" class="mt-4">
    <div class="flex flex-col items-center gap-4">
      <UIcon name="i-lucide-blocks" size="2.5rem" />
      <h2>Organisation Details</h2>
      <p class="text-sm text-center -mt-2">
        Please provide an organisation name. This will be used to identify your
        collective workspace within Otterly. So if you're a company, this would
        be your company name.
      </p>
      <UForm
        :state="organisationDetails"
        class="space-y-4 p-4 w-full"
        @submit.prevent="addOrganisationDetails"
      >
        <UFormField label="Organisation Name" name="organisationName" required>
          <UInput
            v-model="organisationDetails.name"
            icon="i-lucide-user-round"
            placeholder="Enter your organisation name"
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
          :disabled="organisationDetails.name === ''"
          :loading="false"
        />
      </UForm>
    </div>
  </UCard>
</template>
