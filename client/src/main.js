// Import external libraries and styles
import Vue from 'vue'
import VueResource from "vue-resource"
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Import local modules and styles
import App from '@/App.vue'
import routes from "@/routes";
import store from "@/store";
import title from "@/mixins/title";
import "@/assets/base-style.css"

// Set plugins
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(BootstrapVue);

// Set mixins
Vue.mixin(title)

// Config settings
Vue.http.options.emulateJson = true;
Vue.config.productionTip = false;

// Create navigation router between pages
const router = new VueRouter({
  routes: routes,
  mode: 'history',
});

// Create and mount Vue instance
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
