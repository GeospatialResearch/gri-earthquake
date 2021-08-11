<template>
  <b-card id="range-selector">
    <div>
      <b-form-group label="Date range:" label-size="lg">
        <b-input-group>
          <label class="sr-only" for="date-range-from">Date range start</label>
          <b-form-input id="date-range-from" type="date" />
          <b-input-group-addon>
            <b-input-group-text> to</b-input-group-text>
          </b-input-group-addon>
          <label class="sr-only" for="date-range-to">Date range end</label>
          <b-form-input id="date-range-to" type="date" />
        </b-input-group>
      </b-form-group>

      <b-form-group label="Quick select: ">
      </b-form-group>

      <b-button>Load</b-button>
      <hr />
      <b-form-group label="Magnitude range:" label-size="lg">
      </b-form-group>

      <b-form-group v-slot="{ ariaDescribedBy }" label="Variable:" label-size="lg">
        <b-form-radio-group
            :aria-describedby="ariaDescribedBy"
            @change="$emit('selected-variable-change', selectedVariable)"
        >
          <b-form-radio v-model="selectedVariable" value="magnitude">Magnitude</b-form-radio>
          <b-form-radio v-model="selectedVariable" value="depth">Depth</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </div>
  </b-card>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "RangeSelector",
  props: {
    initialSelectedVariable: {
      type: String,
      validator(value) {
        return ['magnitude', 'depth'].includes(value);
      },
      default() {
        return "magnitude"
      }
    }
  },
  data() {
    return {
      selectedVariable: null,
    }
  },
  computed: {
    // Map store access: this.$store.state.X -> this.X
    ...mapState([
      'minMagnitude',
      'maxMagnitude'
    ]),
  },
  mounted() {
    this.selectedVariable = this.initialSelectedVariable;
  }
}
</script>

<style scoped>

</style>
