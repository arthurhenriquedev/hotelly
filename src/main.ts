import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import router from './router'
import Lang from '@/statics/lang/lang.js'
import vue3StarRatings from 'vue3-star-ratings'
import vLazy from './directives/v-lazy'
import CircleFlags from 'vue-circle-flags'

import 'vue-circle-flags/dist/vue-circle-flags.css'
import './plugins/fontawesome'

const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'pt',
  messages: Lang
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(CircleFlags)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('vue3-star-ratings', vue3StarRatings)

app.directive('lazy', vLazy)

app.mount('#app')
