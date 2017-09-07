<template>
  <div class="menu-board">
    <div style="background-color:#F5F5F5 ">
      看板导航</div>
    <b-form-input placeholder="输入看板名称进行过滤..." size="sm" v-model="term"></b-form-input>
    <div class="nav-board">
      <b-btn v-b-toggle.c1 variant="default">
        <icon name="user" scale="1"></icon>
        <span>个人看板</span>
      </b-btn>
      <b-collapse id="c1">
        <div>
          <b-list-group style="margin:7px">
            <b-list-group-item v-for="(item,index) in personalResult" :key="index" :tag="'a'" style="margin-bottom:4px;height:40px;border-radius:4px;">
              <span class="thumbnail"></span>
              <span class="board-list-item-name">{{item.boardName}}</span>
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-collapse>
    </div>
    <div class="nav-board" v-for="(Project,index) in  searchResult" :key="index">
      <b-btn v-b-toggle="'m-collapse'+index" variant="default">
        <icon name="cubes" scale="1"></icon>
        <span>{{Project.projectName}}</span>
      </b-btn>
      <b-collapse :id="'m-collapse'+index">
        <div>
          <b-list-group style="margin:7px">
            <b-list-group-item v-for="(item,index) in Project.boardList" :key="index" :tag="'a'" style="margin-bottom:4px;height:40px;border-radius:4px;">
              <span class="thumbnail"></span>
              <span class="board-list-item-name">{{item.boardName}}</span>
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script >
import Bus from '../../bus.js'
export default {
  data() {
    return {
      term: '',
      personalBoard: [],
      projectList: [],
      searchResult: [],
      personalResult: [],
    }
  },
  watch: {
    term() {
      if (this.term != '') {
        this.$search(this.term, this.projectList, { keys: ["boardList.boardName"] }).then(result => {
          this.searchResult = result
        });
        this.$search(this.term, this.personalBoard, { keys: ["boardName"] }).then(result => {
          this.personalResult = result
        });
      }
      else {
        this.searchResult = this.projectList;
        this.personalResult = this.personalBoard
      }
    }
  },
  created() {
    Bus.$on('initPersonalBoard', personalBoard => {
      this.personalBoard = personalBoard;
      this.personalResult=personalBoard;
    });
    Bus.$on('initProjectList', projectList => {
      this.projectList = projectList;
      this.searchResult=projectList;
    })
  }
}

</script>

<style>
.menu-board {
  width: 300px;
  height: 500px;
  overflow: auto;
}

.menu-board button {
  width: 300px;
  background-color: white;
  color: #428BCA;
  text-align: left;
  font-size: 14px;
  line-height: 14px;
}

.menu-board button span {
  position: relative;
  bottom: 3px;
  line-height: 14px;
  font-size: 14px;
}

.thumbnail {
  position: absolute;
  background-color: #0E74AF;
  top: 0;
  left: 0;
  width: 45px;
  height: 100%;
  opacity: .7;
  display: block;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.board-list-item-name {
  overflow: hidden;
  margin-left: 26px;
  padding-left: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.nav-board {
  margin-top: 1px;
}
</style>
