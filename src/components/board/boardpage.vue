<template>
  <div class="board_content">
    <b-navbar toggleable="md" type="dark" style="background-color:rgb(14,116,175);">
      <b-navbar-brand href="#">{{boardId}}</b-navbar-brand>
      <b-nav is-nav-bar>
      <b-button-toolbar>
        <b-button-group class="mx-1" size="sm">
          <b-dropdown class="nav-button-drown" variant="default" size="sm" >
            <template slot="button-content">
              8月31日 - 9月13日
            </template>
            This is dropdown
          </b-dropdown>          
        </b-button-group>
        <b-button-group class="mx-1" size="sm" style="height:32px" >
          <b-btn variant="default" class="nav-button"><icon name="area-chart"></icon></b-btn>
          <b-btn variant="default" class="nav-button"><icon name="table"></icon></b-btn>
          <b-btn variant="default" class="nav-button"><icon name="group" style="padding-top:2px"></icon>项目成员可见</b-btn>
        </b-button-group>
      </b-button-toolbar>
      </b-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boardId: this.$route.params.boardId
    }
  },
  created(){
    
  }
}
</script>

<style>
.board_content {
  width: 100%;
  height: 100%;
  position: fixed;
}
.nav-button{
   -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    background-color: #0E74AF;
    color: white;
}
.nav-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
}
.nav-button-drown button{
   -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    background-color: #0E74AF;
    color: white;
}
.nav-button-drown button:hover{
   background-color: rgba(255, 255, 255, 0.3);
    color: white;
}

</style>
