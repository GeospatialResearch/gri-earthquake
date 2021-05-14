import Vue from 'vue'
import VueResource from "vue-resource"
import VueRouter from "vue-router";
import App from '@/App.vue'
import routes from "@/routes";

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.emulateJson = true;
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: routes,
  mode: 'history',
});

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
