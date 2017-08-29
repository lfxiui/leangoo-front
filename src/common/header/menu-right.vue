<template>
  <ul style="float: right">
    <li style="float: left">
      <el-dropdown trigger="click">
      <el-button icon="plus" class="addButton" size="small" type="primary">
      </el-button>
      <el-dropdown-menu>
      <el-card header="新建" body-style="width:300px;padding:0;height:180px">
        <div>
          <span style=" cursor: pointer;color:black" @click="newBoard">新建看版...</span>
          <p style="font-size:14px">一个看板包括多个列表,每个列表包括多个任务卡片,团队通过看板共享任务,实时协作</p>
        </div>
         <div >
          <span style="cursor: pointer;" @click="newProject">新建项目...</span>
          <p style="font-size:14px">一个项目包括多个看板和多名项目成员,通过项目对看板进行分组管理,更好的实现项目写作</p>
        </div>
      </el-card>
      </el-dropdown-menu>
      </el-dropdown>
    </li>
    <li style="float: left">
      <el-button-group class="addButtonGroup">
        <el-button icon="menu" size="small" type="primary"></el-button>
        <el-dropdown trigger="click">
          <el-button size="small" type="primary">看导航版
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu style="width:300px">
            <menu-dropdown></menu-dropdown>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button-group>
    </li>
    <li style="float: left">
      <span class="avatar"><img src="../../assets/agzou.jpg" width="32px" height="28px" style="background-color: #0C6395"></span>
      <el-dropdown trigger="click">
        <el-button size="small" type="info" class="userButton">{{ UserAccount }}</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/profile">用户中心</router-link>
          </el-dropdown-item>
          <el-dropdown-item>设置背景</el-dropdown-item>
          <el-dropdown-item>版本更新</el-dropdown-item>
          <el-dropdown-item><router-link to="/">回到首页</router-link></el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
import MenuDropdown from './menu-dropdown'
export default {
  components: {
    MenuDropdown
  },
  data() {
    return {
      UserAccount: ''
    }
  },
  methods: {
   newBoard(){
     console.log("newBoard on click")
   },
   newProject(){
     console.log("newProject on click")
   }
  },
  created() {
    this.$ajax.get('/getUserInfo').then((res) => { this.UserAccount = res.data.UserIntro })
  }
}

</script>

<style>
a{
   text-decoration: none;
   color: #48576a;
}
.addButton {
  background-color: rgba(255, 255, 255, 0.3);
  margin-top: 7px;
  border:none;
}

.addButtonGroup button {
  margin-top: 7px;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
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
