<template>
  <div class="user-info">
    <div class="container">
      <div class="info">
        <div class="avatar" v-on:mouseover="onShow" v-on:mouseout="onHide" v-on:click="cardShow">
          <img id="img" class="image" :src="user.userAvatar"/>
          <span id="change" v-show="isShow" class="change">修改</span>
        </div>
        <div class="user-base-info" v-if="isChangeInfo==='no'">
          <h3>{{user.userAccount}}</h3>
          <p v-if="user.userSex===0">男</p>
          <p v-if="user.userSex===1">女</p>
          <p v-if="user.userSex===null">未填写</p>
          <p>{{user.userEmail}}</p>
          <p>{{user.userIntro}}</p>
          <b-button variant="secondary" size="sm" v-on:click="changeInfo">
            <icon name="pencil"></icon>
            编辑个人资料
          </b-button>
        </div>
        <div class="user-base-info" v-if="isChangeInfo==='yes'">
          <b-form @submit="onSubmit">
            <b-form-group id="exampleInputGroup2"
                          label="姓名:" label-for="userAccount">
              <b-form-input id="userAccount"
                            type="text" v-model="form.userAccount" required
                            placeholder="请输入姓名..."
                            size="sm"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup3"
                          label="性别:" label-for="userSex">
              <b-form-select id="userSex"
                             :options="sex" required
                             v-model="form.userSex"
                             size="sm"
              ></b-form-select>
            </b-form-group>
            <b-form-group id="exampleInputGroup1"
                          label="邮箱地址:" label-for="userEmail">
              <b-form-input id="userEmail"
                            type="email" v-model="form.userEmail" required
                            placeholder="请输入邮箱地址..."
                            size="sm"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="textarea1"
                          label="简介:" label-for="userIntro">
              <b-form-textarea id="userIntro" placeholder="请输入简介..."
                               :rows="3"
                               :max-rows="6" v-model="form.userIntro" required
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
    <div>
      <b-card v-if="isCardShow==='yes'" class="text-center b-card">
        <div slot="header">
          <small style="text-align: left">修改头像</small>
          <span v-on:click="cardHide" style="cursor: pointer"><icon name="times" style="float: right;"></icon></span>
        </div>
        <b-form-file accept=".jpg, .png, .gif" choose-label="上传图片"></b-form-file>
      </b-card>
    </div>
    <b-card no-body style="text-align: left;">
      <b-tabs ref="tabs" card>
        <b-tab title="设置">
          <div class="myTab-body">
            <div class="myTab-title">
              <h5>基本信息</h5>
              <hr>
            </div>
            <b-button variant="link" size="sm" class="myTab-link" v-on:click="changePwd"><span>修改密码</span></b-button>
            <div>
              <b-card v-if="changePwdShow==='yes'" class="b-card">
                <div slot="header">
                  <small style="text-align: left">修改密码</small>
                  <span v-on:click="changePwdHide" style="cursor: pointer"><icon name="times" style="float: right;"></icon></span>
                </div>
                <b-form @submit="onPwdSubmit">
                  <b-form-group id="oldPwd"
                                label="原密码:" label-for="oldPwd">
                    <b-form-input id="oldPwd"
                                  type="password" v-model="form2.oldPwd" required
                                  placeholder="请输入原密码..."
                                  size="sm"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="newPwd"
                                label="新密码:" label-for="newPwd">
                    <b-form-input id="newPwd"
                                  type="password" v-model="form2.newPwd" required
                                  placeholder="请输入新密码..."
                                  size="sm"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="newPwd2"
                                label="确认新密码:" label-for="newPwd2">
                    <b-form-input id="newPwd2"
                                  type="password" v-model="form2.newPwd2" required
                                  placeholder="请输入确认新密码..."
                                  size="sm"
                    ></b-form-input>
                  </b-form-group>
                  <b-button type="submit" variant="success" size="sm">确认</b-button>
                  <b-button variant="secondary" size="sm" v-on:click="changePwdHide">关闭</b-button>
                </b-form>
              </b-card>
            </div>
          </div>
          <div class="myTab-body">
            <div class="myTab-title">
              <h5>登录账号</h5>
              <hr>
            </div>
            <b-card header="主邮箱" bg-variant="light" class="text-center" style="width: 25%">
              <p class="card-text">email example:8069@qq.com</p>
            </b-card>
            <b-button variant="secondary" size="sm" style="margin-top: 30px;margin-left: 5px;">
              添加备用邮箱
            </b-button>
          </div>
          <div class="myTab-body">
            <div class="myTab-title">
              <h5>通知</h5>
              <hr>
            </div>
            <b-button variant="link" size="sm" class="myTab-link"><span>开启/关闭邮件提醒</span></b-button>
          </div>
        </b-tab>
        <b-tab title="第三方账号">
          <div class="myTab-body">
            <div class="myTab-title">
              <h5>赞助SixTeam团队</h5>
              <hr>
            </div>
            <div class="myTab-text">
              <img src="../../assets/pay.jpg" class="myTab-img"/>
              <b class="myTab-b">个人收款账号</b>
            </div>
            <div class="myTab-text2">
              <p>谢谢您的支持，我们SixTeam会继续努力，做到最好！</p>
            </div>
          </div>
        </b-tab>
        <b-tab title="通讯录">
          <div class="myTab-body">
            <div class="myTab-title" style="text-align: right">
              <b-button variant="secondary" size="sm">
                添加好友
              </b-button>
              <hr>
            </div>
            <div v-for="friend in friends">
              <div class="myTab-friend">
                <div class="myTab-avatar">
                  <span>
                    <img :src="friend.avatar"/>
                  </span>
                </div>
                <div style="text-align: left">
                  <p class="myTab-avatar-p">{{friend.name}}</p>
                  <p>{{friend.email}}</p>
                </div>
              </div>
              <div style="float: right">
                <b-button variant="danger" size="sm">
                  删除
                </b-button>
              </div>
              <hr>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
  import Icon from "../../../node_modules/vue-awesome/components/Icon";
  export  default {
    components: {Icon},
    methods: {
      onShow: function () {
        this.isShow = true;
      },
      onHide: function () {
        this.isShow = false;
      },
      cardShow: function () {
        this.isCardShow = 'yes';
      },
      cardHide: function () {
        this.isCardShow = 'no';
      },
      changePwd: function () {
        this.changePwdShow = 'yes';
      },
      changePwdHide: function () {
        this.changePwdShow = 'no';
      },
      onSubmit(evt) { //表单提交事件在这里
        evt.preventDefault();
        alert(JSON.stringify(this.form));
      },
      onPwdSubmit(evt) { //表单提交事件在这里
        if(this.form2.oldPwd != this.form.userPassword){
            alert("原密码错误，请重新输入!")
        }else if(this.form2.newPwd != this.form2.newPwd2){
            alert("两次新密码输入不一致，请重新输入!")
        }else {
          evt.preventDefault();
          alert(JSON.stringify(this.form2));
        }
      },
      changeInfo(){
        this.isChangeInfo = 'yes';
      },
      notChangeInfo(){
        this.isChangeInfo = 'no';
      }
    },
    data () {
      return {
        user:{},
        isShow: false,
        isCardShow: 'no',
        isChangeInfo: 'no',
        changePwdShow: 'no',
        form: {
          UserEmail: '',
          UserAccount: '22222',
          UserSex: null,
          UserIntro: ''
          //secret: 'S3CR3T'
        },
        form2:{
          oldPwd: '',
          newPwd: '',
          newPwd2: ''
        },
        sex: [
          {text: '选择性别', value: null},
          {text: '男', value: 0},
          {text: '女', value: 1}
        ],
        friends:[
          {name:'test01',email:'test01@example.com',avatar:'http://localhost:8080/static/img/SIXTEAM.86e0bd8.png'},
          {name:'test02',email:'test02@example.com',avatar:'http://localhost:8080/static/img/SIXTEAM.86e0bd8.png'},
          {name:'test03',email:'test03@example.com',avatar:'http://localhost:8080/static/img/SIXTEAM.86e0bd8.png'}
        ]
      }
    },
    created() {
      this.$ajax.post('/getUserInfo').then((res) => {
        this.user = res.data.data;
        this.form = res.data.data;
      }).catch(res => {
        console.log(res)
      })
    }
  }
