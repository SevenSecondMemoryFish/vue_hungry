<template>
    <div>
        <head_top go-back="true" head-title="我的余额"></head_top>
        <section class="balance_content">
            <section class="balance_content_des">
                <section class="balance_content_des_head_section">
                    <span>当前余额</span>
                    <section>
                        <img src="../../assets/problem.png">
                        <span>余额说明</span>
                    </section>
                </section>
                <section class="balance_number_section">
                    <span class="balance_number">0.00</span>
                    <span>元</span>
                </section>
                <section class="balance_withdrawal">提现</section>
            </section>
        </section>
        <section class="balance_trading_title">交易明细</section>
        <section class="balance_trading_content">
            <section class="balance_trading_no">
                <img src="../../assets/no_data.png">
                <span>暂无明细记录</span>
            </section>
        </section>
    </div>
</template>

<script>
    import head_top from '../../components/head'
    export default {
        name: "balance",
        components:{head_top}
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .balance_content {
        margin-top: 1.95rem;
        background-color: #3190e8;
        padding: .3rem;
    }
    .balance_content_des {
        background-color: white;
        border-radius: .2rem;
        padding: .4rem;
        .balance_content_des_head_section {
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
        .balance_number_section {
            margin-top: .2rem;
            display: flex;
            align-items: baseline;
            font-size: 0;
            span{
                @include sc(.7rem,#999);
            }
            .balance_number {
                font-weight: bold;
                @include sc(1.4rem,#333);
                margin-right: .1rem;
            }

        }
        .balance_withdrawal {
            background-color: #ccc;
            margin-top: 1rem;
            padding: .5rem 0;
            @include sc(.7rem,white);
            text-align: center;
            border-radius: .25rem;
        }

    }
    .balance_trading_title {
        padding-left: .5rem;
        @include sc(.5rem,#999);
        line-height: 2rem;
    }
    .balance_trading_no {
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
