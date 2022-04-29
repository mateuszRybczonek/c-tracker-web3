<template>
  <!--
    Empty collection state
    We add pb-20 to move it up from the center, it looks better that way.
  -->
  <div class="flex flex-col items-center justify-center h-full sm:pb-20">
    <h3 class="text-xl font-semibold text-gray-200">
      {{ t(props.header) }}
    </h3>
    <p class="mt-3 text-base text-gray-400">
      {{ t(props.description) }}
    </p>
    <div class="mt-8">
      <BaseButton
        @click="emit('add-item')"
      >
        <div class="flex items-center">
          <PlusIcon
            class="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          <span>{{ t(props.addItem) }}</span>
        </div>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import PlusIcon from '~/assets/img/plus-solid.svg?component'
import BaseButton from '~/components/BaseButton.vue'
import { t } from '~/utils/i18n'

const emit = defineEmits(['add-item'])

const props = withDefaults(
  defineProps<{
    header?: string
    description?: string
    addItem?: string
  }>(),
  {
    header: 'common.empty.header',
    description: 'common.empty.description',
    addItem: 'common.add_item'
  }
)
</script>
