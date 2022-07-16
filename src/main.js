import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.less";
import "./utils/day.js";
//引入vant
import Vant from "vant";
import "vant/lib/index.less";
//引入适配
import "amfe-flexible";
Vue.use(Vant);
Vue.config.productionTip = false;
//引入ico
import ToutiaoIcon from "@/components/Tuotiaoico.vue";
//测试api

Vue.component("ToutiaoIcon", ToutiaoIcon);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
