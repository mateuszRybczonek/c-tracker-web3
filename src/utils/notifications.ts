import mitt from 'mitt'
import type { Translation } from './i18n'
import type { AlertCallback, EAlertType } from '~/types/alertTypes'

export const enum ENotification {
  showBusyState = 'showBusyState',
  hideBusyState = 'hideBusyState',
  showAlert = 'showAlert'
}

export interface ShowBusyStateNotificationObject {
  message?: Translation
  delay?: number
}

export type ShowAlertNotificationButtonSpec = Array<string | Translation>

export interface ShowAlertNotificationObject {
  type?: EAlertType
  title: Translation
  description: Translation
  onDidDismiss: AlertCallback
  buttons?: ShowAlertNotificationButtonSpec
}

interface NotificationObject {
  [key: string | symbol]: unknown
  [ENotification.showBusyState]?: ShowBusyStateNotificationObject
  [ENotification.showAlert]: ShowAlertNotificationObject
}

const notifications = mitt<NotificationObject>()

const exports = {
  /* eslint-disable @typescript-eslint/unbound-method */
  addObserver: notifications.on,
  removeObserver: notifications.off,
  postNotification: notifications.emit,
  clear: notifications.all.clear
  /* eslint-enable */
}

export const { addObserver, removeObserver, postNotification, clear } = exports
