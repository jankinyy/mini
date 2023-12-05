import Vue from "vue";
import Vuex from "vuex";
import persistence from "vuex-uniapp-persistence";
import user from "./user";
Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [persistence()],
  state: {
    safeArea: uni.getSystemInfoSync().safeArea,
    capButton: uni.getMenuButtonBoundingClientRect(),
  },
  mutations: {},
  actions: {},
  modules: { user },
});
export default store;
