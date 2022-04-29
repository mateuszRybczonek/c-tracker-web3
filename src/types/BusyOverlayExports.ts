import type { ShowBusyStateNotificationObject } from '~/utils/notifications'

export default interface Exports {
  show: (object?: ShowBusyStateNotificationObject) => void
  hide: () => void
}
