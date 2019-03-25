<template>
    <div>
        <head_top go-back="true" head-title="我的余额"></head_top>
        <section class="point_content">
            <section class="point_content_des">
                <section class="point_content_des_head_section">
                    <span>当前积分</span>
                    <section>
                        <img src="../../assets/problem.png">
                        <span>积分说明</span>
                    </section>
                </section>
                <section class="point_number_section">
                    <span class="point_number">0.00</span>
                    <span>元</span>
                </section>
                <section class="point_withdrawal" @click="pointProductAction">积分兑换商品</section>
            </section>
        </section>
        <section class="point_trading_title">最近30天积分记录</section>
        <section class="point_trading_content">
            <section class="point_trading_no">
                <img src="../../assets/no_data.png">
                <span>最近30天积分记录</span>
            </section>
        </section>
    </div>
</template>

<script>
    import head_top from '../../components/head'
    export default {
        name: "point",
        components:{head_top},
        methods:{
            pointProductAction(){
                this.$vux.toast.text("快去下单赚取大量积分吧")
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .point_content {
        margin-top: 1.95rem;
        background-color: #3190e8;
        padding: .3rem;
    }
    .point_content_des {
        background-color: white;
        border-radius: .2rem;
        padding: .4rem;
    .point_content_des_head_section {
        display: flex;
        justify-content: space-between;
    section{
        display: flex;
        align-items: center;
    }
    img{
    @include wh(.8rem,.8rem);
    }
    span{
    @include sc(.4rem,#3190e8);
    }
    }
    .point_number_section {
        margin-top: .2rem;
        display: flex;
        align-items: baseline;
        font-size: 0;
    span{
    @include sc(.7rem,#999);
    }
    .point_number {
        font-weight: bold;
    @include sc(1.4rem,#333);
        margin-right: .1rem;
    }

    }
    .point_withdrawal {
        background-color: #fe6d47;
        margin-top: 1rem;
        padding: .5rem 0;
    @include sc(.7rem,white);
        text-align: center;
        border-radius: .25rem;
    }

    }
    .point_trading_title {
        padding-left: .5rem;
    @include sc(.5rem,#999);
        line-height: 2rem;
    }
    .point_trading_no {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    img{
    @include wh(5rem,5rem);
    }
    span{
        margin-top: .5rem;
    @include sc(.7rem,#999);
    }

    }
</style>
