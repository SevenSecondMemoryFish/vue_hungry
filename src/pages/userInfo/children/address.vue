<template>
    <div class="address_page">
        <head_top head-title="编辑地址" go-back="true" >
            <template slot="right_action">
                <section class="right_action" @click="editAddressAction">{{deleted ? "完成": "编辑"}}</section>
            </template>
        </head_top>
        <section class="address_content_section">
            <section style="margin-top: .4rem">
                <ul>
                    <li v-for="(item,index) in addressList" class="search_item_li" :key="index">
                        <section>
                            <section class="search_item_name">{{item.name}}</section>
                            <section class="search_item_name" style="padding: 0 0 .4rem .2rem">{{item.phone}}</section>
                        </section>
                        <img v-if="deleted" src="../../../assets/delete.png" @click="deletedAddressAction(index)">
                    </li>
                </ul>
            </section>
            <router-link to="/userInfo/address/addAddress" class="userInfo_section">
                <span style="color: #333">新建地址</span>
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
    import {getAddressList} from '../../../service/getData'
    export default {
        name: "address",
        components:{head_top},
        data(){
            return{
                addressList:[],
                deleted:false
            }
        },
        mounted(){
            getAddressList(this.$root.$data.userId).then(res=>{
                this.addressList = res;
            });
        },
        methods:{
            editAddressAction(){
                console.log(this.deleted);
                this.deleted = !this.deleted;
            },
            deletedAddressAction(index){
                this.addressList.splice(index,1);
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
        margin-top: 2.4rem;
    }
    .userInfo_section {
        display: flex;
        padding: .4rem;
        align-items: center;
        margin-top: .3rem;
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
    .search_item_li {
        border-bottom: 1px solid #ccc;
        background-color: white;
        display: flex;
        padding-right: .6rem ;
        justify-content: space-between;
        align-items: center;
        img{
            @include wh(.8rem,.8rem);
        }

    }
    .search_item_name {
        @include sc(.6rem,#999);
        padding: .3rem;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }

</style>
