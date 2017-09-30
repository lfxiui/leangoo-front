<template>

  <div id="app">
  <header-menu v-show="isLogin"></header-menu>
  <router-view></router-view>
</div>
</template>

<script>
  import HeaderMenu from "./common/header/header-menu.vue"
  import Bus from "./bus"
export default {
  components: {
  HeaderMenu},
  name: 'app',
  data(){
    return{
      isLogin:false
    }
  },
  created(){
    Bus.$on('login_ok',()=>{
      this.isLogin=true;
    })
  }
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
  height: 100%;
  width: 100%;
  position:absolute;
}
</style>
