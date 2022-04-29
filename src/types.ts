import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Certificate {
  name: string
  number: string
  issueDate: string
  expiryDate: string
  timestamp: string
  category: number
  isRenewable: boolean
  daysRequiredToRenew: number
  isExpiring?: boolean
  remainingDays?: number
}

export interface User {
  name: string
  position: string
}

export interface Category {
  name: string
  id: number
}
