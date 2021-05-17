<template>
  <div class="navbar navbar-default navbar-static-top" role="navigation">
    <div class="navbar-header">
      <span class="navbar-brand">NZ Earthquake viewer</span>
    </div>
    <ul class="nav navbar-nav">
      <li :class="{ active: this.$route.name === 'Map' }">
        <router-link :to="{name: 'Map'}">Map</router-link>
      </li>
      <li :class="{ active: this.$route.name === 'DataTable' }">
        <router-link :to="{name: 'DataTable'}">Data table</router-link>
      </li>
      <li :class="{ active: this.$route.name === 'Plots' }">
        <router-link :to="{name: 'Plots'}">Plots</router-link>
      </li>
      <li :class="{ active: this.$route.name === 'About' }">
        <router-link :to="{name: 'About'}">About</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>


</style>