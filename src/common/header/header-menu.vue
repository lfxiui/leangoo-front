<template>
  <div>
    <el-menu class="header" theme="dark" mode="horizontal">
      <li class="header-left">
        <img src="../../assets/leangoo_logo.png" height="38" style="float: left">
        <ul>
          <li>
            <input class="input">
            <span class="el-icon-search" aria-hidden="true"></span>
          </li>
        </ul>
      </li>
      <li class="header-center">
        <ul>
          <li><a href="#">活动</a></li>
          <li><a href="#">文章</a></li>
          <li><a href="#">课程</a></li>
        </ul>
      </li>
      <li class="header-right">
        <menu-right></menu-right>
      </li>
    </el-menu>
  </div>
</template>
<script type="text/ecmascript-6">
  import ElMenu from "../../../node_modules/element-ui/packages/menu/src/menu";
  import ElMenuItem from "../../../node_modules/element-ui/packages/menu/src/menu-item";
  import ElSubmenu from "../../../node_modules/element-ui/packages/menu/src/submenu";
  import MenuRight from "../../common/header/menu-right.vue"
  export default{
    components: {
      ElSubmenu,
      ElMenuItem,
      ElMenu,
      MenuRight
    },
    data() {
      return {

      }
    },
    methods: {

    }

  }
</script>
<style scoped>
  a {
    text-decoration: none;
    color: #cccccc;
  }

  .header {
    background: #0C6395;
    height: 45px;
    margin: 0;
    color: white;
    overflow: hidden;
  }

  .header li {
    float: left;
    width: 33%;
  }

  .input {
    width: 200px;
    height: 28px;
    border-radius: 9px;
    display: inline-block;
    float: left;
    border: none;
    margin-top: 7px;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .el-icon-search {
    clear: both;
    float: left;
    position: relative;
    left: 170px;
    margin-top: -20px;
    z-index: 2;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .header-center ul{
    position: relative;
    left: 30%;
  }
  .header-center ul li{
    float: left;
    height: 45px;
    line-height: 45px;
    width: 50px;
  }
</style>
