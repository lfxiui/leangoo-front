<template>
  <div class="board_content">
      BoardId={{boardId}}
  </div>
</template>

<script>
export default {
 data(){
   return{
     boardId:this.$route.params.boardId
   }
 }
}
</script>

<style>
.board_content{
  background-color: white;
    width: 100%;
    height: 100%;
    position: fixed;
}
</style>
