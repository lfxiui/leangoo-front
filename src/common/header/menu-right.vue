<template>
  <ul style="float: right">
    <li style="float: left">
      <el-button icon="plus" class="addButton" size="small" type="info" @click="loadData"></el-button>
    </li>
    <li style="float: left">
      <el-dropdown style="margin-left: 5px">
        <el-button-group class="addButtonGroup">
          <el-button icon="menu" size="small" type="into" style="margin-right: -4px;"></el-button>
          <el-button size="small" type="info">看导航版
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
        </el-button-group>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
    <li style="float: left">
      <span class="avatar"><img src="../../assets/logo.png" width="32px" height="28px" style="background-color: #0C6395"></span>
      <el-button size="small" type="info" class="userButton">{{ UserAccount }}</el-button>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  components: {
  },
  data() {
    return {
      UserAccount: ''
    }
  },
  methods: {
    loadData(){
      this.$ajax.post('/api/User').then((res)=>{this.UserAccount=res.data[0].account}).catch((res)=>console.log(res))
    }
  },
  created() {
      this.$ajax.get('/api/getUserInfo').then((res)=>{this.UserAccount=res.data.UserIntro})
  }
}

</script>

<style>
.addButton {
  background-color: rgba(255, 255, 255, 0.3);
  margin-top: 7px;
}

.addButtonGroup button {
  margin-top: 7px;
  background-color: rgba(255, 255, 255, 0.3);
}

.userButton {
  float: left;
  background-color: rgba(255, 255, 255, 0.3);
  margin-top: 7px;
}

.avatar {
  float: left;
  margin-left: 5px;
  margin-top: 7px;
}
</style>
