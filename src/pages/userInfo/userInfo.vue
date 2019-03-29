<template>
    <div>
        <head_top go-back="true" head-title="账户信息"></head_top>
        <section class="userInfo_avatar_section" >
            <span>头像</span>
            <section class="userInfo_avatar_right_section">
                <img class="userInfo_avatar_img" src="../../assets/logo.jpg">
                <img class="userInfo_avatar_right_img" src="../../assets/right.png">
            </section>
        </section>
        <section class="userInfo_section">
            <span>用户名</span>
            <img class="userInfo_avatar_right_img" src="../../assets/right.png">
        </section>
        <router-link class="userInfo_section" to="/userInfo/address">
            <span>收货地址</span>
            <img class="userInfo_avatar_right_img" src="../../assets/right.png">
        </router-link>
        <section class="userInfo_section_header">账号绑定</section>
        <section class="userInfo_section">
            <section class="userInfo_section_left">
                <img class="userInfo_section_left_img" src="../../assets/phone.png">
                <span>手机号</span>
            </section>
            <img class="userInfo_avatar_right_img" src="../../assets/right.png">
        </section>
        <section class="userInfo_section_header">安全设置</section>
        <section class="userInfo_section">
            <span>登录密码</span>
            <img class="userInfo_avatar_right_img" src="../../assets/right.png">
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import head_top from '../../components/head'
    export default {
        name: "userInfo",
        components:{head_top}
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .userInfo_avatar_section {
        display: flex;
        padding: .4rem;
        margin-top: 2.5rem;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        border-bottom: 1px solid #F5F5F5;
        .userInfo_avatar_right_section {
            display: flex;
            align-items: center;
            .userInfo_avatar_img {
                @include wh(1.4rem,1.4rem);
                border-radius: 50%;
                margin-right: .6rem;
            }
        }
        span{
            @include sc(.6rem,#555)
        }

    }
    .userInfo_avatar_right_img {
        @include wh(.6rem,.6rem);
        margin-right: .3rem;
    }
    .userInfo_section {
        display: flex;
        padding: .4rem;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        border-bottom: 1px solid #F5F5F5;
        span{
            @include sc(.6rem,#555);
            padding: .2rem 0;
        }
    }
    .userInfo_section_header {
        @include sc(.5rem,#666);
        padding: .4rem;
    }
    .userInfo_section_left {
        display: flex;
        align-items: center;
    }
    .userInfo_section_left_img {
        @include wh(.8rem,.8rem);
        margin-right: .2rem;
    }

    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
