<template>
    <div class="address_page">
        <head_top head-title="编辑地址" go-back="true" >
            <template slot="right_action">
                <section class="right_action">编辑</section>
            </template>
        </head_top>
        <section class="address_content_section">
            <router-link to="/userInfo/address/addAddress" class="userInfo_section">
                <span>新建地址</span>
                <img class="userInfo_avatar_right_img" src="../../../assets/right.png">
            </router-link>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import head_top from "../../../components/head"
    export default {
        name: "address",
        components:{head_top},
        data(){
            return{
                addressList:[]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../style/mixin";
    .address_page {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0rem;
        background-color: #f2f2f2;
    }
    .right_action {
        position: absolute;
        right: .55rem;
        @include ct;
        @include sc(.5rem,white);
        font-weight: bold;
    }
    .address_content_section {
        margin-top: 1.95rem;
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
    .userInfo_avatar_right_img {
        @include wh(.6rem,.6rem);
        margin-right: .3rem;
    }

</style>
