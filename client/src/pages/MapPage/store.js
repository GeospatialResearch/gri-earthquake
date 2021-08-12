export const storeNamespace = "map"

export const mapMutationTypes = {
  SET_SELECTED_VARIABLE: "SET_SELECTED_VARIABLE"
}

/** Vuex module for MapPage */
export default {
  namespaced: true,
  state: () => ({
    selectedVariable: "magnitude"
  }),

  mutations: {
    [mapMutationTypes.SET_SELECTED_VARIABLE](state, selectedVariable) {
      state.selectedVariable = selectedVariable;
    }
  }
}

