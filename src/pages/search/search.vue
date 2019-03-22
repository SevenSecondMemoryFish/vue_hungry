<template>

  <div style="display: flex;flex-direction: column;height: 100%;position: absolute;left: 0;right: 0">
    <head_top head-title="搜索"></head_top>
    <section class="search_content">
      <section class="search_header_content">
        <input class="search_input" v-model="keyword"   placeholder="请输入商家或者没事名称" type="search" />
        <section class="search_section" @click="searchStoreAction">搜索</section>
      </section>
      <section class="search_history_content" v-if="historyList.length>0||storeList.length>0">
        <section class="search_title">{{ showSeachStore ? "商家" : "历史搜索"}}</section>
        <section class="search_history_list" v-if="showHistory">
          <ul>
            <li class="search_history_li" v-for="(item,index) in historyList">
              <span>{{item}}</span>
              <img src="../../assets/error.png" @click="clearItemHistory(index)"/>
            </li>
          </ul>
          <section @click="clearAllHistory">清空搜索历史</section>
        </section>
        <section class="search_store_content" v-if="showSeachStore">
          <ul>
            <li v-for="(item,index) in storeList">
              <router-link :to="{path:'shopStroe',query:{id:item.id}}">
                <section class="store_des_conten">
                  <img :src="imgBaseUrl+item.image_path"/>
                  <section class="store_des_right_content">
                    <section style="margin-top: 0" class="store_des_right_name_content">{{item.name}}</section>
                    <section class="store_des_right_des_content">月售{{item.recent_order_num}}单</section>
                    <section class="store_des_right_des_content">{{item.float_minimum_order_amount}}元起送 / 距离{{item.distance}}</section>
                  </section>
                </section>
              </router-link>
            </li>
          </ul>
        </section>
      </section>
    </section>
    <foot-guide selector-index="1"></foot-guide>
  </div>
</template>

<script>
  import footGuide from '../../components/footGuide'
  import head_top from '../../components/head'
  import {searchStore } from  '../../service/getData'
  import {imgBaseUrl} from '../../config/env'
  import { mapMutations,mapState } from 'vuex'
  export default {
    name: "search",
    data(){
      return{
        storeList:[],
        showHistory:true,
        showSeachStore:false,
        keyword:'',
        imgBaseUrl
      }
    },
    components:{footGuide,head_top},
    computed:{
      ...mapState({
        historyList:"search_history_list"
      })
    },
    watch:{
      keyword(value){
        if (value == undefined || value == null || value.length <=0){
          this.showSeachStore = false;
          this.showHistory = true;
        }
      }

    },
    methods:{
      ...mapMutations(["MUTATIONS_REMOVE_SEARCH_HISTORY",
        "MUTATIONS_ADD_SEARCH_HISTORY",
        "MUTATIONS_REMOVE_ITEM_SEARCH_HISTORY"]),
      async searchStoreAction(){
        if (this.keyword.length <=0 )return
        this.MUTATIONS_ADD_SEARCH_HISTORY(this.keyword);
        this.showSeachStore = true;
        this.showHistory = false;
        this.storeList = [];
        this.storeList = await  searchStore(this.keyword);

      },
      clearAllHistory(){
        this.MUTATIONS_REMOVE_SEARCH_HISTORY();
      },
      clearItemHistory(index){
        this.MUTATIONS_REMOVE_ITEM_SEARCH_HISTORY(index);
      },
    }
  }
</script>

<style lang="scss"  scoped >
  @import "../../style/mixin.scss";

  .search_content {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    flex: 1;
  }
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
  .search_history_content {
    display: flex;
    flex-direction: column;

  }
  .search_title {
    font-weight: 700;
    font-size: .6rem;
    margin: .4rem;
    @include  sc(.7rem,#666);

  }
  .search_history_list{
    background-color: white;
    flex: 1;
    overflow-y: auto;

  }
  .search_history_li {
    display: flex;
    align-items: center;
    padding: .5rem .4rem ;
    justify-content: space-between;
    border-bottom: 1px solid #e4e4e4;
  }
  .search_history_li img{
    height: .8rem;
    width: .8rem;
  }
  .search_history_li span{
    color: #666;
    font-size: .6rem;

  }
  .search_history_list section{
    color: #3190e8;
    font-size: .7rem;
    line-height: 1.8rem;
    height: 1.8rem;
    text-align: center;
    font-weight: 700;

  }
  .search_store_content {
    background-color: white;
    flex: 1;
    overflow-y: auto;
  }
  .store_des_conten {
    display: flex;
    padding: .4rem .4rem .6rem .4rem;
    border-bottom: .025rem solid #e4e4e4;
  }
  .store_des_conten img{
    height: 1.8rem;
    width: 1.8rem;
    border-radius: .1rem;
    background-color: rebeccapurple;
  }
  .store_des_right_content {
    margin-left: .4rem;
    font-size: .6rem;
    color: #999;

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
