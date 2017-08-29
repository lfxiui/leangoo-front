<template>
  <div class="div_main">
    <div class="boardlist-section my-board-section">
        <div class="board_category">
          <div class="category_name">
           <i class="el-icon-document"></i>
          </div>
           <h5>个人看板</h5>
           <div class="ccategory_tools">
             
           </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>


<style scoped>
.div_main{
  color: white;
  margin: 0 auto;
  font-size: 14px;
  line-height: 14px;
}
.board_category{
  margin-top: 30px;
  margin-left: 120px;
  position: relative;
}
.board_category h5{
  margin-top: 4px;
  margin-bottom: auto;
  float: left;
}
.category_name{
  position: absolute;
  top: 3px;
  left: -25px;
}
</style>
