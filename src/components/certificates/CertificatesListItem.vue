<template>
  <tr>
    <td class="px-2 py-3 w-2 text-sm font-medium text-gray-900">
      <component
        :is="kIconInfo[expiringStatus].icon"
        v-if="expiringStatus"
        class="h-4 w-4"
        :class="kIconInfo[expiringStatus].color"
        aria-hidden="true"
      />
    </td>
    <td class="pr-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
      <div class="flex items-center space-x-3 lg:pl-2">
        <div
          class="flex-shrink-0 w-2.5 h-2.5 rounded-full"
          :class="categoryColor"
          aria-hidden="true"
        ></div>
        <a
          href="#"
          class="truncate hover:text-gray-600"
        >
          <span>
            {{ certificate.name }}
          </span>
        </a>
      </div>
    </td>
    <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500 font-medium">
      <div class="flex items-center space-x-2">
        <span>
          {{ certificate.number }}
        </span>
      </div>
    </td>
    <td class="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
      {{ certificate.issueDate }}
    </td>
    <td class="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
      {{ certificate.expiryDate }}
    </td>
    <slot :certificate="certificate"></slot>
    <td
      v-if="includeActions"
      class="px-6 py-3 whitespace-nowrap text-right text-sm font-medium"
    >
      <a
        class="text-red-400 hover:text-red-600"
        @click="emit('delete-certificate', certificate)"
      >
        <TrashIcon class="w-4 h-4" />
      </a>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ExclamationIcon, ExclamationCircleIcon, TrashIcon } from '@heroicons/vue/outline'
import dayjs from 'dayjs'
import { computed, markRaw, readonly } from 'vue'
import { kCategories } from '~/constants'
import type { Certificate } from '~/types'
import { EAlertType } from '~/types/alertTypes'

const kIconInfo = readonly({
  [EAlertType.warning]: {
    icon: markRaw(ExclamationIcon),
    color: 'text-yellow-400'
  },
  [EAlertType.danger]: {
    icon: markRaw(ExclamationCircleIcon),
    color: 'text-red-500'
  }
})

const props = defineProps<{
  certificate: Certificate
  includeActions: boolean
}>()

const emit = defineEmits(['delete-certificate'])

const categoryColor = computed(
  (): string =>
    kCategories.find((category) => category.id === Number(props.certificate.category))?.color || ''
)

const expiringStatus = computed((): EAlertType | boolean => {
  const monthsTillExpiration = dayjs(props.certificate.expiryDate).diff(dayjs(), 'month')

  if (monthsTillExpiration < 1) {
    return EAlertType.danger
  } else if (monthsTillExpiration <= 3) {
    return EAlertType.warning
  } else {
    return false
  }
})
</script>
