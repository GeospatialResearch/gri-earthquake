<template>
  <div>
    <h1>Map Page :)))</h1>
    <div>
      {{ startDate }}
      {{ endDate }}
      {{ earthquakes }}
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "MapPage",

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