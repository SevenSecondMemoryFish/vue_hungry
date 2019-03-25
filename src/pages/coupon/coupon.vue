<template>
    <div>
        <head_top head-title="我的优惠券" go-back="true"></head_top>
        <section class="coupon_head_section">
            <section class="coupon_head_item_section" :class="{coupon_head_item_selected:headItem ==1}" @click="couponHeadItemAction(1)">红包</section>
            <section class="coupon_head_item_section" :class="{coupon_head_item_selected:headItem ==2}" @click="couponHeadItemAction(2)">商家代金券</section>
        </section>
        <section class="coupon_content_section" v-if="headItem == 1">
            <section class="coupon_content_head_section">
                <span>有3个红包到期</span>
                <section>
                    <img src="../../assets/problem.png">
                    <span>红包说明</span>
                </section>
            </section>
            <section>
                <ul>
                    <li v-for="(item,index) in couponList"  class="coupon_item_li">
                       <section class="coupon_item_head">
                           <section class="coupon_item_head_left">
                               <span class="coupon_item_des_money">¥</span>
                               <span class="coupon_item_money">{{item.amount}}</span>
                               <section class="coupon_item_des_section">满{{item.sum_condition}}元可用</section>
                           </section>
                           <section class="coupon_item_head_middle">
                               <section class="coupon_item_name">{{item.name}}</section>
                               <section class="coupon_item_des_section">{{item.description_map.validity_periods}}</section>
                               <section class="coupon_item_des_section">{{item.description_map.phone}}</section>
                           </section>
                           <section class="coupon_item_head_right">
                               <section>{{item.description_map.validity_delta}}</section>
                           </section>
                       </section>
                        <section class="coupon_limit_map_section">{{ item.limit_map ? item.limit_map.restaurant_flavor_ids :""}}</section>
                    </li>
                </ul>
                <section class="coupon_list_footer">
                    <span>查看历史红包</span>
                    <img src="../../assets/right.png">
                </section>
            </section>
            <section class="coupon_content_footer">
                <section class="coupon_content_footer_item">兑换红包</section>
                <section class="coupon_content_footer_item">推荐有奖</section>
            </section>
        </section>
        <section class="coupon_store_content" v-if="headItem == 2">
            <section class="coupon_store_content_head_section">
                <img src="../../assets/problem.png">
                <span>商家红包说明</span>
            </section>
            <section style="margin-top: 4rem;display: flex;justify-content: center">

                <section @click="downloadAppAction">下载App</section>
            </section>
        </section>
    </div>
</template>

<script>
    import head_top from '../../components/head'
    import {getCouponList} from  '../../service/getData'
    export default {
        name: "coupon",
        components:{head_top},
        data(){
            return {
                headItem:1,
                couponList:[]
            }
        },
        mounted(){
            this.initData();
        },
        methods:{
            async initData(){
                this.couponList = await getCouponList(this.$root.$data.userId);
                console.log(this.couponList);
            },
            couponHeadItemAction(index){
                this.headItem = index;
            },
            downloadAppAction(){
                this.$vux.toast.text("下载App,去官网下载吧")
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .coupon_head_section {
        margin-top: 1.95rem;
        display: flex;
        justify-content: space-around;
        background-color: white;
        padding: .3rem 0;

    }
    .coupon_head_item_section {
        padding: .2rem 0;
        border-bottom: white solid 2px;
        @include sc(.7rem,#333);
    }
    .coupon_head_item_selected{
        color: #3190e8;
        border-color: #3190e8;
    }
    .coupon_content_section {
        position: relative;
        padding: 0 .7rem;

    }
    .coupon_content_head_section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .6rem 0;
        section{
            display: flex;
            align-items: center;
        }
        img{
            @include wh(.8rem,.8rem);
        }
        span{
            @include sc(.4rem,#999);
        }

    }
    .coupon_item_head {
        display: flex;
        padding: 1rem .5rem .8rem;
    }
    .coupon_item_li {
        background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAIBAMAAAALs8LeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAeUExURUxpcf9TQf9aS/9TQP9TQP9TQv9TQf9UQP9bSP9TQCdGiZQAAAAJdFJOUwBPEZzKPX2/HKJFz58AAAAkSURBVAjXY5gJBwzEMScHNXpCmQIMDMwQ5jQGIKgEMyeBmJIAtqcnWdDMwKsAAAAASUVORK5CYII=) repeat-x;
        background-size:.5rem .2rem;
        border-radius: .25rem;
        margin-bottom: .5rem;
    }
    .coupon_item_head_left {
        flex: 1;
        font-size:0;/// 清楚字符之间的间隔
        border-right: .025rem dotted #ccc;
        span{
            font-weight: bold;
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        .coupon_item_des_money {
            @include sc(.8rem,#ff5340);
        }
        .coupon_item_money{
            @include sc(1.4rem,#ff5340);
        }
    }
    .coupon_item_des_section{
        @include sc(.4rem,#999);
    }
    .coupon_item_head_middle {
        flex: 2;
        margin-left: .7rem;
        .coupon_item_name{
            @include sc(.7rem,#333);
        }
    }
    .coupon_item_head_right {
        flex-shrink: 0;
        section{
            @include sc(.8rem,#ff5340);
        }
    }
    .coupon_limit_map_section {
        padding: .4rem;
        @include sc(.3rem,#999);
        margin-left: .2rem;
    }
    .coupon_list_footer {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
        padding: .5rem;
        img{
            @include wh(.4rem,.4rem);
        }
        span{
            @include sc(.4rem,#999);
            line-height: .5rem;
        }
    }
    .coupon_content_footer {
        display: flex;
        position: fixed;
        background-color: white;
        height: 2rem;
        left: 0;
        right: 0;
        bottom: 0;
        align-items: center;
        .coupon_content_footer_item {
            flex: 1;
            text-align: center;
            border-right: 1px solid rgb(245,245,245);
            @include sc(.7rem,#555);
        }
    }
    .coupon_store_content_head_section {
        display: flex;
        margin-right: .7rem;
        justify-content: flex-end;
        margin-top: .7rem;
        img{
            @include wh(.8rem,.8rem);
        }
        span{
            @include sc(.4rem,#999);
        }
    }

</style>
