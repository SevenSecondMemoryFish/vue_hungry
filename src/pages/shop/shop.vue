<template>
  <div class="shop_container">
    <header class="shop_detail_header" v-if="shopDetailData">
      <nav class="go_back_image" @click="goback">
        <img src="../../assets/go_back.png"/>
      </nav>
      <img  :src="imgBaseUrl + shopDetailData.image_path" class="header_cover_img"/>
      <section class="description_header">
        <router-link class="description_top" to="/shopDetail">
          <section class="description_left">
            <img :src="imgBaseUrl + shopDetailData.image_path"/>
          </section>
          <section class="description_right">
            <h4 class="description_title">{{shopDetailData.name}}</h4>
            <p class="description_text">商家配送/{{shopDetailData.order_lead_time}}分钟送达/配送费{{shopDetailData.float_delivery_fee}}</p>
            <p class="description_promotion ellipsis">公告:{{shopDetailData.promotion_info}}</p>
          </section>
          <img class="right_img" src="../../assets/right.png"/>
        </router-link>
      </section>
      <section class="change_show_type">
        <div>
          <span :class="{activity_show : changeShowType == 'food'}" @click="changeShowType='food'">商品</span>
        </div>
        <div>
          <span :class="{activity_show : changeShowType == 'rating'}" @click="changeShowType='rating'">评价</span>
        </div>
      </section>
    </header>
    <transition name="fade-choose">
      <section v-show="changeShowType == 'food'" class="food_container">
        <section class="menu-container">
          <section class="menu_left" id = "wrapper_menu" ref="wrapperMenu">
            <ul>
              <li v-for="(item,index) in menuList" :key="index" :class="{activity_menu : index == menuIndex}" class="menu_left_li" @click="chooseMenu(index)">
                <span>{{item.name}}</span>
              </li>
            </ul>
          </section>
          <section class="menu_right" >
            <ul>
              <li v-for="(item,index) in menuList" :key="index" >
                <header class="menu_detail_head_left">
                  <strong class="menu_item_title">{{item.name}}</strong>
                  <span class="menu_item_description">{{item.description}}</span>
                </header>
                <section class="menu_detail_list" v-for="(food,foodIndex) in item.foods" :key="foodIndex" >
                  <router-link to="shop" class="menu_detail_link">
                    <section class="menu_food_img">
                      <img :src="imgBaseUrl + food.image_path">
                    </section>
                    <section class="food_detaile">
                      <h4 class="food_detail_title">{{food.name}}</h4>
                      <p class="food_detail_description">{{food.description}}</p>
                      <p class="food_description_sale_rating">月售{{food.month_sales}}份 好评率{{food.satisfy_rate}}%</p>
                      <p v-if="food.activity" class="food_activity"><span>{{food.activity.image_text}}</span></p>
                    </section>
                  </router-link>
                  <footer class="menu_detail_footer">
                    <section class="food_price">
                      <span>￥{{food.specfoods[0].price}}</span>
                      <span v-if="food.specifications.length">起</span>
                    </section>
                    <buy-car :ref="food._id" style="margin-right: 0.5rem" @addshopcar="addShopCar" @removeshopcar="removeShopCar" :food="food"></buy-car>
                  </footer>
                </section>
              </li>
            </ul>
          </section>
        </section>
        <footer class="shop_car_footer" v-if="shopDetailData">
          <section class="shop_car">
            <section class="shop_car_img" :class="{shop_car_img_show:totalNumber>0}" @click="buyFoodAction">
              <img  src="../../assets/shop_car.png" />
            </section>
            <section class="shop_food_price">
              <p>￥{{totalPrice}}</p>
              <span>配送费{{shopDetailData.float_delivery_fee}}</span>
            </section>
          </section>
          <section class="shop_total_price" :class="{shop_total_price_show:totalNumber>0}">
            <span>{{totalNumber >0 ? "去结算" :"还差20元起送"}}</span>
          </section>
        </footer>
        <section v-if="showBuyFood" class="buy_food_view">
          <section class="buy_food_head">
            <span>购物车</span>
            <span @click="removeAllBuyFood">删除</span>
          </section>
          <section class="buy_food_section">
            <ul>
              <li class="buy_food_li" v-for="(buyFood ,buyIndex) in buyFoodList" v-if="buyFood.buyNum > 0" :key="buyIndex">
                <span class="buy_food_name">{{buyFood.name}}</span>
                <span>￥20</span>
                <buy-car @addshopcar="buyFoodChangeNumber" @removeshopcar="buyFoodChangeNumber" v-bind:food="buyFood"></buy-car>
              </li>
            </ul>
          </section>
        </section>
        <div class="buy_food_mask_view" @click="removeMask" v-if="showBuyFood"></div>
      </section>
    </transition>

  </div>
</template>

