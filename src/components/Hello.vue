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
              <b-card text-variant="white" class="text-center mb-4 ignore-elements" no-body style="background-color:#4A97C3;height: 90px;max-width: 270px;cursor: pointer;min-width: 270px" border-variant="none" name="new" >
                <div class="card-text">
                  <span style="font-size: 16px;line-height: 90px">新建面板</span>
                </div>
              </b-card>
              <draggable v-model="personalBoard" class="card-deck" :move="checkMove" :options="dragOptions" @update="datadragEnd">
                <b-card v-for="(Board,index) in SortPersonalBoard" :key="index" text-variant="white" class="text-center mb-4" no-body style="background-color:#DFECF4;height: 90px;max-width: 270px;cursor: pointer;min-width: 270px" border-variant="none" @click="router(Board.boardId)">
                  <div class="card-text" style="color:rgb(85,85,85)">
                    <span style="font-size: 16px;line-height: 90px">{{Board.boardName}}</span>
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
            <b-button variant="info">项目成员</b-button>
            <b-button variant="info">项目统计</b-button>
            <b-button variant="info">置顶</b-button>
          </b-button-group>
          <b-button variant="info" size="sm" style="background-color: rgba(255, 255, 255, 0.3)" v-b-toggle="'collapes'+index">
            <icon :name="icon"></icon>
          </b-button>
        </b-button-toolbar>
        <b-collapse no-body :id="'collapes'+index" class="coll">
          <b-card>
            <div class="card-text">
              <b-card text-variant="white" class="text-center mb-4 ignore-elements" no-body style="background-color:#4A97C3;height: 90px;max-width: 270px;cursor: pointer;min-width: 270px" border-variant="none" name="new">
                <div class="card-text">
                  <span style="font-size: 16px;line-height: 90px">新建面板</span>
                </div>
              </b-card>
              <draggable v-model="Project.boardList" class="card-deck" :move="checkMove">
                <b-card v-for="(Board,index) in Project.boardList" :key="index" text-variant="white" class="text-center mb-4" no-body style="background-color:#DFECF4;height: 90px;max-width: 270px;cursor: pointer;min-width: 270px" border-variant="none" @click="router(Board.boardId)">
                  <div class="card-text" style="color:rgb(85,85,85)">
                    <span style="font-size: 16px;line-height: 90px">{{Board.boardName}}</span>
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
          <a href="#" v-b-modal.modal1>查看已归档看板</a>
        </li>
        <li>
          <a href="#" v-b-modal.modal2>查看已归档项目</a>
        </li>
      </ul>
    </div>

    <b-modal id="modal1" ref="modal1" title="已归档看板" style="color:black" :hide-footer="true">
      <table class="table table-hover" style="font-size:14px;">
        <tbody>
            <tr v-for="(item,index) in  archiveBoardList" :key="index">
                <td>{{item.boardName}}</td>
                <td><a href="#">撤销归档</a>&nbsp;&nbsp;&nbsp;<a href="#" style="color:red">彻底删除</a></td>
            </tr>
        </tbody>
      </table>
    </b-modal>

      <b-modal id="modal2" ref="modal2" title="已归档项目" style="color:black" :hide-footer="true">
      <table class="table table-hover" style="font-size:14px;">
        <tbody>
            <tr v-for="(item,index) in archiveProjectList" :key="index">
                <td>{{item.projectName}}</td>
                <td><a href="#">撤销归档</a>&nbsp;&nbsp;&nbsp;<a href="#" style="color:red">彻底删除</a></td>
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
      archiveProjectList:[],
      archiveBoardList:[],
      term: ''
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
    showCollapse() {
      if (this.icon === 'chevron-down')
        this.icon = 'chevron-up';
      else this.icon = 'chevron-down'
    },
    checkMove({ relatedContext, draggedContext }) {
      const draggedElment = draggedContext.element
      const relatedElement = relatedContext.element;
      console.log("drag"+draggedElment.boardName);
      console.log("relate"+relatedElement.boardName)
      return true;
    },
    datadragEnd(evt) {
      console.log('拖动前索引:' + evt.oldIndex)
      console.log('拖动后索引:' + evt.newIndex)
      console.log(this.personalBoard[0].boardName + this.personalBoard[0].boardLocate)
      for (let i = 0; i < this.personalBoard.length; i++) {
        this.personalBoard[i].boardLocate = i
      }
      console.log(this.personalBoard[0].boardName + this.personalBoard[0].boardLocate)
    },
    router(boardId){
      this.$router.push({path:'/board/'+boardId})
    }
  },
  created() {
    this.$ajax.post('/getUserProjectList').then((res) => {
      this.projectList = res.data.data;
      this.searchResult = res.data.data
      Bus.$emit('initProjectList',this.projectList)
    }).catch(res => {
      console.log(res)
    }),
      this.$ajax.post('/getUserPersnoalBoardList').then((res) => {
        this.personalBoard = res.data.data
        Bus.$emit('initPersonalBoard',this.personalBoard)
      }).catch(res => { console.log(res) }),
      this.$ajax.post('/getArchiveProjectList').then((res) => {
        this.archiveProjectList = res.data.data
      }).catch(res => { console.log(res) }),
        this.$ajax.post('/getArchiveBoardList').then((res) => {
        this.archiveBoardList = res.data.data
      }).catch(res => { console.log(res) })
    Bus.$on('search', value => {
      this.term = value;
    })
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
