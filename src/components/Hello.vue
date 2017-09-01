<template>
  <div class="main-div">
    <div class="boardList-selection">
      <div class="board_category">
        <b-button-toolbar>
          <icon name="user"></icon>
          <h6 style="padding-left: 15px">个人看板</h6>
          <b-button-group class="button-group1 mx-3" size="sm">
            <b-button variant="info">时间</b-button>
            <b-button variant="info">名称</b-button>
            <b-button variant="info">自定义</b-button>
          </b-button-group>
          <b-button variant="info" size="sm" style="background-color: rgba(255, 255, 255, 0.3)" @click="showCollapse"
                    v-b-toggle.collapse1>
            <icon :name="icon"></icon>
          </b-button>
        </b-button-toolbar>
        <b-collapse id="collapse1" no-body>
          <b-card>
            <div class="card-text">
              <b-card-group deck >
                <b-card
                        text-variant="white"
                  class="text-center newCard" no-body style="background-color: #4B97C3;height: 90px;max-width: 270px;cursor: pointer">
                  <div class="card-text">
                    <span style="font-size: 16px;line-height: 90px">新建看板</span>
                  </div>
                </b-card>
                <b-card
                  text-variant="white"
                  class="text-center" no-body style="background-color:#DFECF4;height: 90px;max-width: 270px;cursor: pointer"
                  border-variant="none">
                  <div class="card-text" style="color:rgb(85,85,85)">Card2</div>
                </b-card>
                <b-card
                  text-variant="white"
                  class="text-center" no-body style="background-color:#DFECF4;height: 90px;max-width: 270px;cursor: pointer">
                  <div class="card-text"style="color:rgb(85,85,85)">Card3</div>
                </b-card>
                <b-card
                  text-variant="white"
                  class="text-center" no-body style="background-color:#DFECF4;height: 90px;max-width: 270px;cursor: pointer">
                  <div class="card-text" style="color:rgb(85,85,85)">Card4</div>
                </b-card>
              </b-card-group>
            </div>
          </b-card>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        icon: 'chevron-down'
      }
    },
    methods: {
      showCollapse(){
        if (this.icon === 'chevron-down')
          this.icon = 'chevron-up';
        else this.icon = 'chevron-down'
      }
    }
  }
</script>


<style scoped>
  .main-div {
    color: white;
    margin: 0 auto;
    max-width: 1250px;
  }

  .boardList-selection {
    margin-top: 20px;
  }

  .button-group1 button {
    color: white;
    background-color: rgba(255, 255, 255, 0.3)
  }

  #collapse1 .card {
    background-color: #0E74AF;
    border: none;
  }
</style>
