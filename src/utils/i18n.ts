import type { NamedValue } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { messages } from '~/locales'
import type { MessageSchema } from '~/locales'

const i18nPlugin = createI18n<[MessageSchema], 'en-US', false>({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages
})

const i18nTranslate = i18nPlugin.global.t.bind(i18nPlugin.global)

export interface Translation {
  key: string
  props?: NamedValue
}

function translate(
  keyOrTranslation: string | Translation,
  propsOrPlural?: NamedValue | number,
  props?: NamedValue
): string {
  if (typeof keyOrTranslation === 'string') {
    if (!keyOrTranslation) {
      return ''
    }

    if (typeof propsOrPlural === 'number') {
      if (props) {
        // key, plural, props
        return i18nTranslate(keyOrTranslation, props, propsOrPlural)
      }

      // key, plural
      return i18nTranslate(keyOrTranslation, propsOrPlural)
    }

    // key, props
    return i18nTranslate(keyOrTranslation, propsOrPlural ?? {})
  }

  if (!keyOrTranslation.key) {
    return ''
  }

  // translation, plural
  if (typeof propsOrPlural === 'number') {
    return i18nTranslate(keyOrTranslation.key, keyOrTranslation.props ?? {}, propsOrPlural)
  }

  // translation
  return i18nTranslate(keyOrTranslation.key, keyOrTranslation.props ?? {})
}

// Add a period to a translation if necessary
function translateSentence(
  keyOrTranslation: string | Translation,
  propsOrPlural?: NamedValue | number,
  props?: NamedValue
): string {
  const sentence = translate(keyOrTranslation, propsOrPlural, props)
  return sentence.endsWith('.') ? sentence : `${sentence}.`
}

export function countryNameForCode(code: string): string {
  if (window.Intl?.DisplayNames) {
    const names = new Intl.DisplayNames([navigator.language], { type: 'region' })
    return names.of(code)
  }

  return ''
}

const functions = {
  t: translate,
  ts: translateSentence,
  formatNumber: i18nPlugin.global.n.bind(i18nPlugin.global),
  exists: i18nPlugin.global.te.bind(i18nPlugin.global),
  i18n: i18nPlugin.global,
  plugin: i18nPlugin
}

export const { t, ts, formatNumber, exists, i18n, plugin } = functions
