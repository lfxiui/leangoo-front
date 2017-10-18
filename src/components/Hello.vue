<template>
  <div class="main-div">
    <div class="boardList-section">
      <div class="board_category">
        <b-button-toolbar>
          <icon name="user"></icon>
          <h6 style="padding-left: 15px">个人看板</h6>
          <b-button-group class="button-group1 mx-3" size="sm">
            <b-button variant="info" @click="OrderByFlag = 'boardStartDate'">时间</b-button>
            <b-button variant="info" @click="OrderByFlag = 'boardName'">名称</b-button>
            <b-button variant="info" @click="OrderByFlag = ''">自定义</b-button>
          </b-button-group>
          <b-button variant="info" size="sm" style="background-color: rgba(255, 255, 255, 0.3)" @click="showCollapse" v-b-toggle.collapse1>
            <icon :name="icon"></icon>
          </b-button>
        </b-button-toolbar>
        <b-collapse id="collapse1" no-body>
          <b-card>
            <div class="card-text">
              <b-card text-variant="white" class="text-center mb-4 ignore-elements" no-body style="background-color:#4A97C3;height: 90px;max-width: 270px;cursor: pointer;min-width: 270px" border-variant="none" name="new" @click="newBoard(personalProjectId,personalBoard.length)">
                <div class="card-text">
                  <span style="font-size: 16px;line-height: 90px">新建面板</span>
                </div>
              </b-card>
              <draggable v-model="personalBoard" class="card-deck" :move="checkMove" :options="dragOptions" @end="dataDragEnd">
                <b-card v-for="(Board,index) in SortPersonalBoard" :key="index" text-variant="white" class="text-center mb-4" no-body style="background-color:#DFECF4;height: 90px;max-width: 270px;cursor: pointer;min-width: 270px" border-variant="none" @click="router(personalProjectId,Board.boardId)">
                  <div class="card-text" style="color:rgb(85,85,85)">
                    <span style="font-size: 16px;line-height: 90px">{{Board.boardName}}</span>
                    <span class="archive_icon" @click.stop="archivePersonalBoard(Board.boardId,index)">
                      <icon name="archive"></icon>
                    </span>
                  </div>
                </b-card>
              </draggable>
            </div>
          </b-card>
        </b-collapse>
      </div>
    </div>
    <div class="project-section mt-2" v-for="(Project,index) in  searchResult" :key="index">
      <div class="board_category">
        <b-button-toolbar>
          <icon name="cubes"></icon>
          <h6 style="padding-left: 15px">{{Project.projectName}}</h6>
          <b-button-group class="button-group1 mx-3" size="sm">
            <b-button variant="info" @click="projectRouter(Project.projectId,1)">项目成员</b-button>
            <b-button variant="info" @click="projectRouter(Project.projectId,2)">项目统计</b-button>
            <b-button variant="info" @click="archiveProject(Project.projectId)">归档</b-button>
          </b-button-group>
          <b-button variant="info" size="sm" style="background-color: rgba(255, 255, 255, 0.3)" v-b-toggle="'collapes'+index">
            <icon :name="icon"></icon>
          </b-button>
        </b-button-toolbar>
        <b-collapse no-body :id="'collapes'+index" class="coll">
          <b-card>
            <div class="card-text">
              <b-card text-variant="white" class="text-center mb-4 ignore-elements" no-body style="background-color:#4A97C3;height: 90px;max-width: 270px;cursor: pointer;min-width: 270px" border-variant="none" name="new" @click="newBoard(Project.projectId,Project.boardList.length)">
                <div class="card-text">
                  <span style="font-size: 16px;line-height: 90px">新建面板</span>
                </div>
              </b-card>
              <draggable v-model="Project.boardList" class="card-deck" :move="checkMove" @end="dataDragEnd">
                <b-card v-for="(Board,cindex) in Project.boardList" :key="cindex" text-variant="white" class="text-center mb-4" no-body style="background-color:#DFECF4;height: 90px;max-width: 270px;cursor: pointer;min-width: 270px" border-variant="none" @click="router(Project.projectId,Board.boardId)">
                  <div class="card-text" style="color:rgb(85,85,85)">
                    <span style="font-size: 16px;line-height: 90px">{{Board.boardName}}</span>
                    <span class="archive_icon" @click.stop="archiveBoard(Board.boardId,index,cindex)">
                      <icon name="archive"></icon>
                    </span>
                  </div>
                </b-card>
              </draggable>
            </div>
          </b-card>
        </b-collapse>
      </div>
    </div>
    <div class="archive-category">
      <ul>
        <li>
          <span v-b-modal.archiveBoardModal style="cursor: pointer">查看已归档看板</span>
        </li>
        <li>
          <span v-b-modal.archiveProjectModal style="cursor: pointer">查看已归档项目</span>
        </li>
      </ul>
    </div>

    <b-modal id="archiveBoardModal" ref="archiveBoardModal" title="已归档看板" style="color:black" :hide-footer="true">
      <table class="table table-hover" style="font-size:14px;">
        <tbody>
          <tr v-for="(item,index) in  archiveBoardList" :key="index">
            <td>{{item.boardName}}</td>
            <td>
              <a @click="reArchiveBoard(item.boardId)" style="cursor:pointer">撤销归档</a>&nbsp;&nbsp;&nbsp;
              <a @click="delBoard(item.boardId)" style="color:red;cursor:pointer">彻底删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </b-modal>

    <b-modal id="archiveProjectModal" ref="archiveProjectModal" title="已归档项目" style="color:black" :hide-footer="true">
      <table class="table table-hover" style="font-size:14px;">
        <tbody>
          <tr v-for="(item,index) in archiveProjectList" :key="index">
            <td>{{item.projectName}}</td>
            <td>
              <a @click="reArchiveProject(item.projectId)" style="cursor:pointer">撤销归档</a>&nbsp;&nbsp;&nbsp;
              <a @click="delProject(item.projectId)" style="color:red;cursor:pointer">彻底删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </b-modal>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Bus from '../bus.js'
