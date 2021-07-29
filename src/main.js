import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http.js';
import './plugins/origin';

import './components.js';
import ElementUI from 'element-ui';
import './styles/element-variables.scss';
import './styles/styles.scss';


Vue.config.productionTip = false
Vue.prototype.$http = http;

Vue.use(ElementUI, {
  size: 'mini'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
