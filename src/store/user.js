import { loginByTestPhoneAPI } from "@/api/profile";

export default {
  // 命名空间
  namespaced: true,
  state: {
    profile: null,
  },
  getters: {},
  mutations: {
    setProfile(state, payload) {
      state.profile = payload;
    },
  },
  actions: {
    async loginTestFn(store) {
      const { result } = await loginByTestPhoneAPI("13577778888");
      store.commit("setProfile", result);
    },
  },
};
