<template>
    <section class="search_header_content">
        <input class="search_input" v-model="keyword"  v-bind="$attrs"   type="search" />
        <section class="search_section" @click="searchAction">{{search_title}}</section>
    </section>
</template>

<script>
    export default {
        name: "seach-component",
        data(){
           return{
               keyword:""
           }
        },
        inheritAttrs:false,
        props: ["search_title"],
        methods:{
            searchAction(){
                this.$emit("searchaction",this.keyword);
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../style/mixin";
    .search_header_content{
        display: flex;
        align-items: center;
        background-color: white;
        flex-shrink: 0;
    }
    .search_input{
        height: 1.8rem;
        flex: 1;
        margin: .4rem ;
        background-color: #e4e4e4;
        border-radius: .2rem;
        font-size: .7rem;
        font-weight: bold;
        color: #333;
        padding:  0 .3rem;
    }
    .search_section {
        background-color: #3190e8;
        color: white;
        font-size: .8rem;
        height: 1.8rem;
        line-height: 1.8rem;
        text-align: center;
        padding: 0 .8rem;
        margin-right: .3rem;
        border-radius: .3rem;
        flex-shrink: 0;
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
