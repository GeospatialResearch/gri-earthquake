<template>
  <b-container fluid>
    <div>
      <b-form-group
          label="Filter"
          label-for="filter-input"
      >
        <b-input-group>
          <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
          />
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>
    <div>
      <b-form-group
          label="Per page"
          label-for="per-page-select"
      >
        <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
        />
      </b-form-group>
    </div>
    <b-table
        :items="earthquakes"
        :fields="fields"
        :busy.sync="loadingStatus"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        @filtered="onFiltered"
        primary-key="publicid"
        striped
        hover
    />
    <div>
      <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
      />
    </div>
  </b-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "DataTablePage",
  title: "Data Table",

  data: function () {
    return {
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: "",
      fields: [
        {key: 'index', sortable: true},
        {key: 'publicid', sortable: true, label: 'Public ID'},
        {key: 'origintime', sortable: true, label: 'Origin Time'},
        {key: 'depth', sortable: true},
        {key: 'latitude', sortable: true},
        {key: 'longitude', sortable: true},
        {key: 'magnitude', sortable: true},
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
  },

  watch: {
    loadingStatus: function (isLoading) {
      if (!isLoading) {
        this.totalRows = this.earthquakes.length;
        this.currentPage = 1;
        this.filter = null;
      }
    }
  },

  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>

</style>