</script>
<style>
  * {
    box-sizing: border-box;
  }

  .user-info {
    padding-top: 50px;
    background-color: #edeff0;
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
    background: #ccc !important;
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

  .change {
    display: block;
    line-height: 30px;
    position: absolute;
    background: rgba(0, 0, 0, .5);
    text-decoration: underline;
    color: #fff;
    height: 30px;
    width: 85px;
    bottom: 0;
    text-align: center;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .b-card {
    width: 350px;
    top: 31%;
    left: 308px;
    position: fixed;
    z-index: 2000;
    right: 20px;
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
  }

  .card-header {
    text-align: left;
  }

  .custom-file-control::before {
    background-color: #5CB85C;
  }

  .custom-file-control[data-v-c68bd5f8]::after {
    float: left;
  }
  .card{
    border: 0px;
  }
  .card-header{
    background-color: #EDEFF0;
  }
  .card-header-tabs{
    margin-left: 35%;
  }
  .myTab-body{
    margin-left: 10%;
    padding: 24px;
  }
  .myTab-link{
    display: block;
    margin: 6px 0 6px 30px;
    color: #222;
    padding: 10px;
    border-radius: 3px;
    cursor: pointer;
  }
  .myTab-text{
    display: inline-block;
  }
  .myTab-img{
    width: 150px;
    padding: 4px;
    line-height: 1.42857143;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all .2s ease-in-out;
    display: inline-block;
    max-width: 100%;
    height: auto;
  }
  .myTab-b{
    display: block;
    text-align: center;
  }
  .myTab-text2{
    vertical-align: top;
    margin: 50px 0 0 35px;
    display: inline-block;
  }
  .myTab-friend{
    position: relative;
    min-height: 40px;
    padding-left: 50px;
    display: inline-block;
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
