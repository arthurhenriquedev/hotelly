import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import router from './router'
import vue3StarRatings from 'vue3-star-ratings'
import vLazy from './directives/v-lazy'
import CircleFlags from 'vue-circle-flags'
import VueSlider from 'vue-3-slider-component'
import i18n from './plugins/i18n'

import 'vue-circle-flags/dist/vue-circle-flags.css'
import './plugins/fontawesome'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(CircleFlags)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('vue3-star-ratings', vue3StarRatings)
app.component('VueSlider', VueSlider)

app.directive('lazy', vLazy)

app.mount('#app')
