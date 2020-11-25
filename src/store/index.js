import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: "",
      status: false,
      group: "",
    },
  },
  mutations: {
    setUser: function(state, data) {
      state.user = data;
    },
  },
  getters: {},
  actions: {},
  modules: {},
});
