import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import '@/assets/global-overide.scss'

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  .use(ToastService)
  .mount('#app')
