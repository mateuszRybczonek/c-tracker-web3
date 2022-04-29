<template>
  <div class="align-middle inline-block min-w-full border-b border-gray-200">
    <h2 class="px-8 text-gray-500 text-xs font-medium uppercase tracking-wide">
      {{ t(headerTranslationKey) }}
    </h2>
    <table class="min-w-full mt-4">
      <thead>
        <tr class="border-t border-gray-200">
          <th class="py-3 pl-2 border-b border-gray-200 bg-gray-50">
            <InformationCircleIcon class="h-4 w-4 text-gray-400" />
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <span class="lg:pl-2">{{ t('certificate.name') }}</span>
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
            {{ t('certificate.number') }}
          </th>
          <th class="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
            {{ t('certificate.issue_date') }}
          </th>
          <th class="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
            {{ t('certificate.expiry_date') }}
          </th>
          <th
            v-for="header in extraHeaders"
            :key="header"
            class="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
          >
            {{ t(header) }}
          </th>
          <th
            v-if="includeActions"
            class="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-indigo-600 uppercase tracking-wider whitespace-nowrap"
          >
            <button @click="openAddCertificateModal">
              <PlusIcon
                class="h-4 w-4"
                aria-hidden="true"
              />
            </button>
          </th>
        </tr>
      </thead>

      <tbody class="bg-white divide-y divide-gray-100">
        <CertificatesListItem
          v-for="certificate in certificates"
          :key="certificate.number"
          :certificate="certificate"
          :include-actions="includeActions"
          @delete-certificate="deleteCertificate"
        >
          <slot :certificate="certificate"></slot>
        </CertificatesListItem>
      </tbody>
    </table>

    <EmptyCollection
      v-if="!certificates.length"
      header="certificate.empty.header"
      description="certificate.empty.description"
      add-item="certificate.add_item"
      class="mt-6"
      @add-item="openAddCertificateModal"
    />

    <AddNewCertificateModal
      ref="addNewCertificateModal"
    />
  </div>
</template>

<script setup lang="ts">
import { InformationCircleIcon, PlusIcon } from '@heroicons/vue/outline'
import { shallowRef, withDefaults } from 'vue'
import type { Exports } from '~/components/certificates/AddNewCertificateModal.vue'
import AddNewCertificateModal from '~/components/certificates/AddNewCertificateModal.vue'
import CertificatesListItem from '~/components/certificates/CertificatesListItem.vue'
import EmptyCollection from '~/components/EmptyCollection.vue'
import { useCertificatesStore } from '~/stores/certificates'
import type { Certificate } from '~/types'
import { t } from '~/utils/i18n'

const { deleteCertificate } = useCertificatesStore()

const props = withDefaults(
  defineProps<{
    certificates: Certificate[]
    includeActions?: boolean
    headerTranslationKey?: string
    extraHeaders?: string[]
  }>(),
  {
    includeActions: true,
    headerTranslationKey: 'navigation.certificates',
    extraHeaders: []
  }
)

const addNewCertificateModal = shallowRef<Exports>()

function openAddCertificateModal(): void {
  addNewCertificateModal.value?.open()
}
</script>
