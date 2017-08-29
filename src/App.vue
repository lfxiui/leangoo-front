<template>

  <div id="app">
    <header-menu></header-menu>
  <router-view></router-view>
</div>
</template>

<script>
  import HeaderMenu from "./common/header/header-menu.vue"
export default {
  components: {
  HeaderMenu},
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(14,116,175);
  margin: 0;
  padding: 0;
}
</style>
