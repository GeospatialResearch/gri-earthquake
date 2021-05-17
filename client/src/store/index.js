import Vue from "vue";
import Vuex from "vuex";
import {SET_EARTHQUAKES} from "./types";
import {getEarthquakes} from "../requests";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    startDate: '2021-05-01',
    endDate: '2021-05-02',
    earthquakes: []
  },

  mutations: {
    [SET_EARTHQUAKES](state, earthquakes) {
      state.earthquakes = earthquakes
    },
  },

  actions: {
    updateEarthquakes({ commit, state }) {
      getEarthquakes(state.startDate, state.endDate).then(earthquakes => {
        commit('SET_EARTHQUAKES', earthquakes)
      })
    }
  }
});