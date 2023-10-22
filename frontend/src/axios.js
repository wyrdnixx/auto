// axios.js
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://codesrv:3000/', // Replace with your API's base URL
});

export default {
  install(Vue) {
    Vue.prototype.$axios = axiosInstance;
  },
};