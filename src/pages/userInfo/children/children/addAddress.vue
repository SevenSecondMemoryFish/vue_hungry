<template>
    <div class="add_address_page">
        <head_top head-title="新增地址" go-back="true"></head_top>
        <section class="add_address_content_section">
            <section class="add_address_content_item">
                <input placeholder="请输入你的姓名" :class="{warning:verifyname}" type="text" v-model="name" />
                <span v-if="verifyname" >姓名为空</span>
            </section>
            <section class="add_address_content_item">
                <input placeholder="请输入你的姓名"  type="text" disabled/>
            </section>
            <section class="add_address_content_item">
                <input placeholder="请填写详细送餐地址" :class="{warning:verifyaddress}" v-model="address" type="text"/>
                <span v-if="verifyaddress" >请详细填写送餐地址</span>
            </section>
            <section class="add_address_content_item">
                <input placeholder="请填写能够联系您的手机号" :class="{warning:verifyphone}" v-model="phone" type="text"/>
                <span v-if="verifyphone" >请输入正确的手机号</span>
            </section>
            <section class="add_address_content_item">
                <input placeholder="备用练习电话(选填)" type="text" />
            </section>
        </section>
        <section class="point_withdrawal" @click="pointProductAction">保存地址</section>
    </div>
</template>

<script>
    import head_top from "../../../../components/head"
    export default {
        name: "addAddress",
        components:{head_top},
        data(){
            return{
                name:null,
                address:null,
                phone:null,
            }
        },
        computed:{
            verifyname:function () {
                if (this.name == null)return false;
                if (this.name.length <= 0)return true;
                return false;
            },
            verifyaddress:function () {
                if (this.address == null)return false;
                if (this.address.length <= 0)return true;
                return false;
            },
            verifyphone:function () {
                if (this.phone == null)return false;
                if (this.phone.length <= 0)return true;
                return false;
            }
        },
        methods:{
            pointProductAction(){

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../style/mixin";
    .add_address_page {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0rem;
        background-color: #f2f2f2;
    }
    .add_address_content_section {
        margin-top: 2.35rem;
        background-color: white;
        padding: .4rem .4rem 0 ;
    }
    .add_address_content_item {
        display: flex;
        flex-direction: column;
        padding-bottom: .4rem;
        span{
            @include sc(.3rem,#ea3106);
        }
        input{
            @include sc(.6rem,#333);
            padding-left: .3rem;
            border-radius: .2rem;
            border: 1px solid #ddd;
            height: 1.8rem;
            background-color: #f2f2f2;
        }
    }
    .point_withdrawal {
        background-color: #3190e8;
        padding: .5rem 0;
        margin: 1rem  ;
        @include sc(.7rem,white);
        text-align: center;
        border-radius: .25rem;
    }
    .warning {
        border-color: #ea3106;
    }
    .store_des_right_content section{
        margin-top: .2rem;
    }
    .store_des_right_name_content {
        margin-top: 0;
        @include sc(.6rem,#333);
    }
    .store_des_right_des_content {
        @include sc(.5rem,#999);
    }
    ::-webkit-input-placeholder { /* Chrome */
        @include sc(.56rem,#999);
    }
    :-ms-input-placeholder { /* IE 10+ */
        @include sc(.56rem,#999);
    }
    ::-moz-placeholder { /* Firefox 19+ */
        @include sc(.56rem,#999);
        opacity: 1;
    }
    :-moz-placeholder { /* Firefox 4 - 18 */
        @include sc(.56rem,#999);
        opacity: 1;
    }
</style>
