<template>
  <Listbox
    as="div"
    :value="selected"
    @update:modelValue="onCategoryChange"
  >
    <ListboxLabel class="block pl-2 mb-1.5 text-base font-medium text-gray-700">
      Category
    </ListboxLabel>
    <div class="mt-1 relative">
      <ListboxButton class="relative w-full h-10 bg-white border border-gray-300 shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <span class="block truncate">{{ selected.name }}</span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <ListboxOption
            v-for="category in kCategories"
            :key="category.id"
            v-slot="{ active, selected }"
            as="template"
            :value="category"
          >
            <li :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-8 pr-4']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                {{ category.name || 'Select category' }}
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { SelectorIcon } from '@heroicons/vue/solid'
import { ref } from 'vue'
import { kCategories } from '~/constants'
import type { Category } from '~/types'

const emit = defineEmits(['update:category', 'blur', 'focus', 'keydown'])
const selected = ref<Category>({ name: '', id: 0 })

function onCategoryChange(value: Category): void {
  selected.value = value
  emit('update:category', value.id)
}
</script>
