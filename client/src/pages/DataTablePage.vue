<template>
  <div>
    <b-table striped
             hover
             :items="earthquakes"
             :fields="fields"
             :busy.sync="loadingStatus"
             primary-key="publicid"
    >
    </b-table>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "DataTablePage",

  data: function () {
    return {
      fields: [
        { key: 'index', sortable: true },
        { key: 'publicid', sortable: true, label: 'Public ID' },
        { key: 'origintime', sortable: true, label: 'Origin Time'},
        { key: 'depth', sortable: true },
        { key: 'latitude', sortable: true },
        { key: 'longitude', sortable: true },
        { key: 'magnitude', sortable: true },
      ]
    }
  },

  computed: {
    ...mapState([
      'loadingStatus',
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