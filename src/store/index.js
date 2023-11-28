import Vue from "vue";
import Vuex from "vuex";
import persistence from "vuex-uniapp-persistence";
Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [persistence()],
  state: {},
  mutations: {},
  actions: {},
});
export default store;
