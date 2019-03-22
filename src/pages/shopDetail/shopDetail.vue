<template>
  <div>
    <head-top head-title="商家详情" go-back="true"></head-top>
    <section class="shop_deatail_content" v-if="shopDetail">
      <h3 class="shop_detail_activice">活动和属性</h3>
      <ul>
        <li v-for="(item,index) in shopDetail.activities">
          <span class="shop_detail_activice_icon_name" :style="{backgroundColor:'#'+item.icon_color}">{{item.icon_name}}</span>
          <span class="shop_detail_activice_description">{{item.description}}(App专享)</span>
        </li>
      </ul>
      <ul>
        <li v-for="(item,index) in shopDetail.supports">
          <span class="shop_detail_activice_icon_name" :style="{backgroundColor:'#'+item.icon_color}">{{item.icon_name}}</span>
          <span class="shop_detail_activice_description">{{item.description}}(App专享)</span>
        </li>
      </ul>
    </section>
    <section style="background-color: white;margin-top: .4rem">
      <section class="shop_deatail_safe">
        <h3 class="shop_detail_activice" style="border-color: white">食品安全公示</h3>
        <section class="shop_deatail_safe_right">
          <h3 class="hop_deatail_safe_description">食品安全公示</h3>
          <img src="../../assets/right.png"/>
        </section>
      </section>
      <section class="shop_deatail_safe_bttom">
        <img :src="shopDetail.status != 1 ? require('../../assets/crying_face.png') : require('../../assets/smile_face.png')"/>
        <section class="shop_deatail_safe_bttom_des">
          <section class="shop_deatail_safe_bttom_des_results">
            <span>监督检查结果:</span>
            <span :style="{color:shopDetail.status!=1?'red':'#d4237a'}">{{shopDetail.status!=1 ? "差": "好"}}</span>
          </section>
          <section class="shop_deatail_safe_bttom_des_time">
            <span>检查日期：</span>
            <span>2019-07-19</span>
          </section>
        </section>
      </section>
    </section>
    <section style="margin-top: .4rem;background-color: white">
      <h3 class="shop_detail_activice">商家信息</h3>
      <section class="shop_deatail_merchants">{{shopDetail.name}}</section>
      <section class="shop_deatail_merchants">地址：{{shopDetail.address}}</section>
      <section class="shop_deatail_merchants">营业时间：{{shopDetail.opening_hours[0]}}</section>
      <section @click="sectionAction" class="shop_deatail_merchants_business">
        <section class="shop_deatail_merchants" style="border-color: white">营业执照</section>
        <img src="../../assets/right.png"/>
      </section>
      <section @click="sectionAction"  class="shop_deatail_merchants_business">
        <section class="shop_deatail_merchants" style="border-color: white">餐饮服务许可证</section>
        <img src="../../assets/right.png"/>
      </section>
    </section>
    <alter title="提示" ref="tip" message="我没有写，你写吧" show-confirm="true"></alter>
  </div>
</template>

<script>
import HeadTop from '../../components/head'
import {shopDetails} from "../../service/getData";
import alter from '../../components/alertTip'
import {mapState} from 'vuex'
export default {
  name: "shopDetail",
  data(){
      return{
        shopId:0
      }
  },
  components:{HeadTop,alter},
  computed:{
    ...mapState({
      shopDetail:'shop_deatail'
    })
  },
  created(){
    this.shopId = this.$route.query.id;
  },
  mounted(){
    this.initData();
  },
  methods:{
    async initData(){
      // this.shopDetail= await shopDetails(this.shopId);
      // console.log(this.shopDetail);
    },
    sectionAction(){
      this.$refs.tip.showTip();
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";
  .shop_deatail_content {
    margin-top: 2.4rem;
    background-color: white;
  }
  .shop_detail_activice {
    @include sc(.75rem,#333);
    padding-left: .6rem;
    border-bottom: 1px solid #f1f1f1;
    line-height: 1.8rem;

  }
  li{
    padding-bottom: .2rem;
  }
  .shop_detail_activice_icon_name {
    @include sc(.45rem,#fff);
    padding: 2px;
    margin-left: .4rem;
    border-radius: 2px;
    background-color: red;
  }
  .shop_detail_activice_description {
    @include sc(.55rem,#666)
  }

  .shop_deatail_safe {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #f1f1f1;


  }
  .shop_deatail_safe_right{
    padding-right: .5rem;
    display: flex;
    align-items: center;
    img{
      margin-left: .3rem;
      @include wh(.6rem,.6rem);
    }
    .hop_deatail_safe_description {
      color: #999;
      @include sc(.65rem,#999);
    }
  }
  .shop_deatail_safe_bttom {
    display: flex;
    padding: .6rem;
    align-items: center;

    img{
      @include wh(1.5rem,1.5rem);
    }
    .shop_deatail_safe_bttom_des {
      margin-left: .7rem;
      span{
        @include sc(.65rem,#333);
      }
    }
  }
  .shop_deatail_merchants {
    margin-left: .6rem;
    @include sc(.55rem,#999);
    padding: .5rem 0 ;
    border-bottom: solid 1px #f1f1f1;
  }
  .shop_deatail_merchants_business {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #f1f1f1;
    img{
      @include wh(.8rem,.8rem);
      margin-right: .6rem;
    }
  }

</style>
