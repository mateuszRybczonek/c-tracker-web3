import { plugin } from '~/utils/i18n'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(plugin)
}
