<template>
  <!-- Navigation Bar to allow switching between different pages in the app -->
  <div>
    <b-navbar type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse" />
      <b-navbar-brand :to="{name: 'Map'}">NZ Earthquake Viewer</b-navbar-brand>
      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{name: 'Map'}">Map</b-nav-item>
          <b-nav-item :to="{name: 'DataTable'}">Data Table</b-nav-item>
          <b-nav-item :to="{name: 'Plots'}">Plots</b-nav-item>
          <b-nav-item :to="{name: 'About'}">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "AppNavBar"
}
</script>

<style scoped>

</style>