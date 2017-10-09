<template>
    <div class="profile_content" style="overflow: auto">
      <user-info></user-info>

    </div>
</template>

<script>
  import UserInfo from './userInfo.vue'
  import Bus from '../../bus'
  export default {
      components : {
            UserInfo
        },
        created(){
          Bus.$emit('login_ok')
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
