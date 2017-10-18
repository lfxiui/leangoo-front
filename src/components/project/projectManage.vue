<template>
  <div class="user-info">
    <div class="container">
      <div class="info">
        <div class="avatar">
          <img id="img" class="image" src="../../assets/SIXTEAM.png" />
        </div>
        <div class="user-base-info" v-if="isChangeInfo==='no'">
          <h3>{{project.projectName}}</h3>
          <p>{{project.projectIntro}}</p>
          <b-button variant="secondary" size="sm" v-on:click="changeInfo">
            <icon name="pencil"></icon>
            编辑项目资料
          </b-button>
        </div>
        <div class="user-base-info" v-if="isChangeInfo==='yes'">
          <b-form @submit="onSubmit">
            <b-form-group id="exampleInputGroup1" label="名称:" label-for="projectName">
              <b-form-input id="projectName" type="text" v-model="form.projectName" required placeholder="请输入项目名称..." size="sm"></b-form-input>
            </b-form-group>
            <b-form-group id="textarea1" label="简介:" label-for="projectIntro">
              <b-form-textarea id="projectIntro" placeholder="请输入简介..." :rows="3" :max-rows="6" v-model="form.projectIntro" required size="sm">
              </b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="success" size="sm">保存</b-button>
            <b-button type="reset" variant="primary" size="sm">重置</b-button>
            <b-button variant="secondary" size="sm" v-on:click="notChangeInfo">取消</b-button>
          </b-form>
        </div>
      </div>
    </div>
    <b-card no-body class="pm-tabs-card">
      <b-tabs ref="tabs" card id="project-card-tab" v-model="tab">
        <b-tab title="看板">
          <div style="margin-left: 15%;margin-right: 15%">
            <b-button variant="secondary" class="project-board" @click.stop="newBoard">新建看板</b-button>
            <div v-for="(board,index) in boards" :key="index">
              <b-button variant="primary" class="project-board" @click="boardClick(board.boardId)">{{board.boardName}}</b-button>
            </div>
          </div>
        </b-tab>
        <b-tab title="成员">
          <div class="myTab-body">
            <div v-if="addLeaguerShow == 'no'" class="myTab-title" style="text-align: right">
              <b-button variant="secondary" size="sm" v-on:click="showAddLeaguer">
                添加成员
              </b-button>
              <hr>
            </div>
            <div v-if="addLeaguerShow == 'yes'" class="myTab-title" style="text-align: right">
              <b-form-input size="sm" type="text" v-model="leaguerAccount" placeholder="输入账号" style="width: 200px;display: inline"></b-form-input>
              <b-button variant="success" size="sm" v-on:click="addLeaguer">添加</b-button>
              <hr>
            </div>
            <div v-for="(leaguer,index) in leaguers" :key="index">
              <div class="myTab-leaguer">
                <div class="myTab-avatar">
                  <span>
                    <img :src="leaguer.userAvatar" />
                  </span>
                </div>
                <div style="text-align: left">
                  <p class="myTab-avatar-p">{{leaguer.userAccount}}</p>
                  <p>{{leaguer.userEmail}}</p>
                </div>
              </div>
              <div style="float: right">
                <!--<div v-on:change="updateRole(leaguer.userAccount,leaguer.roleId)" style="width: 120px;display: inline-block">
                    <b-form-select id="role" :options="role" required v-model="leaguer.roleId" size=""></b-form-select>
                    </div>-->
                <b-button variant="danger" size="" v-on:click="deleteLeaguer(leaguer.userAccount)">
                  删除
                </b-button>
              </div>
              <hr>
            </div>
          </div>
        </b-tab>
        <b-tab title="统计">
          <div id="projectChart" style="width:600px;height:400px;margin-left:30%"></div>
        </b-tab>
        <b-tab title="设置">
          <div class="myTab-body">
            <div class="myTab-title">
              <h5>项目归档</h5>
              <hr>
            </div>
            <div class="myTab-text2">
              项目管理员可以通过右边的归档按钮对项目进行归档操作。
              <b-button style="float: right" size="sm" v-on:click="projectArchive()">归档</b-button>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import Icon from "../../../node_modules/vue-awesome/components/Icon";
