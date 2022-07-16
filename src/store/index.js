import Vue from "vue";
import Vuex from "vuex";
import { getStorage, setlocal } from "@/utils/storages";
Vue.use(Vuex);
const tokenKey = "toutiao_token";
// console.log(getStorage(tokenKey));
export default new Vuex.Store({
  state: {
    user: getStorage(tokenKey),
  },
  getters: {},
  mutations: {
    setuser(state, user) {
      state.user = user;
      setlocal(tokenKey, user);
    },
  },
  actions: {},
  modules: {},
});
