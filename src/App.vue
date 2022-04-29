<template>
  <router-view />
  <BusyOverlay ref="busyOverlay" />
  <BaseAlert />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref, onMounted, onUnmounted } from 'vue'
import BaseAlert from '~/components/BaseAlert.vue'
import BusyOverlay from '~/components/BusyOverlay.vue'
import type BusyOverlayExports from '~/types/BusyOverlayExports'
import type { ShowBusyStateNotificationObject } from '~/utils/notifications'
import { addObserver, ENotification, removeObserver } from '~/utils/notifications'

useHead({
  title: 'C-Tracker Web3',
  meta: [{ name: 'description', content: 'C-Tracker Web3' }]
})

const busyOverlay = ref<BusyOverlayExports>()

function showBusyOverlay(object?: ShowBusyStateNotificationObject): void {
  busyOverlay.value?.show(object)
}

function hideBusyOverlay(): void {
  busyOverlay.value?.hide()
}

onMounted(() => {
  addObserver(ENotification.showBusyState, showBusyOverlay)
  addObserver(ENotification.hideBusyState, hideBusyOverlay)
})

onUnmounted(() => {
  removeObserver(ENotification.showBusyState, showBusyOverlay)
  removeObserver(ENotification.hideBusyState, hideBusyOverlay)
})
</script>
