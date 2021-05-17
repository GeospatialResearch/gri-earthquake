<template>
  <div id="app">
    <nav-bar/>
    <div class="container-fluid">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: 'App',
  components: {
    NavBar,
  },
  created() {
    this.$store.dispatch('updateEarthquakes')
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
