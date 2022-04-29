<template>
  <component
    :is="tag"
    :disabled="isDisabled"
    :class="buttonClasses"
    class="relative inline-flex justify-center items-center rounded overflow-hidden leading-none font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:pointer-events-hover disabled:cursor-not-allowed"
    @click="onClick"
  >
    <!-- loading spinner -->
    <div
      v-if="spinnerSize !== ESpinnerSize.none"
      ref="spinner"
      class="absolute inset-y-0 inset-x-1/2 inset-y-1/2 transition-transform duration-200 -translate-y-10"
    >
      <CircleSpinner
        :size="spinnerSize"
        :class="spinnerClasses"
      />
    </div>

    <!-- button content -->
    <div
      ref="content"
      :class="contentClasses"
    >
      <slot>
        <span>{{ t(title) }}</span>
      </slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, watch, withDefaults } from 'vue'
import { ESpinnerSize } from '../types/circleSpinnerTypes'
import CircleSpinner from './CircleSpinner.vue'
import { EButtonType } from '~/constants/ui'
import type { Translation } from '~/utils/i18n'
import { t } from '~/utils/i18n'

const props = withDefaults(
  defineProps<{
    type?: EButtonType
    isDisabled?: boolean
    isBusy?: boolean
    spinnerSize?: ESpinnerSize
    title?: Translation
    tag?: string
    padding?: string
    classes?: string
  }>(),
  {
    type: EButtonType.primary,
    isDisabled: false,
    isBusy: false,
    spinnerSize: ESpinnerSize.none,
    title: () => ({ key: '' }),
    tag: 'button',
    padding: '',
    classes: ''
  }
)

const spinner = ref<HTMLElement>()
const content = ref<HTMLElement>()

const kButtonTypeClasses = {
  [EButtonType.none]: '',
  [EButtonType.primary]:
    'transition-transform duration-200 text-white border border-indigo-600 bg-indigo-600 hover:bg-indigo-700 rounded-std shadow-sm',
  [EButtonType.secondary]:
    'text-gray-600 border border-gray-300 bg-white hover:bg-gray-100 rounded-std shadow-sm',
  [EButtonType.tertiary]: 'text-gray-600 hover:text-gray-800'
}

const buttonClasses = computed((): string => {
  let padding = props.padding

  if (!props.padding) {
    if (props.type === EButtonType.tertiary) {
      padding = '-ml-0.5 px-1 py-1'
    } else {
      padding = 'py-2 px-4'
    }
  }

  return `${kButtonTypeClasses[props.type]} ${padding} ${props.classes}`
})

const contentClasses = computed((): string => {
  if (props.type === EButtonType.primary && props.spinnerSize !== ESpinnerSize.none) {
    return 'transition-transform duration-200'
  }

  return ''
})

const kSpinnerMargins = {
  [ESpinnerSize.none]: '',
  [ESpinnerSize.small]: '-ml-1.5 -mt-1.5',
  [ESpinnerSize.medium]: '-ml-2 -mt-2',
  [ESpinnerSize.large]: '-ml-3 -mt-3',
  [ESpinnerSize.xl]: '-ml-3.5 -mt-3.5',
  [ESpinnerSize.xxl]: '-ml-4 -mt-4'
}

const spinnerClasses = computed((): string[] => {
  return [kSpinnerMargins[props.spinnerSize]]
})

const emit = defineEmits(['click'])

function onClick(): void {
  if (!props.isDisabled && !props.isBusy) {
    emit('click')
  }
}

if (props.spinnerSize !== ESpinnerSize.none) {
  watch(
    () => props.isBusy,
    () => {
      if (props.isBusy) {
        content.value?.classList.add('translate-y-10')
        spinner.value?.classList.remove('-translate-y-10')
      } else {
        content.value?.classList.remove('translate-y-10')
        spinner.value?.classList.add('-translate-y-10')
      }
    }
  )
}
</script>
