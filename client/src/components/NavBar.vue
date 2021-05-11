<template>
  <div>
    <router-link :to="{name: 'Map'} "><button>Map</button></router-link>
    <router-link :to="{name: 'DataTable'}"><button>Data table</button></router-link>
    <router-link :to="{name: 'Plots'}"><button>Plots</button></router-link>
    <router-link :to="{name: 'About'}"><button>About</button></router-link>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

</style>