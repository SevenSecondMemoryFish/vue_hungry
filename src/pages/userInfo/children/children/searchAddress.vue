<template>
    <div class="search_address_page">
        <head_top head-title="搜索地址" go-back="true"></head_top>
        <section class="search_content">
            <search_h search_title="搜索"  @searchaction="searchAddressAction" placeholder="请输入小区/写字楼/学校等"></search_h>
            <section class="search_head_title">为了满足商家的送餐要求，建议您从列表中选择地址</section>
            <ul>
                <li class="search_item_li" v-for="(item,index) in searchAddressList" :key="index" @click="addressItemAction(item)">
                    <section class="search_item_name">{{item.name}}</section>
                    <section class="search_item_name">{{item.address}}</section>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import head_top from "../../../../components/head"
    import search_h from "../../../../components/seach-component"
    import {getNearAddress} from '../../../../service/getData'
    import Search from "../../../search/search"
    import {mapMutations} from 'vuex';
    export default {
        name: "searchAddress",
        components:{Search, head_top,search_h},
        data(){
            return{
                searchAddressList:[]
            }
        },

        methods:{
            ...mapMutations(["MUTATIONS_SELECTED_SEARCH_ADDRESS"]),
            searchAddressAction(e){
                getNearAddress(e).then(res=>{
                    this.searchAddressList = res;
                })
            },
            addressItemAction(item){
                this.MUTATIONS_SELECTED_SEARCH_ADDRESS(item);
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../style/mixin";
    .search_address_page {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0rem;
        background-color: #f2f2f2;
    }
    .search_content {
        margin-top: 1.95rem;
    }
    .search_head_title {
        width: 100%;
        text-align: center;
        background-color: #fff6e4;
        @include sc(.6rem,#ff883f);
        padding: .1rem 0;
    }
    .search_item_li {
        border-bottom: 1px solid #ccc;
    }
    .search_item_name {
        @include sc(.6rem,#999);
        margin: .4rem;
    }


</style>
