<template>
  <div class="max-w-6xl mx-auto">
    <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">
      {{ t('common.overview') }}
    </h2>
    <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Card -->
      <div
        v-for="card in cards"
        :key="card.name"
        class="bg-white overflow-hidden shadow rounded-lg"
      >
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <component
                :is="card.icon"
                class="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  {{ card.title }}
                </dt>
                <dd>
                  <div class="text-lg font-medium text-gray-900">
                    {{ card.name }}
                    <span
                      v-if="card.value"
                      class="text-xs font-medium text-gray-500"
                    >
                      ({{ card.value }})
                    </span>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <a
              :href="card.href"
              class="font-medium text-cyan-700 hover:text-cyan-900"
            > View all </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GlobeIcon, ClockIcon, ChartPieIcon } from '@heroicons/vue/outline'
import dayjs from 'dayjs'
import { computed } from 'vue'
import { useCertificatesStore } from '~/stores/certificates'
import type { Certificate } from '~/types'
import { t } from '~/utils/i18n'

const certificatesStore = useCertificatesStore()

const firstExpiringCertificate = computed((): Certificate | undefined => {
  const certificatesArray: Certificate[] = certificatesStore.certificates

  console.log(certificatesArray)

  if (certificatesArray.length) {
    return certificatesArray.sort((a, b) =>
      dayjs(a.expiryDate).isAfter(dayjs(b.expiryDate)) ? 1 : -1
    )[0]
  }

  return undefined
})

const cards = [
  { title: 'Days on board last 12 months', href: '#', icon: GlobeIcon, name: '124' },
  {
    title: 'First expiring certificate',
    href: '#',
    icon: ClockIcon,
    name: firstExpiringCertificate.value?.name,
    value: firstExpiringCertificate.value?.expiryDate
  },
  { title: 'Work/home ratio', href: '#', icon: ChartPieIcon, name: '46%' }
]
</script>
