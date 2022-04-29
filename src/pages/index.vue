<template>
  <div class="min-h-full">
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="h-0 flex-1 flex flex-col overflow-y-auto">
        <!-- User account dropdown -->
        <div class="mt-3 relative inline-block text-left">
          <div @click="toggleUserOptions">
            <button
              id="options-menu-button"
              type="button"
              class="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span class="flex w-full justify-between items-center">
                <span class="flex min-w-0 items-center justify-between space-x-3">
                  <img
                    class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  >
                  <span class="flex-1 flex flex-col min-w-0">
                    <span class="text-gray-900 text-sm font-medium truncate">{{ user?.name || 'User' }}</span>
                    <span class="text-gray-500 text-sm truncate">{{ account }}</span>
                  </span>
                </span>
                <svg
                  class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </div>

          <!-- Dropdown menu, show/hide based on menu state. -->
          <div
            v-if="userOptionsAreVisible"
            class="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu-button"
            tabindex="-1"
          >
            <div
              class="py-1"
              role="none"
            >
              <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
              <a
                id="options-menu-item-1"
                href="#"
                class="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabindex="-1"
              >{{ t('common.settings') }}</a>
            </div>
          </div>
        </div>

        <!-- Sidebar Search -->
        <div class="px-3 mt-5">
          <label
            for="search"
            class="sr-only"
          >{{ t('common.search') }}</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              aria-hidden="true"
            >
              <svg
                class="mr-3 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search"
              type="text"
              name="search"
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
              :placeholder="t('common.search')"
            >
          </div>
        </div>

        <!-- Navigation -->
        <nav class="px-3 mt-6">
          <div class="space-y-1">
            <a
              href="#"
              class="bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              aria-current="page"
            >
              <svg
                class="text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {{ t('navigation.home') }}
            </a>

            <a
              href="#"
              class="text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <svg
                class="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              {{ t('navigation.certificates') }}
            </a>

            <a
              href="#"
              class="text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <svg
                class="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ t('navigation.sea_service') }}
            </a>
          </div>

          <div class="mt-8">
            <!-- Secondary navigation -->
            <h3
              id="desktop-teams-headline"
              class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              {{ t('common.categories') }}
            </h3>
            <div
              class="mt-1 space-y-1"
              role="group"
              aria-labelledby="desktop-teams-headline"
            >
              <div
                v-for="category in kCategories"
                :key="category.id"
                class="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
              >
                <span
                  class="w-2.5 h-2.5 mr-4 rounded-full"
                  :class="[category.color]"
                  aria-hidden="true"
                ></span>
                <span class="truncate">{{ category.name }}</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <!-- Main column -->
    <div class="lg:pl-64 flex flex-col">
      <main class="flex-1">
        <!-- Page title & actions -->
        <div class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div class="flex-1 min-w-0">
            <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              {{ t('navigation.home') }}
            </h1>
          </div>
        </div>

        <div v-if="account">
          <div class="px-4 mt-6 sm:px-6 lg:px-8">
            <DashboardOverview v-if="certificates.length" />
          </div>

          <CertificatesList
            v-slot="slotProps"
            :certificates="expiringCertificates"
            :include-actions="false"
            header-translation-key="certificate.expiring_list_header"
            :extra-headers="['certificate.remaining_days']"
            class="mt-8"
          >
            <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500 font-medium">
              <div class="flex items-center space-x-2">
                <span>
                  {{ slotProps.certificate.remainingDays > 0 ? slotProps.certificate.remainingDays : t('certificate.expired') }}
                </span>
              </div>
            </td>
          </CertificatesList>

          <CertificatesList
            v-slot="slotProps"
            :certificates="renewableCertificates"
            :include-actions="false"
            header-translation-key="certificate.renewable_list_header"
            :extra-headers="['certificate.days_since_issue', 'certificate.missing_days']"
            class="mt-8"
          >
            <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500 font-medium">
              <div class="flex items-center space-x-2">
                <span>
                  0 / {{ slotProps.certificate.daysRequiredToRenew }}
                </span>
              </div>
            </td>
            <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500 font-medium">
              <div class="flex items-center space-x-2">
                <span>
                  32
                </span>
              </div>
            </td>
          </CertificatesList>

          <CertificatesList
            :certificates="certificates"
            include-actions
            class="mt-8"
          />
        </div>

        <EmptyCollection
          v-else
          header="connect_wallet.heading"
          description="connect_wallet.description"
          add-item="connect_wallet.button"
          class="mt-32"
          @add-item="connectWallet"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, onMounted, computed } from 'vue'
import CertificatesList from '~/components/certificates/CertificatesList.vue'
import DashboardOverview from '~/components/DashboardOverview.vue'
import EmptyCollection from '~/components/EmptyCollection.vue'
import { kCategories } from '~/constants'
import type { EButtonType } from '~/constants/ui'
import { useCertificatesStore } from '~/stores/certificates'
import { useUserStore } from '~/stores/user'
import type { Certificate } from '~/types'
import { EAlertType } from '~/types/alertTypes'
import { t } from '~/utils/i18n'
import { ENotification, postNotification } from '~/utils/notifications'

const userStore = useUserStore()
const certificatesStore = useCertificatesStore()

const { connectWallet, getUser } = useUserStore()
const { getCertificates } = useCertificatesStore()
const { account, user } = storeToRefs(userStore)
const { certificates } = storeToRefs(certificatesStore)

const renewableCertificates = computed((): Array<Certificate | undefined> => {
  return certificates.value.filter((certificate) => certificate.isRenewable)
})

const expiringCertificates = computed((): Array<Certificate | undefined> => {
  return certificates.value.filter((certificate) => certificate.isExpiring)
})

const userOptionsAreVisible = ref<boolean>(false)

function toggleUserOptions(): void {
  userOptionsAreVisible.value = !userOptionsAreVisible.value
}

onMounted(async () => {
  try {
    await connectWallet()
    await getUser()
    await getCertificates()
  } catch (error) {
    postNotification(ENotification.showAlert, {
      type: EAlertType.danger,
      title: { key: 'errors.header' },
      description: { key: 'errors.connecting_wallet.description' },
      buttons: ['common.got_it'],
      // eslint-disable-next-line @typescript-eslint/no-empty-function,no-unused-vars
      onDidDismiss: (_action: EButtonType) => {}
    })
  }
})
</script>
