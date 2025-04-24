import { createApp } from 'vue'
import App from './App.vue'
import i18next from 'i18next'
import i18NextVue from 'i18next-vue'

import './assets/styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import enUS from './locales/en_US.js'
import ptBR from './locales/pt_BR.js'

i18next.init({
  lng: 'pt_BR',
  fallbackLng: 'en_US',
  resources: {
    en_US: { translation: enUS },
    pt_BR: { translation: ptBR }
  }
})

const app = createApp(App)
app.use(i18NextVue, { i18next })
app.mount('#app')
