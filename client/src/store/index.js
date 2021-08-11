import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import {getEarthquakes} from "@/requests";

Vue.use(Vuex)

/**
 * VueX store for the project. Holds all application wide data
 */
export default new Vuex.Store({
  // Enable Vuex strict mode to aid debugging in development
  strict: process.env.NODE_ENV === "development",

  state: {
    titlePrefix: 'NZ Earthquake Viewer',
    loadingStatus: false, // Set to true if data is currently being retrieved
    startDate: '2021-05-01',
    endDate: '2021-05-02',
    earthquakes: [], // Earthquake data between `startDate` and `endDate`
    minMagnitude: 0,
    maxMagnitude: 9,
  },

  getters: {
    filteredEarthquakes: state => {
      state.earthquakes.filter(earthquake =>
          state.minMagnitude < earthquake.magnitude && earthquake.magnitude <= state.maxMagnitude
      )
    },
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
    // Retrieve earthquake data from external API and update in store
    updateEarthquakes({commit, state}) {
      commit(types.SET_LOADING_STATUS, true);
      getEarthquakes(state.startDate, state.endDate).then(earthquakes => {
        commit(types.SET_EARTHQUAKES, earthquakes)
        commit(types.SET_LOADING_STATUS, false)
      })
    }
  }
});