export default {
  components: { draggable },
  data() {
    return {
      icon: 'chevron-down',
      OrderByFlag: 'boardLocate',
      disabled: true,
      projectList: [],
      searchResult: [],
      searhcOptions: { keys: ['boardName'] },
      personalBoard: [],
      archiveProjectList: [],
      archiveBoardList: [],
      term: '',
      newBoardName: null,
      selected: null,
      personalProjectId: '',
      boardLocate: '',
    }
  },
  watch: {
    OrderByFlag(newValue) {
      if (newValue === '') {
        this.disabled = false;
      } else this.disabled = true
    },
    term() {
      if (this.term != '')
        this.$search(this.term, this.projectList, { keys: ["boardList.boardName"] }).then(result => {
          this.searchResult = result
        }); else this.searchResult = this.projectList;
    }
  },
  computed: {
    SortPersonalBoard() {
      var filterKey = this.term;
      var data = this.personalBoard;
      if (filterKey != '') {
        data = this.personalBoard.filter(function(Board) {
          return Object.keys(Board).some(function(key) {
            return String(Board[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      return this.lodash.orderBy(data, this.OrderByFlag)
    },
    SortProjectBoard() {
      if (this.term != '')
        this.$search(this.term, this.projectList, { keys: ["boardList.boardName"] }).then(result => {
          this.searchResult = result
        });
      return this.projectList
    },
    dragOptions() {
      return {
        ghostClass: 'ghost',
        animation: 0,
        disabled: this.disabled
      }
    }
  },
  methods: {
    initArchiveData() {
      this.$ajax.post('/Project/getArchiveProject').then((res) => {
        this.archiveProjectList = res.data.data
      }).catch(res => { console.log(res) });
      this.$ajax.post('/Board/getArchiveBoardList').then((res) => {
        this.archiveBoardList = res.data.data
      }).catch(res => { console.log(res) })
    },
    reArchiveProject(projectId) {
      this.$ajax.post('/Project/reArchiveProject', { 'projectId': projectId }).then(res => {
        if (res.data.data > 0) {
          this.$notify.info({ title: '提示', message: '撤销成功' });
          this.$ajax.post('/Project/getUserProjectList').then((res) => {
            this.projectList = res.data.data;
            this.searchResult = res.data.data;
            this.initArchiveData();
            Bus.$emit('initProjectList', this.projectList)
          }).catch(res => {
            console.log(res)
          });
          this.$ajax.post('/Board/getUserPersonalBoardList').then((res) => {
            if (res.data.data != null)
              this.personalBoard = res.data.data
            Bus.$emit('initPersonalBoard', this.personalBoard)
          }).catch(res => { console.log(res) });
        } else this.$notify.error({ title: '提示', message: '操作失败' })
      })
    },
    delProject(projectId) {
      this.$ajax.post('/Project/delProject', { 'projectId': projectId }).then(res => {
        if (res.data.data > 0) {
          this.$notify.info({ title: '提示', message: '删除成功' });
          this.$ajax.post('/Project/getUserProjectList').then((res) => {
            this.projectList = res.data.data;
            this.searchResult = res.data.data;
            this.initArchiveData();
            Bus.$emit('initProjectList', this.projectList)
          }).catch(res => {
            console.log(res)
          });
          this.$ajax.post('/Board/getUserPersonalBoardList').then((res) => {
            if (res.data.data != null)
              this.personalBoard = res.data.data
            Bus.$emit('initPersonalBoard', this.personalBoard)
          }).catch(res => { console.log(res) });
        } else this.$notify.error({ title: '提示', message: '操作失败' })
      })
    },
    reArchiveBoard(boardId) {
      this.$ajax.post('/Board/reArchiveBoard', { 'boardId': boardId }).then(res => {
        if (res.data.data > 0) {
          this.$notify.info({ title: '提示', message: '撤销成功' });
          this.$ajax.post('/Project/getUserProjectList').then((res) => {
            this.projectList = res.data.data;
            this.searchResult = res.data.data;
            this.initArchiveData();
            Bus.$emit('initProjectList', this.projectList)
          }).catch(res => {
            console.log(res)
          });
          this.$ajax.post('/Board/getUserPersonalBoardList').then((res) => {
            if (res.data.data != null)
              this.personalBoard = res.data.data
            Bus.$emit('initPersonalBoard', this.personalBoard)
          }).catch(res => { console.log(res) });
        } else this.$notify.error({ title: '提示', message: '操作失败' })
      })
    },
    delBoard(boardId) {
      this.$ajax.post('/Board/delBoard', { 'boardId': boardId }).then(res => {
        if (res.data.data > 0) {
          this.$notify.info({ title: '提示', message: '删除成功' });
          this.$ajax.post('/Project/getUserProjectList').then((res) => {
            this.projectList = res.data.data;
            this.searchResult = res.data.data;
            this.initArchiveData();
            Bus.$emit('initProjectList', this.projectList)
          }).catch(res => {
            console.log(res)
          });
          this.$ajax.post('/Board/getUserPersonalBoardList').then((res) => {
            if (res.data.data != null)
              this.personalBoard = res.data.data
            Bus.$emit('initPersonalBoard', this.personalBoard)
          }).catch(res => { console.log(res) });
        } else this.$notify.error({ title: '提示', message: '操作失败' })
      })
    },
    archiveProject(projectId) {
      this.$ajax.post('/Project/archiveProject', { 'projectId': projectId }).then(res => {
        if (res.data.errcode === 0) {
          this.$notify.info({ title: '提示', message: '归档成功' });
          this.$ajax.post('/Project/getUserProjectList').then((res) => {
            this.projectList = res.data.data;
            this.searchResult = res.data.data;
            this.initArchiveData();
            Bus.$emit('initProjectList', this.projectList)
          }).catch(res => {
            console.log(res)
          })
        } else this.$notify.error({ title: '提示', message: '归档失败' })
      })
    },
    archivePersonalBoard(boardId, index) {
      this.$ajax.post('/Board/archiveBoard', { 'boardId': boardId }).then(res => {
        if (res.data.data > 0) {
          this.$notify.info({ title: '提示', message: '归档成功' });
          this.personalBoard.splice(index, 1);
          this.initArchiveData();
        }
        else this.$notify.error({ title: '警告', message: '归档失败' })
      })
    },
    archiveBoard(boardId, pindex, bindex) {
      this.$ajax.post('/Board/archiveBoard', { 'boardId': boardId }).then(res => {
        if (res.data.data > 0) {
          this.$notify.info({ title: '提示', message: '归档成功' });
          this.projectList[pindex].boardList.splice(bindex, 1); 
          this.initArchiveData();
        } else is.$notify.error({ title: '警告', message: '归档失败' })
      })
    },
    newBoard(ProjectId, BoardLocate) {
      this.selected = ProjectId;
      const data = [];
      data.push({ text: '个人看板', value: this.personalProjectId })
      for (let i = 0; i < this.projectList.length; i++) {
        data.push({ text: this.projectList[i].projectName, value: this.projectList[i].projectId })
      }
      Bus.$emit('showNewBoardModal', [data, ProjectId, BoardLocate])
    },
    showCollapse() {
      if (this.icon === 'chevron-down')
        this.icon = 'chevron-up';
      else this.icon = 'chevron-down'
    },
    checkMove({ relatedContext, draggedContext }) {
      const draggedElment = draggedContext.element
      const relatedElement = relatedContext.element;
      console.log("drag" + draggedElment.boardName);
      console.log("relate" + relatedElement.boardName)
      return true;
    },
    dataDragEnd(evt) {

    },
    router(projectId, boardId) {
      this.$router.push({ path: '/board/' + projectId + '/' + boardId })
    },
    projectRouter(projectId, tab) {
      this.$router.push({ path: '/project/' + projectId + '/' + tab })
    }
  },
  created() {
    this.$ajax.post('/Project/getArchiveProject').then((res) => {
      this.archiveProjectList = res.data.data
    }).catch(res => { console.log(res) });
    this.$ajax.post('/Board/getArchiveBoardList').then((res) => {
      this.archiveBoardList = res.data.data
    }).catch(res => { console.log(res) });
    this.$ajax.post('/Project/getUserProjectList').then((res) => {
      this.projectList = res.data.data;
      this.searchResult = res.data.data;
      Bus.$emit('initProjectList', this.projectList);
      this.$ajax.post('/Project/getUserPersonalProjectId').then(res => {
        this.personalProjectId = res.data.data;
        this.selected = this.personalProjectId;
        const data = [];
        data.push({ text: '个人看板', value: this.personalProjectId })
        for (let i = 0; i < this.projectList.length; i++) {
          data.push({ text: this.projectList[i].projectName, value: this.projectList[i].projectId })
        }
        Bus.$emit('selectOptions', [data, this.selected, 99])
        Bus.$emit('initPersonalProjectId', this.personalProjectId);

      })
    }).catch(res => {
      console.log(res)
    }),
      this.$ajax.post('/Board/getUserPersonalBoardList').then((res) => {
        if (res.data.data != null)
          this.personalBoard = res.data.data
        Bus.$emit('initPersonalBoard', this.personalBoard)
      }).catch(res => { console.log(res) }),
      Bus.$on('search', value => {
        this.term = value;
      });
    Bus.$emit('login_ok')
  }
}
</script>


<style scoped>
.main-div {
  color: white;
  margin: 0 auto;
  max-width: 1250px;
  overflow: auto;
}

.modal-body {
  color: black;
}

.modal-content {
  color: black
}

.boardList-section {
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

.coll .card {
  background-color: #0E74AF;
  border: none
}

.archive_icon {
  color: #555;
  text-align: right;
  position: absolute;
  top: 70px;
  right: 5px;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}

.archive-category {
  float: left;
  margin-top: 30px;
}

.archive-category ul {
  list-style: none;
}

.archive-category ul li a {
  color: white;
  text-decoration: underline;
}
</style>
