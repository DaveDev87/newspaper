import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
  },
  mutations: {
    changeLoggedStatus(state, newStatus) {
      state.isLogged = newStatus;
    },
  },
  getters: {
    loggedStatus: (state) => state.isLogged,
  },
  actions: {},
  modules: {},
});
