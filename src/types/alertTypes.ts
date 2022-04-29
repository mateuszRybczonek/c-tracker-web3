import type { EButtonType } from '~/constants/ui'

export enum EAlertType {
  normal,
  warning,
  danger
}

export type AlertCallback = (button: EButtonType) => void
