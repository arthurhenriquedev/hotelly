import 'intersection-observer'
import { createPinia, setActivePinia } from 'pinia'
import { config } from '@vue/test-utils'

import i18n from '@/plugins/i18n'
import Vue3StarRatings from 'vue3-star-ratings'
import vLazy from '@/directives/v-lazy'

const pinia = createPinia()
setActivePinia(pinia)

config.global.plugins = [pinia, i18n]
config.global.components = {
  'vue3-star-ratings': Vue3StarRatings
}
config.global.directives = {
  lazy: vLazy
}
