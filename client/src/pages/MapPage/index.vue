<template>
  <div>
    <range-selector/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import RangeSelector from "./RangeSelector";

export default {
  name: "MapPage",
  title: "Map",

  components: {RangeSelector},
  data: function () {
    return {
    }
  },

  computed: {
    ...mapState([
      'earthquakes',
      'startDate',
      'endDate'
    ])
  },

  methods: {}
}
</script>

<style scoped>

</style>