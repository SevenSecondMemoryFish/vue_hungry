<template>
  <div class="loginContainer">
    <head-top headTitle="登录" go-back="true"></head-top>
    <form class="loginForm">
      <section class="login_section account">
        <span>帐&nbsp;&nbsp;&nbsp;号</span>
        <input placeholder="请输入帐号" type="text"  v-model="userAccount"/>
      </section>
      <section class="login_section ">
        <span>密&nbsp;&nbsp;&nbsp;码</span>
        <input placeholder="请输入密码" v-model="passWord" type="password"/>
      </section>
      <section class="login_section">
        <span>验证码</span>
        <input placeholder="请输入帐号" v-model="validationCode" type="text"/>
        <div class="img_change_img">
          <img :src="imageCode"/>
          <div @click="getImageCode">
            <p>看不清</p>
            <p class="img_change_img_p_change">换一张</p>
          </div>
        </div>
      </section>
    </form>
    <p class="login_tips">温馨提示：未注册过的账号，登录时将自动注册</p>
    <p class="login_tips"> 注册过的用户可凭账号密码登录</p>
    <div class="login_button" :class="{enable:enableLogin}" @click="login">登录</div>
    <span class="remakes_passwork ">重制密码?</span>
    <alert-tip ref="tip" message="错误代码啊" show-confirm="true" error-icon="true" @click="confirmAction"></alert-tip>
  </div>
</template>

<script>
import headTop from '../../components/head'
import {getcaptchas,login} from "../../service/getData";
import alertTip from '../../components/alertTip'

export default {
  name: "login",
  data(){
    return{
      userAccount: '', //用户名
      passWord: '', //密码
      validationCode: '', //短信验证码
      imageCode:null,
      enableLogin:false,
      userInfo:null
    }
  },
  components:{headTop,alertTip},
  created(){
    this.getImageCode();
  },
  methods:{
    getImageCode(){
      getcaptchas().then(response=>{
        this.imageCode = response.code
      })
    },
     login(){
      if (!this.enableLogin)return
      var objc = {
        captcha_code:this.validationCode,
        "password":this.passWord,
        username:this.userAccount
      };
       login(objc).then(res=>{
         this.userInfo = res;
       },(err)=>{
         this.$vux.toast.text(err)
      });
    },
    judgeLoginButton(){
      if (this.userAccount.length>0 && this.passWord.length>0 && this.validationCode.length>0){
        this.enableLogin = true
      } else {
        this.enableLogin = false;
      }
    },
    confirmAction(){

    }
  },
  watch:{
    validationCode(){
      this.judgeLoginButton()
    },
    userAccount(){
      this.judgeLoginButton()
    },
    passWord(){
      this.judgeLoginButton()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";
  .loginContainer{
    margin-top: 1.95rem;
    p,span,input{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .loginForm {
    margin-top: 0.6rem;
    background-color: #ffffff;
    padding:  0 0.3rem;
    .login_section{
      border-bottom: 1px solid #f1f1f1;
      @include wh(100%,2.1rem);
      display: flex;
      align-content: center;

      span{
        line-height: 2.1rem;
        height: 100%;
        font-size: 0.6rem;
        color: #333333;
        width: 2.5rem;
        text-align: center;
      }
      input{
        margin-left: 0.3rem;
        font-size: 1rem;
        width: 3rem;
        flex-grow:3;
      }
      input::-webkit-input-placeholder {
        /* placeholder颜色  */
        color: #aab2bd;
        /* placeholder字体大小  */
        font-size: 12px;
      }

    }
  }
  .img_change_img {
    display: flex;
    align-items: center;
    p{
      color: #f2f2f2;
      font-size: 0.2rem;
    }
    .img_change_img_p_change{
      color: $blue;
    }
    img{
      @include wh(3.5rem,1.5rem);
      margin-right: 0.3rem;
    }
  }
  .login_tips {
    color: red;
    font-size: 0.3rem;
    padding: 0 0.3rem;
    margin-top: 0.4rem;
  }
  .login_button {
    margin: 0.7rem auto;
    background-color: #555555;
    @include wh(90%,2rem);
    border-radius: 0.3rem;
    line-height:2rem ;
    text-align: center;
    color: white;
    font-size: 0.7rem;
  }
  .enable{
    background-color: $blue;
  }
  .remakes_passwork {
    color: $blue;
    font-size: 0.5rem;
    position: absolute;
    right: 0.2rem;
    margin-top: 0.1rem;


  }
</style>
