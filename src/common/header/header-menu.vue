<template>
  <b-navbar toggleable="md" style="background-color:rgba(0,0,0,0.15)" type="dark" :sticky="isSticky">
    <b-nav-toggle target="nav_collapse"></b-nav-toggle>

    <b-navbar-brand to="/index"><img src="../../assets/team_logo.png" height="34px" width="130px"></b-navbar-brand>

    <b-nav-form>
      <input type="text" id="header-search" v-model="term" :style="{'background-color':searchbg}" @blur="searchbg='rgba(255, 255, 255, 0.3)'" @focus="searchbg='white'">
      <icon name="search" scale="1.2" style="color: white;position: relative;left: -25px;cursor: pointer" :style="{'color':searchIconBg}"></icon>
    </b-nav-form>
    <ul class="header-center">
      <li>
        <a class="btn btn-default" href="https://www.leangoo.com/event.html" target="_blank">活动</a>
      </li>
      <li>
        <a class="btn btn-default" href="https://www.leangoo.com/category/%E6%96%87%E7%AB%A0" target="_blank">文章</a>
      </li>
      <li>
        <a class="btn btn-default" href="http://www.scrumcn.com/agile/" target="_blank">课程</a>
      </li>
    </ul>
    <b-nav is-nav-bar class="ml-auto">
      <b-nav-item-dropdown right variant="defalut" size="sm" :no-caret="no_caret">
        <template slot="button-content">
          <icon name="plus" scale="1" size="sm"></icon>
        </template>
        <div class="newButton">
          <div style="border-bottom: 1px rgb(140,140,140) inset;background-color:#F5F5F5 ">
            <h5 class="text-center">新建</h5>
          </div>
          <span v-b-modal.newBoardModal>新建看板</span>
          <p>一个看板包括多个列表,每个列表包括多个任务卡片,团队通过看板共享任务,在线实时协作</p>
          <span @click="newProject">新建项目</span>
          <p>一个项目包括多个看板和多名项目成员,通过项目可以对看板进行分组管理,更好的实现项目协作</p>
        </div>
      </b-nav-item-dropdown>
      <b-button-group size="sm" style="margin-right:3px">
        <b-button variant="default" size="sm">
          <icon name="bars" scale="1"></icon>
        </b-button>
        <b-nav-item-dropdown right variant="default" size="sm">
          <template slot="button-content">
            看板导航</icon>
          </template>
          <menu-board></menu-board>
        </b-nav-item-dropdown>
      </b-button-group>
      <b-button-group>
        <img :src="userAvatar" width="32px" height="32px">
        <b-nav-item-dropdown right variant="default" size="sm" :no-caret="no_caret">
          <template slot="button-content">
            {{userAccount}}
          </template>
          <b-dropdown-item  to="/profile" :exact="true"  exact-active-class="no_active">用户中心</b-dropdown-item>
          <b-dropdown-item  :disabled="true" :exact="true"  exact-active-class="no_active">常用快捷操作</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item  :disabled="true" :exact="true"  exact-active-class="no_active">意见反馈</b-dropdown-item>
          <b-dropdown-item  :disabled="true":exact="true"  exact-active-class="no_active">版本更新</b-dropdown-item>
          <b-dropdown-item to="/index"  :exact="true"  exact-active-class="no_active">返回首页</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="/leangoo/logout" :exact="true"  exact-active-class="no_active">退出 </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-button-group>
    </b-nav>
    <b-modal id="newProjectModal" ref="newProjectModal" title="新建项目" style="color:black" @ok="saveProject" ok-title="保存" close-title="取消" size="sm">
      <b-form>
        <b-form-group label-for="projectName" label="项目名称">
          <b-form-input id="projectName" v-model="newProjectName"></b-form-input>
        </b-form-group>
        <b-form-group label="项目介绍(可空)" label-for="projectIntro">
          <b-form-textarea id="projectIntro" :rows="4" v-model="newProjectIntro"></b-form-textarea>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal id="newBoardModal" ref="newBoardModal" title="新建看板" style="color:black" @ok="newBoard" ok-title="保存" close-title="取消">
      <b-form :inline="true">
        <label for="newBoardName">看板名称</label>
        <b-form-input id="newBoardName" size="sm" v-model="newBoardName"></b-form-input>
        <label for="projectName">所属项目</label>
        <b-form-select id="projectName" :options="selectOptions" v-model="selected"></b-form-select>
      </b-form>
    </b-modal>
  </b-navbar>
