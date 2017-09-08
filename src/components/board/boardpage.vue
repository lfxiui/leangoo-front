<template>
  <div class="board_content">
    <b-navbar toggleable="md" type="dark" style="background-color:rgb(14,116,175);">
      <b-navbar-brand href="#">{{boardId}}</b-navbar-brand>
      <b-nav is-nav-bar>
        <b-button-toolbar>
          <b-button-group class="mx-1" size="sm">
            <b-dropdown class="nav-button-drown" variant="default" size="sm">
              <template slot="button-content">
                8月31日 - 9月13日
              </template>
              This is dropdown
            </b-dropdown>
          </b-button-group>
          <b-button-group class="mx-1" size="sm" style="height:32px">
            <b-btn variant="default" class="nav-button">
              <icon name="area-chart"></icon>
            </b-btn>
            <b-btn variant="default" class="nav-button">
              <icon name="table"></icon>
            </b-btn>
            <b-btn variant="default" class="nav-button">
              <icon name="group" style="padding-top:2px"></icon>项目成员可见</b-btn>
          </b-button-group>
        </b-button-toolbar>
      </b-nav>
      <b-nav is-nav-bar class="ml-auto">
        <b-button-group size="sm" style="height:32px" class="mx-1">
          <b-btn class="ml-3" variant="default" style="background-color: #0E74AF" @click="right=0">
            <icon name="user" style="padding-top:2px"></icon>成员</b-btn>
          <b-btn class="ml-3" variant="default" style="background-color: #0E74AF" @click="right=0">
            <icon name="filter" style="padding-top:2px"></icon>筛选</b-btn>
          <b-btn class="ml-3" variant="default" style="background-color: #0E74AF" @click="right=0">
            <icon name="bars" style="padding-top:2px"></icon>菜单</b-btn>
        </b-button-group>
        <div class="slider-menu pull-right" :style="{'right':right+'px','height':height+'px'}">
          <div class="slider-menu-close" @click="right=-300">
            <icon name="chevron-right" scale="1.5" style="padding-top:5px"></icon>
          </div>
        </div>
      </b-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boardId: this.$route.params.boardId,
      right: -300
    }
  },
  computed:{
    height(){
      return window.innerHeight-150;
    }
  },
  created() {

  }
}
</script>

<style>
.board_content {
  width: 100%;
  height: 100%;
  position: fixed;
}

.nav-button {
  -webkit-transition-duration: 0.4s;
  /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  background-color: #0E74AF;
  color: white;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.nav-button-drown button {
  -webkit-transition-duration: 0.4s;
  /* Safari */
  transition-duration: 0.4s;
  background-color: #0E74AF;
  cursor: pointer;
  color: white;
}

.nav-button-drown button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.slider-menu {
  transition: right .2s;
  position: absolute;
  top: 0;
  width: 265px;
  border: none;
  right: 0px;
  height: 400px;
  background-color: #edeff0;
  box-shadow: -10px -7px 5px -10px #000;
  z-index: 1000;
}

.slider-menu-close {
  position: absolute;
  z-index: 2;
  top: 5px;
  left: -30px;
  width: 35px;
  height: 30px;
  cursor: pointer;
  background: #edeff0;
  box-shadow: -10px -7px 5px -10px #000;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
</style>
