<template>
  <teleport to="body">
    <TransitionRoot
      :show="isVisible"
      enter="ease-out duration-150"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="ease-in duration-100"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div
        class="fixed inset-0 flex justify-center bg-gray-900 bg-opacity-70 transition-opacity select-none"
        aria-hidden="true"
      >
        <div class="absolute top-1/3 flex items-center space-x-3 px-6 py-6 rounded-xl bg-black opacity-90 shadow-xl">
          <CircleSpinner :size="ESpinnerSize.xl" />
          <p class="text-gray-200 text-2xl ">
            {{ t(message) }}
          </p>
        </div>
      </div>
    </TransitionRoot>
  </teleport>
</template>

<script setup lang="ts">
import { TransitionRoot } from '@headlessui/vue'
import { ref } from 'vue'
import type Exports from '../types/BusyOverlayExports'
import CircleSpinner from './CircleSpinner.vue'
import { ESpinnerSize } from '~/types/circleSpinnerTypes'
import { t } from '~/utils/i18n'
import type { Translation } from '~/utils/i18n'
import type { ShowBusyStateNotificationObject } from '~/utils/notifications'

const isVisible = ref(false)
const message = ref<Translation>({ key: '$.syncing', props: {} })

// We use setTimeout to delay the showing of the overlay.
// When the overlay is hidden we must cancel the timeout.
let timeout = 0

const kMinShowTime = 750 // ms

/*
 We want the overlay to appear for at least kMinShowTime, even if it is hidden
 before then. It doesn't look good if it just flashes on screen. So we keep
 track of the time after which it can be hidden.
*/
let hideTime = 0

/* eslint-disable @typescript-eslint/no-magic-numbers */

function show(object?: ShowBusyStateNotificationObject): void {
  console.debug(`showing busy overlay ${new Date().toISOString()}`)
  const delay = object?.delay ?? 500
  message.value = object?.message ?? { key: '$.syncing', props: {} }

  // We can hide the overlay kMinShowTime ms after it appears
  hideTime = Date.now() + delay + kMinShowTime
  timeout = window.setTimeout(() => {
    isVisible.value = true
  }, delay)
}

function hide(): void {
  console.debug(`hiding busy overlay ${new Date().toISOString()}`)
  clearTimeout(timeout)
  const timeLeft = hideTime - Date.now()

  if (timeLeft > 0) {
    setTimeout(() => {
      isVisible.value = false
    }, timeLeft)
  } else {
    isVisible.value = false
  }
}

/* eslint-enable */

defineExpose<Exports>({
  show,
  hide
})
</script>
