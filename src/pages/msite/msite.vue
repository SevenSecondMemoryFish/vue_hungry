<template>
  <div>
    <head-top signin-up="msite">
      <router-link to="msite" class="link_search" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2px"/>
        </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </head-top>
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container" v-for="(item,index) in foodTypes" :key="index">
            <router-link :to="{path:'foodType',query:{id:foodItem._id,name:foodItem.title}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
              <figure>
                <img :src="imageBaseUrl + foodItem.image_url"/>
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <div class="shop_list_container">
      <header class="shop_header">
        <svg class="shop_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span class="shop_header_title">附近商家</span>
      </header>
     <div v-if="[1,2,3,4,5]">
       <shop-list></shop-list>
     </div>
    </div>
    <foot-guide selector-index="0"></foot-guide>
  </div>
</template>

<script>
    import FootGuide from '../../components/footGuide'
    import HeadTop from '../../components/head'
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    import ShopList from "../../components/shoplist"
    import {msiterFoodTypes} from '../../service/getData'
    export default {
      data(){
       return{
         msiteTitle:"选择地址....",
         foodTypes:[],
         imageBaseUrl:'https://fuss10.elemecdn.com'
       }
      },
        name: 'msite',
        components: {ShopList, HeadTop, FootGuide},
      mounted(){
        msiterFoodTypes('32.88901,108.5077').then(response=>{
          let footArry = [];
          let resArr = [...response];
           for (let i = 0,j=0; i< response.length; i+=8,j++){
             footArry[j] = resArr.splice(0,8);
           }
           this.foodTypes = footArry;
        }).then(()=>{
          new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            loop: true,
            autoplay:true,
            pagination: {
              el: '.swiper-pagination',
            },
          });
        });
      },
    }
</script>

<style lang="scss"  scoped>
  @import "../../style/mixin";
  .link_search{
    left: .8rem;
    @include wh(.9rem, .9rem);
    @include ct;
  }
  .msite_title{
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    margin-left: -0.5rem;
    .title_text{
      @include sc(0.8rem, #fff);
      text-align: center;
      display: block;
    }
  }
  .msite_nav{
    padding-top: 2.1rem;
    background-color: #fff;
    border-bottom: 0.025rem solid $bc;
    height: 10.6rem;
    .swiper-container{
      @include wh(100%, auto);
      padding-bottom: 0.6rem;
      .swiper-pagination{
        bottom: 0.2rem;
      }
    }
    .fl_back{
      @include wh(100%, 100%);
    }
  }
  .food_types_container{
    display:flex;
    flex-wrap: wrap;
    .link_to_food{
      width: 25%;
      padding: 0.3rem 0rem;
      @include fj(center);
      figure{
        img{
          margin-bottom: 0.3rem;
          @include wh(1.8rem, 1.8rem);
        }
        figcaption{
          text-align: center;
          @include sc(0.55rem, #666);
        }
      }
    }
  }
  .shop_list_container{
    margin-top: .4rem;
    border-top: 0.025rem solid $bc;
    background-color: #fff;
    .shop_header{
      .shop_icon{
        fill: #999;
        margin-left: 0.6rem;
        vertical-align: middle;
        @include wh(0.6rem, 0.6rem);
      }
      .shop_header_title{
        color: #999;
        @include font(0.55rem, 1.6rem);
      }
    }
  }
</style>
