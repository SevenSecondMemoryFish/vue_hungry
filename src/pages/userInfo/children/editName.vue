<template>
    <div class="edit_name_page">
        <head_top head-title="修改用户名" go-back="true"></head_top>
        <section class="edit_name_content_item">
            <input placeholder="请输入用户名" :class="{warning:verifyname}" type="text" v-model="name" />
            <span v-if="verifyname" :class="{warning:verifyname}">用户名长度为4到25个字符</span>
            <span v-else>用户名只能修改一次(5~24个字符)</span>
        </section>
        <section class="point_withdrawal" @click="pointProductAction">确认修改</section>

    </div>
</template>

<script>
    import head_top from '../../../components/head'
    export default {
        name: "editName",
        components:{head_top},
        data(){
            return {
                name:null
            }
        },
        computed:{
            verifyname:function () {
                if (this.name == null)return false;
                if (this.name.length <= 0)return true;
                return false;
            },
        },
        methods:{
            pointProductAction(){
                this.$router.go(-1);
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../style/mixin";
    .edit_name_page {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0rem;
        background-color: #f2f2f2;
    }
    .edit_name_content_item {
        display: flex;
        flex-direction: column;
        padding: .4rem;
        margin-top: 1.95rem;
        span{
            @include sc(.3rem,#666);
            margin-top: .4rem;
        }
        input{
            @include sc(.6rem,#333);
            padding-left: .3rem;
            border-radius: .2rem;
            border: 1px solid #ddd;
            height: 1.8rem;
            background-color: #f2f2f2;
        }
        .warning {
            border-color: #ea3106;
            color: #ea3106;
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
