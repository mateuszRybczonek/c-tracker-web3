<template>
  <teleport to="body">
    <TransitionRoot
      as="template"
      :show="visible"
    >
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        :initial-focus="initialFocus"
        @close="$emit('close')"
      >
        <!-- BaseModal start -->
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-200"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-100"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 bg-gray-900 bg-opacity-70 transition-opacity"
              :class="overlayClasses"
            />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="ease-out duration-200"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-100"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            @after-leave="onAfterLeave"
          >
            <div
              class="inline-block align-bottom bg-white rounded-xl pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              :class="classes"
            >
              <div class="px-5">
                <slot></slot>
              </div>
              <div class="mt-5 sm:mt-5 px-5 py-3 bg-gray-50">
                <slot name="buttons"></slot>
              </div>
            </div>
          </TransitionChild>
        </div>
        <!-- BaseModal end -->
      </Dialog>
    </TransitionRoot>
  </teleport>
</template>

<script setup lang="ts">
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { computed, withDefaults } from 'vue'

type ClassSpec = string | string[] | Record<string, boolean>

const props = withDefaults(
  defineProps<{
    visible: boolean
    classes?: ClassSpec
    overlayClick?: boolean
    initialFocus?: HTMLElement | null
  }>(),
  {
    classes: '',
    overlayClick: false,
    initialFocus: null
  }
)

const emit = defineEmits(['close', 'didDismiss'])

const overlayClasses = computed((): string => {
  return props.overlayClick ? '' : 'pointer-events-none'
})

function onAfterLeave(): void {
  emit('didDismiss')
}
</script>
