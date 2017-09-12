<template>
  <div class="board_content">
    <b-navbar toggleable="md" type="dark" style="background-color:rgb(14,116,175);">
      <b-navbar-brand href="#">{{boardId}}</b-navbar-brand>
      <b-nav is-nav-bar>
        <b-button-toolbar>
          <b-button-group class="mx-1" size="sm">
            <b-dropdown class="nav-button-drown" variant="default" size="sm">
              <template slot="button-content">
                8月31日 - 9月13日
              </template>
              This is dropdown
            </b-dropdown>
          </b-button-group>
          <b-button-group class="mx-1" size="sm" style="height:32px">
            <b-btn variant="default" class="nav-button">
              <icon name="area-chart"></icon>
            </b-btn>
            <b-btn variant="default" class="nav-button">
              <icon name="table"></icon>
            </b-btn>
            <b-btn variant="default" class="nav-button">
              <icon name="group" style="padding-top:2px"></icon>项目成员可见</b-btn>
          </b-button-group>
        </b-button-toolbar>
      </b-nav>
      <b-nav is-nav-bar class="ml-auto">
        <b-button-group size="sm" style="height:32px;">
          <b-btn class="ml-3" variant="default" style="background-color: #0E74AF" @click="right=0">
            <icon name="user" style="padding-top:2px"></icon>成员</b-btn>
          <b-btn class="ml-3" variant="default" style="background-color: #0E74AF" @click="right=0">
            <icon name="filter" style="padding-top:2px"></icon>筛选</b-btn>
          <b-btn class="ml-3" variant="default" style="background-color: #0E74AF" @click="right=0">
            <icon name="bars" style="padding-top:2px"></icon>菜单</b-btn>
        </b-button-group>
        <div class="slider-menu pull-right" :style="{'right':right+'px','height':height+'px'}">
          <div class="slider-menu-close" @click="right=-300">
            <icon name="chevron-right" scale="1.5" style="padding-top:5px"></icon>
          </div>
        </div>
      </b-nav>
    </b-navbar>
    <div class="board_content_main" style="margin-left:20px">
      <draggable v-model="List" :options="{'ghostClass':'ghost','animation':0,'group':'dragList','handle':'.list-title'}" style="align-items: flex-start" class="card-deck">
        <b-card style="max-width:260px;background-color:#eeeeee;margin-left:1px" no-body v-for="(item,index) in List" :key="index" class="ml-1">
          <b-card-header class="list-title">
            {{item.listName}}
          </b-card-header>
          <div class="card-text" style="background-color:#eeeeee;">
            <draggable v-model="item.cardList" :options="{'ghostClass':'ghost','animation':0,'group':'description'}" :move="onMove" @update="datadragEnd" style="min-height:30px">
              <div class="task_view btn btn-default" style="background-color:white;min-height:30px" v-for="(card,cindex) in item.cardList" :key="cindex">
                <div class="edit-and-delete-card" style="background-color:white;display:block">
                  <span style="cursor:pointer">
                    <icon name="pencil"></icon>
                  </span>
                  <span style="cursor:pointer">
                    <icon name="trash"></icon>
                  </span>
                </div>
                <div class="task-name-content" style="background-color:#EEEEEE">
                  <span class="card-name pull-left">{{card.cardName}}</span>
                </div>
              </div>
            </draggable>
          </div>
          <b-card-footer class="list-footer" style="border:none">
            this is footer
          </b-card-footer>
        </b-card>
      </draggable>
      <div>
        <ul>
          <li v-for="(item,index) in List" :key="index">
            {{item.cardList.length}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: { draggable },
  data() {
    return {
      boardId: this.$route.params.boardId,
      right: -300,
      onEdit: false,
      cardList: [],
      List: []
    }
  },
  methods: {
    showEditAndDelete(event) {
      var target = event.target;
      if (target.style.backgroundColor != '#EEEEEE') {
        target.style.backgroundColor = '#EEEEEE'
        target.children[0].style.display = 'block'
        target.children[0].style.backgroundColor = '#EEEEEE'
      }
    },
    hideEditAndDelete(event) {
      var target = event.target;
      if (!this.onEdit) {
        target.children[0].style.display = 'none'
        target.children[0].style.backgroundColor = 'white'
        target.style.backgroundColor = 'white'
      }
      else target.children[0].style.display = 'block'
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return true
    },
    datadragEnd(evt) {
      console.log('拖动前索引:' + evt.oldIndex)
      console.log('拖动后索引:' + evt.newIndex)
    },
  },
  computed: {
    height() {
      return window.innerHeight - 150;
    },
  },
  created() {
    this.$ajax.post('/getCardList').then(res => { this.List = res.data.data }).catch(res => (console.log(res)))
  }
}
</script>

<style>
.board_content {
  width: 100%;
  height: 100%;
  position: fixed;
}

.nav-button {
  -webkit-transition-duration: 0.4s;
  /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  background-color: #0E74AF;
  color: white;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.nav-button-drown button {
  -webkit-transition-duration: 0.4s;
  /* Safari */
  transition-duration: 0.4s;
  background-color: #0E74AF;
  cursor: pointer;
  color: white;
}

.nav-button-drown button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.slider-menu {
  transition: right .2s;
  position: absolute;
  top: 0;
  width: 265px;
  border: none;
  right: 0px;
  height: 400px;
  background-color: #eeeeee;
  box-shadow: -10px -7px 5px -10px #000;
  z-index: 1000;
}

.slider-menu-close {
  position: absolute;
  z-index: 2;
  top: 5px;
  left: -30px;
  width: 35px;
  height: 30px;
  cursor: pointer;
  background: #eeeeee;
  box-shadow: -10px -7px 5px -10px #000;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.task_view {
  position: relative;
  margin: 3px auto;
  width: 96%;
  border: none;
  text-align: left;
  box-shadow: 1px 1px 1px 1px #c1c7c3;
}

.edit-and-delete-card {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 13px;
  padding: 2px;
}

.list-title {
  line-height: 25px;
  height: 25px;
  padding: 0;
  text-align: left;
  border: none;
}

.task-top-area {
  display: flex;
}

.list-footer {
  height: 33px;
  line-height: 33px;
  padding: 0;
  border: none;
}

.card-name {
  padding-left: 5px;
  float: left;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}
</style>
