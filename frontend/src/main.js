import Vue from 'vue'
import App from './App.vue'

import AxiosPlugin from './axios'; // Assuming you have an axios.js file in the same directory

export const EventBus = new Vue();


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Use the Axios plugin
Vue.use(AxiosPlugin);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')



