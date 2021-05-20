import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import {getEarthquakes} from "../requests";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    titlePrefix: 'NZ Earthquake Viewer',
    loadingStatus: false,
    startDate: '2021-05-01',
    endDate: '2021-05-02',
    earthquakes: []
  },

  mutations: {
    [types.SET_EARTHQUAKES](state, earthquakes) {
      state.earthquakes = earthquakes
    },
    [types.SET_LOADING_STATUS](state, loadingStatus) {
      state.loadingStatus = loadingStatus
    },
  },

  actions: {
    updateEarthquakes({ commit, state }) {
      commit(types.SET_LOADING_STATUS, true);
      getEarthquakes(state.startDate, state.endDate).then(earthquakes => {
        commit(types.SET_EARTHQUAKES, earthquakes)
        commit(types.SET_LOADING_STATUS, false)
      })
    }
  }
});