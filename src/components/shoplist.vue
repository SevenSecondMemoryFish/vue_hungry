<template>
    <div id="shop_list_container">
      <ul v-if="shopList.length">
        <router-link class="shop_list" :to="{path:'shopStroe',query:{id:item.id}}" v-for="item in shopList" tag="li" :key="item.id" >
          <section>
            <img :src="imgBaseUrl + item.image_path" class="shop_img"/>
          </section>
          <section class="shop_right">
            <header class="shop_detail_header">
              <h4 class="shop_title ellipsis premium ">{{item.name}}</h4>
              <ul class="shop_detail_ul">
                <li v-for="item_s in item.supports" class="supports">{{item_s.icon_name}}</li>
              </ul>
            </header>
            <h5 class="rating_order_num">
              <section class="rating_order_num_left">
                <span class="rating_num">{{item.rating}} </span>
                <span class="order_section">
                  月售{{item.recent_order_num}}单
                </span>
              </section>
              <section class="rating_order_num_right">
                <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                <span class="delivery_style delivery_right">准时达</span>
              </section>
            </h5>
            <h5 class="fee_distance">
              <section class="fee">
                <span v-if="item.piecewise_agent_fee">￥{{item.float_minimum_order_amount}}元起送/{{item.piecewise_agent_fee.tips}}</span>
              </section>
              <section>
                <span class="fee_distance_left">{{item.distance}}/</span>
                <span class="fee_distance_right">{{item.order_lead_time}}</span>
              </section>
            </h5>
          </section>
        </router-link>
      </ul>
    </div>
</template>

<script>
import {shopListNetwork} from '../service/getData'
import {imgBaseUrl} from  '../config/env'
export default {
  name:'shopList',
  data(){
      return {
        shopList:[],
        imgBaseUrl
      }
  },
  props:[""],
  methods:{
    async shopListData(){
      shopListNetwork(0).then(response=>{
        this.shopList = response;
      })
    }
  },
  mounted(){

    this.shopListData()

  },
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin";
  .shop_list_container {
    background-color: #fff;
    margin-bottom: 2rem;
  }
  .shop_list{
    display: flex;
    border-bottom: 0.025rem solid #f1f1f1;
    padding: 0.7rem 0.4rem;
  }
  .shop_img {
    @include wh(2.7rem, 2.7rem);
    display: block;
    background-color: #3190e8;
  }
  .shop_right {
    margin-left: 0.4rem;
    flex: auto;
    align-content: space-around;
    .shop_detail_header {
      @include fj();
      .shop_title {
        width: 8.5rem;
        color: #333;
        @include font(0.65rem,0.65rem,'PingFangSC-Regular');
        font-weight: 700;
      }
    }
    .premium:before{
      content: "品牌";
      display: inline-block;
      font-size: 0.5rem;
      line-height: 0.6rem;
      color: #333;
      background-color: #ffd930;
      padding: 0 0.1rem;
      /*margin-right: 0.2rem;*/
      border-radius: 0.2rem;
    }
    .shop_detail_ul {
      display: flex;
      transform: scale(0.8);
      margin-right: -0.3rem;
      .supports {
        @include sc(0.5rem ,#999);
        border: 0.025rem solid #f1f1f1;
        padding: 0 0.04rem;
        border-radius: 0.08rem;
        margin-left: 0.05rem;
      }
    }
  }
 .rating_order_num {
   display: flex;
   width: 100%;
   justify-content: space-between;
   margin-top: 0.52rem;
   .rating_order_num_left {
     display: flex;
     .rating_num {
       @include sc(0.4rem ,#ff6000);
       margin: 0 0.2rem;
     }
     .order_section {
       transform: scale(0.8);
       margin-left: -0.2rem;
       @include sc(0.4rem,#666);
     }
   }
   .rating_order_num_right{
     font-size: 0.4rem;
     transform: scale(.7);
     margin-right: -0.8rem;
     .delivery_style{
       padding: 0.04rem  0.08rem 0;
       border-radius: 0.08rem;
       margin-left: 0.08rem;
       border: 1px;
       border: 0.025rem solid $blue;
     }
     .delivery_left{
       color: #ffffff;
       background-color: $blue;
     }
     .delivery_right{
       color: $blue;
     }
   }
 }
.fee_distance{
  margin-top: 0.52rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.4rem;
  .fee span{
    color: #666;
  }
  .fee_distance_left {
    color: #999;
  }
  .fee_distance_right {
    color: $blue;
  }
}

</style>
