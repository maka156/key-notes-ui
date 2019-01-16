import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(Vuetify)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
