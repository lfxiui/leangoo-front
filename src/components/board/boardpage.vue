<template>
  <div class="board_content">
    <b-navbar toggleable="md" type="dark" style="background-color:rgb(14,116,175);">
      <b-navbar-brand href="#">{{boardName}}</b-navbar-brand>
      <b-nav is-nav-bar>
        <b-button-toolbar>
          <b-button-group class="mx-1" size="sm">
            <b-dropdown class="nav-button-drown" variant="default" size="sm">
              <template slot="button-content">
               {{startDate}}-{{endDate}}
              </template>
              <b-card style="width:250px;border:none" no-body>
                <b-card-header style="font-size:14px;padding:10px,15px">
                  设置看板周期
                </b-card-header>
                <b-card-body>
                  <span class="time-zone">时区 GMT +8:00</span>
                  <el-date-picker type="date" placeholder="开始日期" v-model="startDate" size="small"></el-date-picker>
                  <el-date-picker type="date" placeholder="结束日期"  v-model="endDate" size="small" style="margin-top:10px"></el-date-picker>
                </b-card-body>
                <b-card-footer>
                  This is footer
                </b-card-footer>
              </b-card>
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
            <b-btn variant="default" class="nav-button">
              <icon name="plus" style="padding-top:2px"></icon>新建列表
            </b-btn>
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
    <div class="board_content_main" style="margin-left:20px;font-size:14px">
      <draggable v-model="List" :options="{'ghostClass':'ghost','animation':0,'group':'dragList','handle':'.list-title'}" style="align-items: flex-start" class="card-deck">
        <b-card style="max-width:260px;background-color:#eeeeee;margin-left:1px" no-body v-for="(item,index) in List" :key="index" class="ml-1">
          <b-card-header class="list-title">
            {{item.listName}}
            <b-badge variant="success">{{item.cardList.length}}</b-badge>
            <b-dd size="sm" variant="default" class="float-right list-title-menu" style="background-color:#e7e7e7">
              <template slot="button-content">
                <icon name="bars"></icon>
              </template>
              <b-dropdown-item>复制列表</b-dropdown-item>
              <b-dropdown-item>创建引用</b-dropdown-item>
              <b-dropdown-item @click="delList(index)">删除列表</b-dropdown-item>
            </b-dd>
          </b-card-header>
          <div class="card-text" style="background-color:#eeeeee;">
            <draggable v-model="item.cardList" :options="{'ghostClass':'ghost','animation':0,'group':'description'}" :move="onMove" @update="datadragEnd" style="min-height:30px;max-height:300px;overflow:auto" @end="dragEnd">
              <div class="task_view btn btn-default" style="min-height:30px" v-for="(card,cindex) in item.cardList" :key="cindex" @mouseover.self="showEditAndDelete($event)" @mouseout.self="hideEditAndDelete($event)">
                <div class="edit-and-delete-card" style="display:block" @mouseover.self="showEditDiv">
                  <span style="cursor:pointer">
                    <icon name="pencil"></icon>
                  </span>
                  <span style="cursor:pointer" @click.stop="delCard(index,cindex)">
                    <icon name="trash"></icon>
                  </span>
                </div>
                <div class="task-name-content" style="background-color:#EEEEEE">
                  <span class="card-name pull-left">{{card.cardName}}</span>
                </div>
              </div>
            </draggable>
          </div>
          <b-card-footer class="list-footer" style="border:none;height:auto">
            <b-btn size="sm" variant="link" class="add-card-button float-left" style="display:block" @click="addCard($event,index)">添加卡片</b-btn>
            <div style="display:none">
              <b-form-textarea :rows="2" :max-rows="2" style="margin:3px auto;width:98%" v-model="nCardName"></b-form-textarea>
              <b-btn class="float-left" size="sm" variant="success" @click="saveCard($event,index)" style="cursor:pointer">保存</b-btn>
              <b-btn class="float-left ml-1" size="sm" variant="default" @click="cancelSave($event)" style="cursor:pointer">取消</b-btn>
            </div>
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
      boardName: '',
      right: -300,
      addCardIsOpen: false,
      nCardName: '',
      onEdit: false,
      cardList: [],
      List: [],
      startDate:'',
      endDate:''
    }
  },
  methods: {
    delList(index) { this.List.splice(index, 1) },
    delCard(index, cindex) {
      console.log(this.List[index].cardList)
      this.List[index].cardList.splice(cindex, 1)
      console.log(this.List[index].cardList.length)
    },
    addCard(event) {
      if (!this.addCardIsOpen) {
        event.target.nextElementSibling.style.display = 'block'
        event.target.style.display = 'none'
        this.addCardIsOpen = true
      }
    },
    saveCard(event, index) {
      this.List[index].cardList.push({ 'cardId': '1', 'cardName': this.nCardName, 'cardIntro': '', 'cardEndDate': '', 'cardStartDate': '', 'cardLocate': this.List[index].cardList.length })
      this.nCardName = '';

    },
    cancelSave(event) {
      event.target.parentNode.style.display = 'none'
      event.target.parentNode.previousElementSibling.style.display = 'block'
      this.addCardIsOpen = false;
    },
    showEditAndDelete(event) {
      var target = event.target;
      if (target.style.backgroundColor != '#EEEEEE') {
        target.children[0].style.backgroundColor = '#EEEEEE';
        target.children[0].style.color = 'black'
      }
    },
    showEditDiv(event) {
      event.target.style.backgroundColor = '#EEEEEE';
      event.target.style.color = 'black'
    },
    hideEditAndDelete(event) {
      var target = event.target;
      target.children[0].style = ""

    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return true
    },
    dragEnd(event) {
      console.log(event);
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
  watch: {
    boardId() {
      this.$ajax.post('/Board/getBoardById', { 'boardId': this.boardId }).then(result => {
        this.boardName = result.data.data.boardName;
      }).catch(res => { console.log(res) })
    },
    List() {
      for (var index in this.List) {
        this.List[index].listLocate = index;
        for (var cindex in this.List[index].cardList)
          this.List[index].cardList[cindex].cardLocate = cindex;
      }
    }
  },
  created() {
    this.$ajax.post('/Card/getCardList').then(res => { this.List = res.data.data }).catch(res => (console.log(res)));
    HTMLElement.prototype.__defineGetter__("currentStyle", function() {
      return this.ownerDocument.defaultView.getComputedStyle(this, null);
    });
    this.$ajax.post('/Board/getBoardById', { 'boardId': this.boardId }).then(result => {
      this.boardName = result.data.data.boardName;
    }).catch(res => { console.log(res) })
  },
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

.nav-button-drown button::after {
  content: none;
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
  background-color: white;
  margin: 3px auto;
  font-size: 14px;
  width: 96%;
  border: none;
  text-align: left;
  box-shadow: 1px 1px 1px 1px #c1c7c3;
}

.task_view:hover {
  background-color: #EEEEEE
}

.edit-and-delete-card {
  position: absolute;
  background-color: white;
  color: white;
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

.list-title-menu button {
  background-color: #e7e7e7;
  cursor: pointer;
}

.list-title-menu ::after {
  content: none;
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

.add-card-button {
  color: #b5b5b9;
  cursor: pointer;
}

.time-zone {
  margin-bottom: 10px;
  display: block;
  margin-top: -5px;
  font-size: 12px;
  color: gray
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}
</style>