import Bus from "../../bus"
export default {
  components: { Icon },
  data() {
    return {
      projectId: this.$route.params.projectId,
      tab: this.$route.params.tab,
      projectChartData: [],
      project: {},
      isChangeInfo: 'no',
      addLeaguerShow: 'no',
      leaguerAccount: '',
      form: {
        projectId: '',
        projectName: '',
        projectIntro: ''
      },
      boards: [
      ],
      leaguers: []/*,
          role: [
            {text: '管理员', value: 1},
            {text: '普通成员', value: 2}
          ]*/
    }
  },
  methods: {
    newBoard() {
      const data = [];
      data.push({ text: this.project.projectName, value: this.projectId })
      if (this.boards.length != null)
        Bus.$emit('showNewBoardModal', [data, this.projectId, this.boards.length])
      else Bus.$emit('showNewBoardModal', [data, this.projectId, 0])
    },
    changeInfo() {
      this.isChangeInfo = 'yes';
    },
    notChangeInfo() {
      this.isChangeInfo = 'no';
    },
    onSubmit(evt) { //表单提交事件在这里
      evt.preventDefault();
      this.$ajax.post('/Project/changeProjectInfo',
        JSON.stringify(this.form),
        { headers: { "Content-Type": "application/json" } }
      ).then((res) => {
        if (res.data.errcode === 0) {
          this.project = res.data.data;
          this.form = res.data.data;
          this.$notify.info({ title: '提示', message: res.data.info })

          this.notChangeInfo();
        } else {
          this.$notify.error({ title: '提示', message: res.data.info })
        }
      }).catch(res => {
        console.log(res)
      });
    },
    boardClick(boardId) {
      this.$router.push({ path: '/board/' + this.projectId + '/' + boardId })
    },
    showAddLeaguer() {
      this.addLeaguerShow = 'yes';
    },
    addLeaguer() {
      this.$ajax.post('/Project/addProjectLeaguer',
        { leaguer: this.leaguerAccount, projectId: this.projectId },
        { headers: { "Content-Type": "application/json" } }
      ).then((res) => {
        if (res.data.errcode === 0) {
          this.leaguers = res.data.data;
          this.$notify.info({ title: '提示', message: res.data.info })

        } else {
          this.$notify.error({ title: '提示', message: res.data.info })
        }
      }).catch(res => {
        console.log(res)
      });
    },
    deleteLeaguer(userAccount) {
      this.$ajax.post('/Project/deleteProjectLeaguer',
        { userAccount: userAccount, projectId: this.projectId },
        { headers: { "Content-Type": "application/json" } }
      ).then((res) => {
        if (res.data.errcode === 0) {
          this.leaguers = res.data.data;
          this.$notify.info({ title: '提示', message: res.data.info })

        } else {
          this.$notify.error({ title: '提示', message: res.data.info })
        }
      }).catch(res => {
        console.log(res)
      });
    },
    projectArchive() {
      this.$ajax.post('/Project/archiveProject',
        { projectId: this.projectId },
        { headers: { "Content-Type": "application/json" } }
      ).then((res) => {
        if (res.data.errcode === 0) {
          this.$notify.info({ title: '提示', message: res.data.info })

        } else {
          this.$notify.error({ title: '提示', message: res.data.info })

        }
      }).catch(res => {
        console.log(res)
      });
    }/*,
      updateRole(userAccount,roleId){
          var data = {};
          if (roleId == 1) roleId = 2;
          else roleId = 1;
          data['leaguerAccount'] = userAccount;
          data['roleId'] = roleId;
          this.$ajax.post('/Role/changeLeaguerRole',
            JSON.stringify(data),
            {headers:{"Content-Type": "application/json"}}
          ).then((res) => {
            if (res.data.errcode === 0) {
              this.leaguers = res.data.data;
              alert(res.data.info);
            } else {
            }
          }).catch(res => {
            console.log(res)
          });
      }*/
  },
  created() {
    this.$ajax.post('/Project/getProjectChart', { 'projectId': this.projectId }).then(res => {
      this.projectChartData = res.data.data;
      var mychart = this.echarts.init(document.getElementById('projectChart'));
      var xdata = [];
      var ydata = [];
      for (let i in this.projectChartData) {
        xdata.push(this.projectChartData[i].board.boardName)
        ydata.push(this.projectChartData[i].workload)
      }
      var option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category', data: xdata, axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{ type: 'value' }],
        series: [{ name: '总工作量', type: 'bar', barWidth: '60%', data: ydata }]
      };
      console.log(this.projectChartData)
      console.log(option)
      mychart.setOption(option);
    })
    Bus.$emit('login_ok');
    this.$ajax.post('/Project/getProjectInfo',
      { projectId: this.projectId },
      { headers: { "Content-Type": "application/json" } }
    ).then((res) => {
      this.project = res.data.data;
      this.form = res.data.data;
    }).catch(res => {
      console.log(res)
    });
    this.$ajax.post('/Project/getProjectLeaguerList',
      { projectId: this.projectId },
      { headers: { "Content-Type": "application/json" } }).then((res) => {
        this.leaguers = res.data.data;
      }).catch(res => {
        console.log(res)
      });
    this.$ajax.post('/Project/getBoardListByProjectId',
      { projectId: this.projectId },
      { headers: { "Content-Type": "application/json" } }).then((res) => {
        this.boards = res.data.data;
      }).catch(res => {
        console.log(res)
      });
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.user-info {
  padding-top: 50px;
  background-color: #EDEFF0;
  width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}

.container {
  padding: 30px;
  width: 1170px;
  height: auto;
}

.info {
  margin-bottom: 0;
  margin-left: 16%;
}

.avatar {
  position: relative;
  display: block;
  float: left;
  background: #EDEFF0 !important;
  text-align: center;
  cursor: pointer;
  margin: auto;
}

.user-base-info {
  margin-top: -6px;
  margin-left: 100px;
  text-align: left;
  font-size: 14px;
  width: 40%;
  background-color: #EDEFF0;
}

.user-base-info>p {
  margin: 0 0 7px;
}

.image {
  border-radius: 3px;
  height: 85px;
  width: 85px;
}


/*.card {
    border: 0px;
  }

  .card-header {
    background-color: #EDEFF0;
  }

  .card-header-tabs {
      margin-left: 30%;
  }*/

.pm-tabs-card {
  text-align: center;
  border: 0px;
}

.project-board {
  width: 200px;
  height: 100px;
  float: left;
  margin-left: 2%;
  margin-top: 2%;
}

.myTab-body {
  margin-left: 15%;
  margin-right: 15%;
  padding: 24px;
  text-align: left;
}

.myTab-leaguer {
  position: relative;
  min-height: 40px;
  padding-left: 50px;
  display: inline-block;
  margin-bottom: -30px;
}

.myTab-avatar {
  position: absolute;
  left: 5px;
  top: 4px;
}

.myTab-avatar-p {
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
}

.myTab-avatar>span {
  font-size: 12px;
  font-weight: 700;
  line-height: 30px;
  display: block;
  overflow: hidden;
  width: 32px;
  height: 32px;
  text-align: center;
  border-radius: 4px;
  background: #ccc !important;
}

.myTab-avatar>span>img {
  width: 32px;
  height: 32px;
  display: inline;
}
</style>
