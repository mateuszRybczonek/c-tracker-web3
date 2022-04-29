<template>
  <div class="relative">
    <slot
      v-if="label"
      name="label"
      :inputId="inputId"
    >
      <label
        :for="inputId"
        class="block pl-2 mb-1.5 text-base font-medium text-gray-700"
      >
        {{ t(label) }}
      </label>
    </slot>

    <div class="relative rounded-std shadow-sm">
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
      >
        <component
          :is="icon"
          class="h-5 w-auto text-gray-400"
          :class="iconClass"
          aria-hidden="true"
        />
      </div>

      <input
        :id="inputId"
        ref="inputRef"
        v-bind="$attrs"
        :name="inputName"
        :value="modelValue"
        :disabled="isDisabled"
        :type="inputType"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        class="
          block w-full px-2 py-1.5 border-gray-300 rounded-std
          focus:ring-indigo-500 focus:border-indigo-500
          text-base
          disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-100
        "
        :class="inputClasses"
        @input="onInput($event)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        @keydown="$emit('keydown', $event)"
      />
    </div>

    <p
      v-if="hasErrors"
      class="ml-2 mt-1 text-sm"
      :class="classes"
    >
      <!-- If there is no message, put a non-breaking space to prevent collapse -->
      {{ message.key ? t(message) : '&nbsp;' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { FunctionalComponent, SVGAttributes } from 'vue'
import { computed, nextTick, onMounted, ref, withDefaults } from 'vue'
import { EInputType } from '~/constants/ui'
import { isInputEventTarget } from '~/types/common'
import { getUniqueId } from '~/utils/domUtils'
import type { Translation } from '~/utils/i18n'
import { t } from '~/utils/i18n'

const props = withDefaults(
  defineProps<{
    autocomplete?: string
    autofocus?: boolean
    isDisabled?: boolean
    isValid?: boolean
    inputType?: EInputType
    id?: string
    name?: string
    placeholder?: string
    modelValue?: string | number
    label?: Translation
    // The :is attribute will complain about this, but it works
    icon?: FunctionalComponent<SVGAttributes> | null
    iconClass?: string
    hasErrors?: boolean
    message?: Translation
    messageClasses?: string
  }>(),
  {
    autocomplete: '',
    autofocus: false,
    isDisabled: false,
    isValid: true,
    inputType: EInputType.text,
    id: '',
    name: '',
    placeholder: '',
    modelValue: '',
    label: () => ({ key: '' }),
    icon: null,
    iconClass: '',
    hasErrors: false,
    message: () => ({ key: '' }),
    messageClasses: ''
  }
)

const inputRef = ref<HTMLInputElement>()

onMounted(async () => {
  await nextTick(() => {
    if (props.autofocus) {
      inputRef.value?.focus()
    }
  })
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'keydown'])

const inputName = ref('')
const inputId = ref('')

if (props.id || props.name) {
  if (props.id) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    inputId.value = props.id

    if (!props.name) {
      inputName.value = inputId.value
    }
  }

  if (props.name) {
    if (!inputName.value) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      inputName.value = props.name
    }
  }
} else {
  // If no name is passed, calculate a name (and corresponding id)
  inputName.value = getUniqueId()
  inputId.value = inputName.value
}

const classes = computed((): string => {
  if (/\btext-\b/u.exec(props.messageClasses)) {
    return props.messageClasses
  }

  if (props.isValid) {
    return 'text-gray-700'
  }

  return 'text-red-500'
})

function onInput(event: Event): void {
  if (isInputEventTarget(event.target)) {
    emit('update:modelValue', event.target.value)
  }
}

const inputClasses = computed((): Record<string, unknown> => {
  return {
    'border-red-500 focus:ring-red-500 focus:border-red-500': !props.isValid,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    'pl-9': props.icon
  }
})
</script>
