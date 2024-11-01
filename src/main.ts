import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from '@/App.vue'

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  .mount('#app')
