import Vue from 'vue'
import App from './App.vue'

import AxiosPlugin from './axios'; // Assuming you have an axios.js file in the same directory

export const EventBus = new Vue();


// Use the Axios plugin
Vue.use(AxiosPlugin);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')



