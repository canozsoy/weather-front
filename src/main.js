/* eslint-disable global-require */
import Vue from 'vue';
import { Icon } from 'leaflet';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/global.scss';
import 'leaflet/dist/leaflet.css';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/';

// eslint-disable-next-line no-underscore-dangle
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
