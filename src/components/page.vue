<template>
<div>
   <header-menu></header-menu>
   <router-view></router-view>
</div>
</template>

<script>
 import HeaderMenu from "./common/header/header-menu.vue"
export default {
components:{
     HeaderMenu
}
}
</script>

<style>

</style>
