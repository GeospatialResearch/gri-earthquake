<template>
  <div>
    <table>
      <thead>
        <tr>
         <th scope="col"/> <!--  For the index column-->
          <th v-for="header in tableHeaders"
              :key="header"
              scope="col">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(earthquake, i) in earthquakes"
            :key="earthquake.publicid">
          <td>{{ i }}</td>
          <td v-for="[key, value] of Object.entries(earthquake)"
              :key="key">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "DataTablePage",

  computed: {
    ...mapState([
      'earthquakes',
      'startDate',
      'endDate'
    ]),
    tableHeaders: function () {
      if (this.earthquakes[0])
        return Object.keys(this.earthquakes[0])
      return null
    }
  },
}
</script>

<style scoped>

</style>