<script>
import {shopDetails,shopStoreMenuList} from "../../service/getData";
import {imgBaseUrl} from  '../../config/env';
import BuyCar from "../../components/buyCar";
import { mapMutations } from 'vuex'
export default {
  name: "shop1",
  components: {BuyCar},
  data(){
    return {
      shopDetailData:null,
      changeShowType:'food',
      menuList:["name","hah","222","222222"],
      menuIndex:0,
      buyFoodList:[],
      totalPrice:0,/// 购买总共的价格
      totalNumber:0,/// 购买的总数
      showBuyFood:false,
      imgBaseUrl
    }
  },
  created(){
    this.shopId = this.$route.query.id;
  },
  mounted(){
    this.initData()
  },
  methods:{
    ...mapMutations(["MUTATIONS_SHOP_DETAIL"]),
    async initData(){
      this.shopDetailData = await shopDetails(this.shopId);
      this.menuList = await shopStoreMenuList(this.shopId);
      this.MUTATIONS_SHOP_DETAIL(this.shopDetailData);
    },
    chooseMenu(index){
      this.menuIndex = index;
    },

    /**
     * 添加购物
     * @param id
     * @param number
     */
    addShopCar(id,number){
      this.menuList.forEach(menu=>{
        const food = menu.foods.find(res=>res._id === id);
        if (!!food){
          food.buyNum = _.get(food,"buyNum",0) + 1;
          this.totalNumber++;
          this.totalPrice = this.totalNumber*20;
          if (this.buyFoodList.indexOf(food) == -1){
            this.buyFoodList.push(food);
          }
        }
      });
    },
    /**
     * 减少购物
     * @param id
     * @param number
     */
    removeShopCar(id,number){
      this.menuList.forEach(menu=>{
       const food = menu.foods.find(res=>res._id === id);
       if (!!food){
         food.buyNum = number;
         this.totalNumber--;
         this.totalPrice = this.totalNumber*20;
         if (number == 0){
           this.buyFoodList.slice(food,1);
         }
       }
      });
    },
    /**
     * 购买产品的显示
     */
    buyFoodAction(){
      if(this.totalNumber<=0)return;
      this.showBuyFood = !this.showBuyFood;

    },
    removeAllBuyFood(){
      this.showBuyFood = false;
      this.buyFoodList.clear();
    },
    /**
     * 底部添加按钮方法
     * @param id
     * @param number
     */
    buyFoodChangeNumber(id,number){
      console.log(id);
      const  objc = _.get(this.$refs,id);
      objc[0].changeNumber(number);
      let totableNum = 0;
      let food;
      this.buyFoodList.forEach(res=>{
        if (res._id === id){
          res.buyNum = number;
          food = res;
        }
        totableNum += res.buyNum;
      });
      this.totalNumber = totableNum;
      this.totalPrice = this.totalNumber*20;
      if (this.totalNumber <= 0){
        this.removeMask();
      }
      console.log(index);
      if (number == 0){
        // this.buyFoodList.splice(index,1);
      }
    },

    removeMask(){
      this.showBuyFood = false;
    },
    goback(){
      this.$router.go(-1);
    }

  }


}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";

  .shop_container {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
  }
  .go_back_image {
    position: absolute;
    width: 40%;
    height: 2rem;
    z-index: 100;
    img{
      @include wh(1rem,1rem);
      margin-left: 0.5rem;
      margin-top: 0.2rem;
    }
  }
  .shop_detail_header {
    /*overflow: hidden;*/
    position: relative;
    .header_cover_img {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      filter:blur(10px);
    }
    .description_header{
      position: relative;
      z-index: 10;
      background-color: rgba(119,103,137,.43);
      padding: 0.4rem 0 0.4rem 0.4rem;
      width: 100%;
      overflow: hidden;
      .description_top{
        display: flex;
        align-items: center;
        .description_left{
          margin-right: 0.3rem;
          img{
            @include  wh(2.9rem,2.9rem);
            display: block;
            border-radius: 0.15rem;
          }
        }
        .description_right {
          flex-grow: 1;
          .description_title {
            @include sc(0.8rem,#fff);
            font-weight: bold;
            width: 100%;
            margin-bottom: .3rem;
          }
          .description_text{
            @include sc(0.3rem,#fff);
            margin-bottom: 0.3rem;
          }
          .description_promotion {
            @include sc(0.5rem,#fff);
          }

        }

        .right_img{
          @include wh(1rem,1rem);
          margin-right: .2rem;
        }
      }

    }
    .change_show_type {
      display: flex;
      position: relative;
      background-color: #ffffff;
      z-index: 10;
      justify-content: space-around;
      padding: 0.3rem 0;
      border-bottom: 1px solid #ebebeb;
      div{
        span{
          @include sc(0.65rem,#666);
          border-bottom: #ffffff solid 1px;
          padding: .2rem 0.1rem;

        }
        .activity_show {
          color: #3190e8;
          border-color: #3190e8;
        }
      }


    }

  }
  .food_container{
    display: flex;
    flex: 1;
    position: relative;
    flex-direction: column;
    z-index: 10;

  }
  .menu-container {
    display: flex;
    flex: 1;
    overflow-y: hidden;
    position:relative;
    .menu_left {
      width: 3.8rem;
      background-color: #f8f8f8;
      overflow-y: auto;
      .menu_left_li {
        padding:  .7rem .3rem;
        border-bottom: 0.025rem solid #ededed;
        box-sizing: border-box;
        border-left: 0.15rem solid #f8f8f8;
        position: relative;
        span{
          @include sc(0.6rem,#666);
        }
      }
      .activity_menu {
        border-left: 0.15rem solid #3190e8;
        background-color: #ffffff;
      }

    }
    .menu_right {
      flex: 1;
      overflow-y: auto;
      z-index: 11;
      background-color: white;
      .menu_detail_head_left {
        background-color: #f8f8f8;
        @include wh(100%,2rem);
        line-height: 2rem;
        padding: 0 0.2rem;
        .menu_item_title {
          @include sc(0.7rem,#666)

        }
        .menu_item_description {
          @include sc(0.5rem,#999);
        }
      }
      .menu_detail_list {
        .menu_detail_link {
          padding: 0.2rem 0;
          background-color: #ffffff;
          display: flex;
          .menu_food_img{
            margin-left: .5rem;
            img{
              @include wh(2rem,2rem);
            }
          }
          .food_detaile {
            margin-left: 0.3rem;
            .food_detail_title{
              @include sc(0.7rem,#333);
              font-weight: bold;
              margin-bottom: 0.2rem;
            }
            .food_detail_description {
              @include sc(0.3rem,#999);
              margin-bottom: 0.2rem;
            }
            .food_description_sale_rating {
              @include sc(0.3rem,#666);
              margin-bottom: 0.2rem;
            }
            .food_activity {
              line-height: .8rem;
              margin-bottom: 0.2rem;
              span{
                border-radius: 0.3rem;
                border: 1px solid  rgb(240, 115, 115);
                @include sc(0.5rem,rgb(241, 136, 79));
                padding:0 0.2rem ;
              }

            }
          }
        }

        .menu_detail_footer {
          display: flex;
          padding-bottom: 0.2rem;
          background-color: #ffffff;
          justify-content: space-between;
          .food_price{
            margin-left: 2.4rem;
            line-height: 0.8rem;
            span{
              @include sc(0.7rem,#f60);
              font-weight: bold;

            }
          }
        }
      }

    }
  }
  .shop_car_footer {
    @include wh(100%,2rem);
    position: relative;
    display: flex;
    z-index: 18;
    .shop_car {
      flex-grow: 1;
      z-index: 18;
      background-color: #3d3d3f;
      .shop_car_img{
        border-radius: 50%;
        position: absolute;
        left: 1.3rem;
        top: -0.7rem;
        background-color: #3d3d3f;
        border: 0.18rem solid #444;
        display: flex;
        justify-content: center;
        align-items: center;
        @include wh(2rem,2rem);
        img{
          @include wh(1.2rem,1.2rem);
        }
      }
      .shop_car_img_show {
        background-color: #3190e8;
      }

    }
    .shop_food_price {
      margin-left: 3.5rem;
      display: flex;
      flex-direction: column;
      p{
        @include sc(0.7rem,#fff);
        font-weight: bold;
        line-height: 1rem;
      }
      span{
        @include sc(0.5rem,#fff);
        line-height: 1rem;
      }

    }
    .shop_total_price {
      @include wh(6rem,100%);
      line-height: 2rem;
      background-color: #535356;
      text-align: center;
      span{
        @include sc(0.7rem,#fff);
      }
    }

    .shop_total_price_show {
      background-color: #4cd964;
    }

  }
  .buy_food_mask_view {
    background-color: rgba(0,0,0,.3);
    position: fixed;
    z-index: 11;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .buy_food_view{
    position: absolute;
    bottom: 2rem;
    left: 0;
    right: 0;
    z-index: 12;

    background-color: white;
    .buy_food_section{
      max-height: 20rem;
      overflow-y:auto;
    }
    .buy_food_head {
      display: flex;
      padding: 0.5rem;
      justify-content: space-between;
      background-color: #eceff1;
      span{
        @include sc(.7rem,#666);
      }
    }
  }
  .buy_food_li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.4rem;
    align-items: center;
    span{
      @include sc(.7rem,#f60);
      font-weight: bold;
    }
    .buy_food_name{
      width: 55%;
      color: #666;
    }
  }
  .fade-choose-enter-active, .fade-choose-leave-active {
    transition: opacity .5s;
  }
  .fade-choose-leave, .fade-choose-leave-active {
    display: none;
  }
  .fade-choose-enter, .fade-choose-leave-active {
    opacity: 0;
  }

  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
