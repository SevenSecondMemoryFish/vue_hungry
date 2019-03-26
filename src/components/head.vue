<template>
    <header id="head_top">
      <!--slot 可以往里面插入东西-->
      <slot name="logo"></slot>
      <slot name="search"></slot>
      <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
        <!--svg 表示加载svg文件格式-->
        <svg width="100%" height="100%" >
          <!--polyline 表示画线，points表示画线的坐标 12，18 表示七点-->
          <polyline points="12,18 4,9 12 0" style="fill: none;stroke: white;stroke-width: 2px"></polyline>
        </svg>
      </section>
      <router-link to="/login" v-if="signinUp" class="head_login">
        <span class="login_span">登录|注册</span>
      </router-link>
      <section class="title_head ellipsis" v-if="headTitle">
        <span class="title_text">{{headTitle}}</span>
      </section>
      <slot name="right_action"></slot>
      <slot name="msite-title"></slot>
    </header>
</template>

<script>
export default {

    name: 'headTop',
    data() {
      return {

      }
    },
    mounted(){

    },
    props:['signinUp','headTitle','goBack'],



}
</script>

<style lang="scss" scoped>
  @import "../style/mixin";

  #head_top{
    background-color: $blue;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
  }
  .head_goback{
    left: 0.4rem;
    @include wh(0.6rem, 1rem);
    line-height: 2.2rem;
    margin-left: .4rem;
  }
  .head_login{
    right: 0.55rem;
    @include sc(0.65rem, #fff);
    @include ct;
    .login_span{
      color: #fff;
    }
    .user_avatar{
      fill: #fff;
      @include wh(.8rem, .8rem);
    }
  }
  .title_head{
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text{
      @include sc(0.8rem, #fff);
      text-align: center;
      font-weight: bold;
    }
  }
</style>
