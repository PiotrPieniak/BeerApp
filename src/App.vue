<template>
  <div id="app">
    <button class="w3-button w3-white w3-border w3-round-large">
      <router-link to="/">Beers</router-link>
    </button>
    <button class="w3-button w3-white w3-border w3-round-large">
      <router-link to="/brewers">Brewers</router-link>
    </button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      currentSort: 'amount',
      currentSortDir: 'desc',
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
