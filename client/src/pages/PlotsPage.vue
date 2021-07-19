<template>
<!-- Page to show earthquake data in plots -->
  <b-container fluid>
    <b-row>
      <b-col>
        <Plotly :data="plotData"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Plotly :data="plotData"/>
      </b-col>
      <b-col>
        <Plotly :data="plotData"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {Plotly} from 'vue-plotly';

export default {
  name: "PlotsPage",
  title: "Plots",

  components: {
    Plotly
  },

  data: function () {
    return {
      plotData: [{
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: "scatter"
      }],
    }
  },

}
</script>

<style scoped>

</style>