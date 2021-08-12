import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import mapModule from "@/pages/MapPage/store"
import {getEarthquakes} from "@/requests";

Vue.use(Vuex)

const today = new Date();
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(today.getDate() - 30);

/** Converts Date object to string in yyyy-mm-dd format
 * @param date Date object to be formatted
 * @return string representation of the date in yyyy-mm-dd
 */
function dateFormatted(date) {
  return date.toISOString().split('T')[0];
}

/**
 * VueX store for the project. Holds all application wide data
 */
export default new Vuex.Store({
  // Enable Vuex strict mode to aid debugging in development
  strict: process.env.NODE_ENV === "development",

  modules: {
    map: mapModule,
  },

  state: {
    titlePrefix: 'NZ Earthquake Viewer',
    loadingStatus: false, // Set to true if data is currently being retrieved
    startDate: dateFormatted(today),
    endDate: dateFormatted(thirtyDaysAgo),
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
      state.earthquakes = earthquakes;
    },
    [types.SET_LOADING_STATUS](state, loadingStatus) {
      state.loadingStatus = loadingStatus;
    },
    [types.SET_START_DATE](state, startDate) {
      state.startDate = startDate;
    },
    [types.SET_END_DATE](state, endDate) {
      state.endDate = endDate;
    },
    [types.RESET_DATES](state) {
      state.startDate = dateFormatted(today);
      state.endDate = dateFormatted(thirtyDaysAgo);
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