export const storeNamespace = "map"

export const mutationTypes = {
  SET_SELECTED_VARIABLE: "SET_SELECTED_VARIABLE"
}

/** Vuex module for MapPage */
export default {
  namespaced: true,
  state: () => ({
    selectedVariable: "magnitude"
  }),

  mutations: {
    [mutationTypes.SET_SELECTED_VARIABLE](state, selectedVariable) {
      state.selectedVariable = selectedVariable;
    }
  }
}

