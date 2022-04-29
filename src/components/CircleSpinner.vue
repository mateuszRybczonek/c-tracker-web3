<template>
  <div
    v-if="size !== ESpinnerSize.none"
    class="relative"
    :class="containerClasses"
  >
    <div
      class="absolute inset-0 border-t-transparent border-l-transparent border-b-transparent rounded-full"
      :class="spinnerClasses"
    ></div>
    <div
      class="absolute inset-0 opacity-25 rounded-full"
      :class="circleClasses"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { ESpinnerSize } from '../types/circleSpinnerTypes'

type SpinnerSizes = Record<ESpinnerSize, [string, string, string]>

const kSpinnerSizes: SpinnerSizes = {
  [ESpinnerSize.none]: ['w-0', 'h-0', ''],
  [ESpinnerSize.small]: ['w-3', 'h-3', 'border-2'],
  [ESpinnerSize.medium]: ['w-4', 'h-4', 'border-3'],
  [ESpinnerSize.large]: ['w-6', 'h-6', 'border-4'],
  [ESpinnerSize.xl]: ['w-7', 'h-7', 'border-4'],
  [ESpinnerSize.xxl]: ['w-8', 'h-8', 'border-4']
}

const props = withDefaults(
  defineProps<{
    size?: ESpinnerSize
    color?: string
    animation?: string
    margin?: string
  }>(),
  {
    size: ESpinnerSize.medium,
    color: 'border-white',
    animation: 'animate-spin',
    margin: ''
  }
)

const [width, height, borderWidth] = kSpinnerSizes[props.size]

const containerClasses = computed((): string[] => {
  return [width, height]
})

const circleClasses = computed((): string[] => {
  return [borderWidth, props.color]
})

const spinnerClasses = computed((): string[] => {
  return [props.animation, ...circleClasses.value]
})
</script>
