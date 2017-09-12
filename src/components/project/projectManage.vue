<template>
    <div class="user-info">
      <div class="container">
        <div class="info">
          <div class="avatar">
            <img id="img" class="image" src="../../assets/SIXTEAM.png"/>
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
              <b-form-group id="exampleInputGroup1"
                            label="名称:" label-for="projectName">
                <b-form-input id="projectName"
                              type="text" v-model="form.projectName" required
                              placeholder="请输入项目名称..."
                              size="sm"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="textarea1"
                            label="简介:" label-for="projectIntro">
                <b-form-textarea id="projectIntro" placeholder="请输入简介..."
                                 :rows="3"
                                 :max-rows="6" v-model="form.projectIntro" required
                                 size="sm">
                </b-form-textarea>
              </b-form-group>
              <b-button type="submit" variant="success" size="sm">保存</b-button>
              <b-button type="reset" variant="primary" size="sm">重置</b-button>
              <b-button variant="secondary" size="sm" v-on:click="notChangeInfo">取消</b-button>
            </b-form>
          </div>
        </div>
      </div>
      <b-card no-body style="text-align: center">
        <b-tabs ref="tabs" card id="project-card-tab">
          <b-tab title="看板">
            <div style="margin-left: 15%;margin-right: 15%">
            <b-button variant="secondary" class="project-board">新建看板</b-button>
            <div v-for="board in boards">
              <b-button variant="primary" class="project-board" v-on:click="boardClick(board.boardId)">{{board.boardName}}</b-button>
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
                <b-form-input size="sm" type="text" v-model="addLeaguerMsg.leaguerAccount" placeholder="输入账号" style="width: 200px;display: inline"></b-form-input>
                <b-button variant="success" size="sm" v-on:click="addLeaguer">添加</b-button>
                <hr>
              </div>
              <div v-for="leaguer in leaguers">
                <div class="myTab-leaguer">
                  <div class="myTab-avatar">
                  <span>
                    <img :src="leaguer.userAvatar"/>
                  </span>
                  </div>
                  <div style="text-align: left">
                    <p class="myTab-avatar-p">{{leaguer.userAccount}}</p>
                    <p>{{leaguer.userEmail}}</p>
                  </div>
                </div>
                <div style="float: right">
                  <div v-on:change="updateRole(leaguer.userAccount,leaguer.roleId)" style="width: 120px;display: inline-block">
                  <b-form-select id="role" :options="role" required v-model="leaguer.roleId" size=""></b-form-select>
                  </div>
                  <b-button variant="danger" size="" v-on:click="deleteLeaguer(leaguer.userAccount)">
                    删除
                  </b-button>
                </div>
                <hr>
              </div>
            </div>
          </b-tab>
          <b-tab title="统计">
            尚且无法统计，团队日夜加班紧急开发中...
          </b-tab>
          <b-tab title="设置">
            <div class="myTab-body">
              <div class="myTab-title">
                <h5>项目归档</h5>
                <hr>
              </div>
              <div class="myTab-text2">
                项目管理员可以通过右边的归档按钮对项目进行归档操作。
                <b-button style="float: right" size="sm" v-on:click="projectArchive(project.projectId)">归档</b-button>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
</template>

<script>
  import Icon from "../../../node_modules/vue-awesome/components/Icon";
  export default {
    components: {Icon},
    data(){
        return{
          project:{},
          isChangeInfo: 'no',
          addLeaguerShow: 'no',
          addLeaguerMsg: {leaguerAccount:''},
          deleteLeaguerMsg: {leaguerAccount:''},
          form: {
              projectId:'',
              projectName:'',
              projectIntro: ''
          },
          boards: [
          ],
          leaguers:[],
          role: [
            {text: '管理员', value: 1},
            {text: '普通成员', value: 2}
          ]
        }
    },
    methods: {
      changeInfo(){
        this.isChangeInfo = 'yes';
      },
      notChangeInfo(){
        this.isChangeInfo = 'no';
      },
      onSubmit(evt) { //表单提交事件在这里
        evt.preventDefault();
        alert(JSON.stringify(this.form));
      },
      boardClick(boardId){
        alert(boardId);
      },
      showAddLeaguer(){
        this.addLeaguerShow = 'yes';
      },
      addLeaguer(){
        alert(JSON.stringify(this.addLeaguerMsg));
      },
      deleteLeaguer(userAccount){
        this.deleteLeaguerMsg.leaguerAccount = userAccount;
        alert(JSON.stringify(this.deleteLeaguerMsg));
      },
      projectArchive(projectId){
          var data = {};
          data['projectId'] = projectId;
          alert(JSON.stringify(data));
      },
      updateRole(userAccount,roleId){
          var data = {};
          if (roleId == 1) roleId = 2;
          else roleId = 1;
          data['leaguerAccount'] = userAccount;
          data['roleId'] = roleId;
          this.$ajax({
            method:"POST",
            url:'/Role/changeLeaguerRole',
            data:JSON.stringify(data),
          }).then((res) => {
            this.leaguers = res.data.data;
            alert(res.data.info);
          }).catch(res => {
            console.log(res)
          });
      }
    },
    created(){
      this.$ajax.post('/Project/getProjectInfo').then((res) => {
        this.project = res.data.data;
        this.form = res.data.data;
      }).catch(res => {
        console.log(res)
      });
      this.$ajax.post('/Project/getProjectLeaguerList').then((res) => {
        this.leaguers = res.data.data;
      }).catch(res => {
        console.log(res)
      });
      this.$ajax.post('/Project/getBoardListByProjectId').then((res) => {
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

  .container{
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

  .user-base-info > p {
    margin: 0 0 7px;
  }

  .image {
    border-radius: 3px;
    height: 85px;
    width: 85px;
  }
  .card {
    border: 0px;
  }

  .card-header {
    background-color: #EDEFF0;
  }

  .card-header-tabs {
      margin-left: 30%;
  }

  .project-board{
    width: 200px;
    height: 100px;
    float: left;
    margin-left: 2%;
    margin-top: 2%;
  }

  .myTab-body{
    margin-left: 15%;
    margin-right: 15%;
    padding: 24px;
    text-align: left;
  }

  .myTab-leaguer{
    position: relative;
    min-height: 40px;
    padding-left: 50px;
    display: inline-block;
    margin-bottom: -30px;
  }
  .myTab-avatar{
    position: absolute;
    left: 5px;
    top: 4px;
  }
  .myTab-avatar-p{
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
  }
  .myTab-avatar > span{
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
  .myTab-avatar > span > img{
    width: 32px;
    height: 32px;
    display: inline;
  }
</style>
