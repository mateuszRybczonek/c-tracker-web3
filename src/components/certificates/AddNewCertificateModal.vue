<template>
  <BaseModal
    :visible="isVisible"
    @close="cancel"
  >
    <!-- Set the width of the content -->
    <DialogTitle
      as="h3"
      class="mb-5 w-full text-xl leading-6 font-semibold text-gray-900"
    >
      {{ t('certificate.add_item') }}
    </DialogTitle>

    <BaseInput
      v-model="name"
      autofocus
      :is-disabled="isBusy"
      :label="{ key: 'certificate.name' }"
      class="mb-4"
    />

    <CategorySelect
      class="mb-4"
      @update:category="onCategoryChange"
    />

    <BaseInput
      v-model="number"
      :is-disabled="isBusy"
      :label="{ key: 'certificate.number' }"
      class="mb-4"
    />

    <BaseInput
      v-model="issueDate"
      :is-disabled="isBusy"
      :label="{ key: 'certificate.issue_date' }"
      :placeholder="t('certificate.date_placeholder')"
      class="mb-4"
    />

    <BaseInput
      v-model="expiryDate"
      :is-disabled="isBusy"
      :label="{ key: 'certificate.expiry_date' }"
      :placeholder="t('certificate.date_placeholder')"

      class="mb-8"
    />

    <BaseToggle
      :value="isRenewable"
      :label="t('certificate.renewed')"
      class="mb-4"
      @update:value="onIsRenewableChange"
    />

    <BaseInput
      v-model="daysRequiredToRenew"
      :is-disabled="isBusy || !isRenewable"
      :label="{ key: 'certificate.required_seaservice' }"
    />

    <template #buttons>
      <div class="flex flex-row-reverse items-center justify-center space-x-4">
        <BaseButton
          class="ml-4"
          :is-disabled="!isValid"
          :is-busy="isBusy"
          :spinner-size="ESpinnerSize.large"
          :title="{ key: 'common.submit' }"
          @click="submit"
        />
        <BaseButton
          class=""
          :type="EButtonType.secondary"
          :title="{ key: 'common.cancel' }"
          @click="cancel"
        />
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { DialogTitle } from '@headlessui/vue'
import { computed, ref } from 'vue'
import BaseButton from '~/components/BaseButton.vue'
import BaseInput from '~/components/BaseInput.vue'
import BaseModal from '~/components/BaseModal.vue'
import BaseToggle from '~/components/BaseToggle.vue'
import CategorySelect from '~/components/CategorySelect.vue'
import { EButtonType } from '~/constants/ui'
import { useCertificatesStore } from '~/stores/certificates'
import { ESpinnerSize } from '~/types/circleSpinnerTypes'
import { t } from '~/utils/i18n'

const { addCertificate } = useCertificatesStore()

const isVisible = ref(false)
const isBusy = ref(false)

const name = ref('')
const number = ref('')
const issueDate = ref('')
const expiryDate = ref('')
const category = ref(0)
const isRenewable = ref(false)
const daysRequiredToRenew = ref(0)

const isValid = computed(
  (): boolean =>
    !!name.value && !!number.value && !!issueDate.value && !!expiryDate.value && !!category.value
)

function reset(): void {
  isBusy.value = false
  name.value = ''
  number.value = ''
  issueDate.value = ''
  expiryDate.value = ''
  category.value = 0
  isRenewable.value = false
  daysRequiredToRenew.value = 0
}

function open(): void {
  reset()
  isVisible.value = true
}

function close(): void {
  isVisible.value = false
}

function cancel(): void {
  close()
}

function onCategoryChange(value: number): void {
  category.value = value
}

function onIsRenewableChange(value: boolean): void {
  isRenewable.value = value

  !value ? (daysRequiredToRenew.value = 0) : (daysRequiredToRenew.value = 365)
}

async function submit(): Promise<void> {
  isBusy.value = true

  await addCertificate({
    name: name.value,
    number: number.value,
    issueDate: issueDate.value,
    expiryDate: expiryDate.value,
    timestamp: '',
    category: category.value,
    isRenewable: isRenewable.value,
    daysRequiredToRenew: daysRequiredToRenew.value
  })

  isBusy.value = false
  close()
}

defineExpose<Exports>({
  open
})

export interface Exports {
  open: () => void
}
</script>