</template>


<script>
import MenuBoard from '../../common/header/menu-board.vue'
import Bus from '../../bus.js'
export default {
  components: {
    MenuBoard
  },
  watch: {
    term(newValue) {
      Bus.$emit('search', newValue);
    }
  },
  computed: {
    searchIconBg() {
      if (this.searchbg === 'rgba(255, 255, 255, 0.3)')
        return 'white'
      else return 'black'
    }
  },
  methods: {
    saveProject() {
      if (this.newProjectName == '') {
        this.$notify.error({ title: '错误', message: '项目名为空创建失败', duration: 3000 })
      } else {
        var params = new URLSearchParams;
        if (this.newProjectIntro != '')
          var data = { 'projectName': this.newProjectName, 'projectIntro': this.newProjectIntro }
        else var data = { 'projectName': this.newProjectName }
        this.$ajax.post('/Project/newProject', data).then(res => {
          this.newProjectIntro = '';
          this.newProjectName = '';
          this.$router.push({ path: '/project/' + res.data.data + '/' + 0 }).catch(res => { this.$notify.error({ title: '警告', message: '创建失败' }) })
        })
      }
    },
    newBoard() {
      var params = new URLSearchParams;
      params.append('boardName', this.newBoardName)
      params.append('boardLocate', this.boardLocate)
      params.append('projectId', this.selected)
      console.log(params)
      this.$ajax.post('/Board/newBoard', params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.newBoardName = null
        this.$router.push({ path: '/board/' + this.selected + '/' + res.data.data })
      })
    },
    newProject() {
      this.$refs.newProjectModal.show()
    }
  },
  data() {
    return {
      isSticky: true,
      no_caret: true,
      userAccount: '',
      userAvatar: '',
      term: '',
      newProjectName: '',
      newProjectIntro: '',
      selectOptions: [],
      newBoardName: '',
      selected: '',
      boardLocate: '',
      searchbg: 'rgba(255, 255, 255, 0.3)',
    }
  },
  created() {
    this.$ajax.post('/Login/getUserInfo').then(res => { this.userAccount = res.data.data.userAccount; this.userAvatar = res.data.data.userAvatar }).catch(res => { console.log(res) })
    Bus.$on('selectOptions', data => {
      this.selectOptions = data[0];
      this.selected = data[1];
      this.boardLocate = data[2];
    }),
      Bus.$on('updateAvatar', res => {
        this.userAvatar = res;
      })
    Bus.$on('showNewBoardModal', data => {

      this.selectOptions = data[0];
      this.selected = data[1];
      this.boardLocate = data[2];
      this.$refs.newBoardModal.show()
    })
  }
}

</script>

<style>
.navbar {
  height: 43px;
}

#header-search {
  border-radius: 9px;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
}

.header-center {
  position: absolute;
  left: 45%;
  top: 0;
  font-size: 14px;
  line-height: 20px;
  list-style: none;
}

.header-center li {
  list-style: none;
  float: left;
}

.header-center li a {
  color: white;
  cursor: pointer;
}

.ml-auto button {
  height: 32px;
  background-color: rgba(255, 255, 255, 0.3) !important;
  color: rgb(255, 255, 255) ! important;
  cursor: pointer;
}

.ml-auto .nav-link:link {
  font-size: 14px;
  line-height: 14px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.3) ! important;
  color: rgb(255, 255, 255) ! important;
  border-radius: 4px;
}

.ml-auto .nav-link {
  font-size: 14px;
  line-height: 14px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.3) ! important;
  color: rgb(255, 255, 255) ! important;
  border-radius: 4px;
}

.newButton {
  width: 300px;
}

.newButton p {
  font-size: 12px;
  color: rgb(140, 140, 140) ! important;
}

.newButton span {
  font-size: 14px;
  color: black;
  cursor: pointer;
}
</style>
