/* eslint-disable */
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
// @ts-ignore
import createServer from '@/../mirage/server';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

Vue.config.devtools = true;

if (
	process.env.NODE_ENV !== 'production' &&
	process.env.VUE_APP_MIRAGE === 'true'
) {
	createServer();
}

// ----PrimeVue----
Vue.use(ToastService);
Vue.component('Button', Button);
Vue.component('Toast', Toast);
// ----------------

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app');
