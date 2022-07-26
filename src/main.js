import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import {createPinia} from 'pinia'

// Framework de CSS - Bootstrap
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

// Modals de Alerta/Confirmação - SweetAlert2
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// Barra de Progresso - NProgress
import 'nprogress/nprogress.css'

// Icones - FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import icons from './assets/icons'
library.add(icons)

// Classes de apoio/suporte/ajuda
import * as helper from '@/helpers/'

// vue-select
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

// Instanciar App
const app = createApp(App)
const pinia = createPinia()

app.component('fa', FontAwesomeIcon)
app.component('v-select', vSelect)
app.use(router)
app.use(VueSweetalert2)
app.use(pinia)
app.config.globalProperties.$helper = helper
app.mount('#app')