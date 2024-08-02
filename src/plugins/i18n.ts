import { createI18n } from 'vue-i18n'
import Lang from '@/statics/lang/lang.js'

const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'pt',
  messages: Lang,
  legacy: false,
  allowComposition: true
})

export default i18n
