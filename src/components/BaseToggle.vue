<template>
  <SwitchGroup
    as="div"
    class="flex items-center cursor-pointer"
  >
    <Switch
      :model-value="value"
      :class="[value ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']"
      @update:model-value="updateValue"
    >
      <span
        aria-hidden="true"
        :class="[value ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']"
      />
    </Switch>
    <SwitchLabel
      as="span"
      class="ml-3"
    >
      <span class="text-sm font-medium text-gray-900">{{ label }}</span>
    </SwitchLabel>
  </SwitchGroup>
</template>

<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

const props = defineProps<{
  label: string
  value: boolean
}>()

const emit = defineEmits(['update:value'])

function updateValue(value: boolean): void {
  emit('update:value', value)
}
</script>
