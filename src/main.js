import '@/assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUmbrellaBeach, faAddressCard,
  faLaptop, faCar, faFileInvoice,
  faCalendarDays, faComment,
  faMessage, faMagnifyingGlass,
  faGear, faChevronDown, faCircleQuestion,
  faChevronLeft, faChevronRight, faClose
} from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

library.add(
  faUmbrellaBeach, faAddressCard,
  faLaptop, faCar, faFileInvoice,
  faCalendarDays, faComment,
  faMessage, faMagnifyingGlass,
  faGear, faChevronDown, faCircleQuestion,
  faChevronLeft, faChevronRight, faClose
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
