<template>
  <BaseModal
    :visible="isVisible"
    :overlay-click="overlayClickCancels"
    :initial-focus="initialFocus"
    @close="cancel"
    @did-dismiss="onDidDismiss"
  >
    <!-- BaseAlert start -->
    <div class="sm:flex sm:flex-col sm:items-start sm:max-w-lg sm:w-full">
      <div class="sm:flex sm:items-center flex-initial">
        <div
          class="flex-shrink-0 flex flex-row items-center justify-center h-10 w-10 sm:mx-0 sm:h-8 sm:w-8"
        >
          <component
            :is="kIconInfo[type].icon"
            class="h-8 w-8"
            :class="kIconInfo[type].color"
            aria-hidden="true"
          />
        </div>
        <div class="mt-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <DialogTitle
            as="h3"
            class="text-xl leading-6 font-medium text-gray-900"
          >
            {{ t(title) }}
          </DialogTitle>
        </div>
      </div>
      <p class="mt-3 sm:ml-12 text-base text-gray-500 leading-none">
        {{ ts(description) }}
      </p>
    </div>
    <template #buttons>
      <div class="flex flex-row-reverse items-center">
        <BaseButton
          v-if="buttons[0]"
          :type="buttons[0].type"
          :title="buttons[0].title"
          :class="primaryClasses"
          @click="onClick(EButtonType.primary)"
        />
        <BaseButton
          v-if="buttons[1]"
          :type="buttons[1].type"
          :title="buttons[1].title"
          class="mr-4"
          :class="secondaryClasses"
          @click="onClick(EButtonType.secondary)"
        />
        <BaseButton
          v-if="buttons[2]"
          :type="buttons[2].type"
          :title="buttons[2].title"
          class="mr-auto"
          @click="onClick(EButtonType.tertiary)"
        />
      </div>
    </template>
    <!-- BaseAlert end -->
  </BaseModal>
</template>

<script setup lang="ts">
import { DialogTitle } from '@headlessui/vue'
import { computed, markRaw, onMounted, onUnmounted, readonly, ref, withDefaults } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'
import DangerIcon from '~/assets/img/circle-exclamation-solid.svg?component'
import InfoIcon from '~/assets/img/circle-info-solid.svg?component'
import WarningIcon from '~/assets/img/triangle-exclamation-solid.svg?component'
import { EButtonType } from '~/constants/ui'
import type { AlertCallback } from '~/types/alertTypes'
import { EAlertType } from '~/types/alertTypes'
import type { Translation } from '~/utils/i18n'
import { t, ts } from '~/utils/i18n'
import type { ShowAlertNotificationObject } from '~/utils/notifications'
import { addObserver, ENotification, removeObserver } from '~/utils/notifications'

interface ButtonSpec {
  title: Translation
  type: EButtonType
}

const props = withDefaults(
  defineProps<{
    overlayClick?: boolean
  }>(),
  {
    overlayClick: false
  }
)

const kIconInfo = readonly({
  [EAlertType.normal]: {
    icon: markRaw(InfoIcon),
    color: 'text-green-500'
  },
  [EAlertType.warning]: {
    icon: markRaw(WarningIcon),
    color: 'text-yellow-400'
  },
  [EAlertType.danger]: {
    icon: markRaw(DangerIcon),
    color: 'text-red-500'
  }
})

const isVisible = ref(false)
const type = ref<EAlertType>(EAlertType.normal)
const title = ref<Translation>({ key: '' })
const description = ref<Translation>({ key: '' })
const buttons = ref<[ButtonSpec?, ButtonSpec?, ButtonSpec?]>([])
const alertCallback = ref<AlertCallback>()
const action = ref(EButtonType.secondary)
const overlayClickCancels = ref(props.overlayClick)
const initialFocus = ref<HTMLElement | null>(null)

function reset(): void {
  buttons.value = []
  initialFocus.value = null
}

function handleShowAlert(object: ShowAlertNotificationObject): void {
  reset()
  type.value = object.type ?? EAlertType.normal

  // If it's a danger alert, don't focus any buttons
  if (type.value === EAlertType.danger) {
    initialFocus.value = document.body
  }

  title.value = object.title
  description.value = object.description
  alertCallback.value = object.onDidDismiss

  if (object.buttons) {
    // We know there is one element because we called reset()
    object.buttons.forEach((buttonTitle: string | Translation, index: number) => {
      let spec: ButtonSpec

      if (typeof buttonTitle === 'string') {
        spec = { title: { key: buttonTitle }, type: index }
      } else {
        spec = { title: buttonTitle, type: index }
      }

      buttons.value.push(spec)
    })

    // If there is a secondary button but no tertiary button,
    // make the secondary button tertiary style.
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (object.buttons.length === 2) {
      buttons.value[1]!.type = EButtonType.tertiary
    }
  }

  // If there is a cancel button, allow clicks on the overlay to cancel
  overlayClickCancels.value = buttons.value.length > 1
  isVisible.value = true
}

onMounted(() => {
  addObserver(ENotification.showAlert, handleShowAlert)
})

onUnmounted(() => {
  removeObserver(ENotification.showAlert, handleShowAlert)
})

const primaryClasses = computed((): string => {
  // If it's a danger alert, the primary button is red
  return type.value === EAlertType.danger
    ? '!border-red-600 !bg-red-600 hover:!bg-red-700 focus:!ring-red-400'
    : ''
})

const secondaryClasses = computed((): string => {
  // If there are 2 buttons, the secondary button is tertiary style.
  // Give it some extra padding to move it away from the primary button
  // and to make the focus ring bigger.
  if (buttons.value[1]?.type === EButtonType.tertiary) {
    return '!px-2'
  }

  return ''
})

function onClick(clickAction: EButtonType): void {
  isVisible.value = false
  action.value = clickAction
}

function cancel(): void {
  onClick(EButtonType.secondary)
}

function onDidDismiss(): void {
  if (alertCallback.value) {
    alertCallback.value(action.value)
  }
}
</script>
