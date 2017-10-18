<template>
    <div class="login-div">
        <div class="login-index">
            <img src="../../assets/team_logo.png" width="300px" height="100px" style="margin-bottom:20px">
            <p>敏捷开发,我们更高效</p>
            <p>但,不仅如此</p>
            <el-button type="info" style="width:100%;background-color:#2d8cf0;margin:0" v-show="start" @click="startClick">开始</el-button>
            <el-button type="success" style="width:100%;margin:0" v-show="islogin" @click="login">登录</el-button>
            <el-input placeholder="用户名,没有会自动注册哦" style="margin-top:20px;width:100%" v-show="islogin" v-model="account"></el-input>
            <el-input placeholder="密码" style="margin-top:20px;width:100%" v-show="islogin" type="password" v-model="pwd" @keyup.enter.native="login"></el-input>
        </div>
    </div>
</template>

<script>
import Bus from '../../bus'
export default {
    data() {
        return {
            start: true,
            islogin: false,
            account: '',
            pwd: ''
        }
    },
    methods: {
        startClick() {
            this.start = false;
            this.islogin = true;
        },
        login() {
            if (this.account != '' && this.pwd != '')
                this.$ajax.post('/Login/doLogin', { 'userAccount': this.account, 'userPassword': this.pwd }).then(res => {
                    if (res.data.data > 0) {
                        this.$router.push({ path: '/index' })
                    }else this.$notify.error({title:'警告',message:'密码错误'})
                })
            else this.$notify.error({title:'提示',message:'请完整填写信息'})
            //this.$router.push({ path: '/index' })
        }
    },
    created(){
        Bus.$emit('login_not')
    }

}
</script>

<style>
.login-div {
    width: 100%;
    height: 100%;
    background: url('../../assets/bgimage.jpg') no-repeat;
}

.login-index {
    display: block;
    position: absolute;
    width: 300px;
    top: 20%;
    left: 40%;
    color: white;
}

.login-index p {
    font-size: 17px;
    line-height: 26px;
    font-weight: bold;
}
</style>
