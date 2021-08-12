<template>
  <b-card id="range-selector">
    <div>
      <b-form-group label="Date range:" label-size="lg">
        <b-input-group>
          <label class="sr-only" for="date-range-from">Date range start</label>
          <b-form-input
              id="date-range-from"
              v-model="startDate"
              type="date"
          />
          <b-input-group-addon>
            <b-input-group-text>to</b-input-group-text>
          </b-input-group-addon>
          <label class="sr-only" for="date-range-to">Date range end</label>
          <b-form-input
              id="date-range-to"
              v-model="endDate"
              type="date"
          />
        </b-input-group>
      </b-form-group>

      <b-form-group label="Quick select: ">
      </b-form-group>

      <b-button>Load</b-button>
      <hr />
      <b-form-group label="Magnitude range:" label-size="lg">
      </b-form-group>

      <b-form-group v-slot="{ ariaDescribedBy }" label="Variable:" label-size="lg">
        <b-form-radio-group v-model="selectedVariable" :aria-describedby="ariaDescribedBy">
          <b-form-radio value="magnitude">Magnitude</b-form-radio>
          <b-form-radio value="depth">Depth</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </div>
  </b-card>
</template>

<script>
import {mapState} from "vuex";
import {mapMutationTypes, storeNamespace} from "./store";
import {SET_END_DATE, SET_START_DATE} from "@/store/mutation-types";

export default {
  name: "RangeSelector",
  computed: {
    // Map store access: this.$store.state.X -> this.X
    ...mapState([
      'minMagnitude',
      'maxMagnitude'
    ]),
    startDate: {
      get() {
        return this.$store.state.startDate;
      },
      set(newStartDate) {
        this.$store.commit(SET_START_DATE, newStartDate);
      }
    },
    endDate: {
      get() {
        return this.$store.state.endDate;
      },
      set(newEndDate) {
        this.$store.commit(SET_END_DATE, newEndDate);
      }
    },
    selectedVariable: {
      get() {
        return this.$store.state.map.selectedVariable;
      },
      set(newVariable) {
        this.$store.commit(`${storeNamespace}/${mapMutationTypes.SET_SELECTED_VARIABLE}`, newVariable)
      }
    }
  },
}
</script>

<style scoped>

</style>
