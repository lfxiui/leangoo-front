<template>
  <div class="profile_content" style="overflow: auto">
    <project-manage></project-manage>
  </div>
</template>

<script>
  import ProjectManage from './projectManage.vue'
  export default {
    components : {
      ProjectManage
    }
  }
</script>

<style scoped>
  .profile_content{
    background-color: white;
    width: 100%;
    height: 100%;
    position: fixed;
  }
</style>
