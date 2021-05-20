import Vue from 'vue'
import VueResource from "vue-resource"
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from '@/App.vue'
import routes from "@/routes";
import store from "@/store";
import title from "./mixins/title";
import "@/assets/base-style.css"

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.mixin(title)

Vue.http.options.emulateJson = true;
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: routes,
  mode: 'history',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
