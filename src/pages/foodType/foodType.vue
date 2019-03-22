<template>
  <div class="display: flex;">
    <head-top go-back="true" :head-title="name"></head-top>
    <section class="food_type_head">
      <section class="food_type_head_item" @click="showTypeAction(1)">
        <span>{{categoryTitle}}</span>
        <img :src="showCategory ? require('../../assets/up.png'):require('../../assets/down.png')"/>
      </section>
      <span class="food_type_line"></span>
      <section class="food_type_head_item" @click="showTypeAction(2)">
        <span>排序</span>
        <img :src="showSort ? require('../../assets/up.png'):require('../../assets/down.png')"/>
      </section>
      <span class="food_type_line"></span>
      <section class="food_type_head_item" @click="showTypeAction(3)">
        <span>筛选</span>
        <img :src="showFilter ? require('../../assets/up.png'):require('../../assets/down.png')"/>
      </section>
    </section>
    <section style="margin-top: 3.2rem;">
      <section style=";">
        <shop-list></shop-list>
      </section>
      <transition name="showlist" model="out-in">
        <section class="food_type_content" v-if="showSort || showCategory || showFilter">
          <section class="food_type_category" v-if="categoryList && showCategory">
            <section class="food_type_left_content">
              <ul>
                <li @click="selectFoodType(index)" v-for="(category,index) in categoryList" :key="index">
                  <section class="foot_type_left_view" :class="{show:selectTypeIndex == index}">
                    <section class="foot_type_name_view">
                      <img :src="getImgPath(category.image_url)"/>
                      <span>{{category.name}}</span>
                    </section>
                    <section class="foot_type_number_view">
                      <span>{{category.count}}</span>
                      <img src="../../assets/right.png"/>
                    </section>
                  </section>
                </li>
              </ul>
            </section>
            <section class="food_type_right_content">
              <ul>
                <li v-for="(sub_category,sub_index) in sub_categoryList" :key="sub_index">
                  <section class="food_type_right_view" @click="subCategoryAction(sub_category)">
                    <span>{{sub_category.name}}</span>
                    <span>{{sub_category.count}}</span>
                  </section>
                </li>
              </ul>
            </section>
          </section>
          <section class="food_type_sort" v-if="sortList && showSort">
            <ul>
              <li v-for="(sort,index) in sortList" :key="index">
                <section class="food_type_sort_view" @click="selectSortAction(index)">
                  <img :src="sort.image"/>
                  <section class="food_type_sort_name">
                    <span>{{sort.name}}</span>
                    <img src="../../assets/check.png" v-if="selectSortIndex == index"/>
                  </section>
                </section>
              </li>
            </ul>
          </section>
          <section class="foot_type_filter" v-if="showFilter">
            <section style="padding: 0 .4rem ">
              <span class="foot_type_filter_span">配送方式</span>
              <ul>
                <li class="food_type_device_filter" v-for="(deviceModel,index) in deliveryModesList" :key="index">
                  <section class="food_type_device_filter_item" @click="deviceFiterAction(index)">
                    <img :src="deviceModel.selected?require('../../assets/check.png'):require('../../assets/bird.png')"/>
                    <span class="foot_type_filter_span" :class="{selected_span:deviceModel.selected}">{{deviceModel.text}}</span>
                  </section>
                </li>
              </ul>
              <span class="foot_type_filter_span">商家属性(可以多选)</span>
              <ul class="food_type_attributes_filter">
                <li class="food_type_attributes_filter_item" v-for="(attributes,index) in activityAttributesList":key="index">
                  <section class="food_type_attributes_filter_item_content" @click="selectAttributesAction(index)">
                    <img v-if="attributes.selected" src="../../assets/check.png" class="food_type_filter_check"/>
                    <span v-else class="food_type_attributes_icon foot_type_filter_span" :style="{color:'#'+ attributes.icon_color,borderColor:'#'+ attributes.icon_color}">{{attributes.icon_name}}</span>
                    <span class="food_type_attributes_name foot_type_filter_span" :class="{selected_span:attributes.selected}">{{attributes.name}}</span>
                  </section>
                </li>
              </ul>
            </section>
            <section class="foot_type_filter_base_btn">
              <span class="foot_type_filter_base_btn_item" @click="cleanAction">清空</span>
              <span class="foot_type_filter_base_btn_item" @click="submitAction" style="background-color: #56d176;color: white">确定</span>
            </section>
          </section>
        </section>

      </transition>
      <div class="buy_food_mask_view" @click="removeMask" v-if="showMaskView"></div>
    </section>
  </div>
</template>

<script>
import HeadTop from '../../components/head'

import shopList from '../../components/shoplist'
import {categoryServiceList,activityAttributes,deliveryModes} from '../../service/getData'
import { getImgPath } from "../../components/mixin";
import index from "../../router";

export default {
  name: "foodType",
  data(){
   return{
     typeId:null,
     name:'',
     categoryList:[],/// 一级分类
     sub_categoryList:[],/// 二级分类
     categoryTitle:"分类",
     deliveryModesList:[],/// 配送方式
     activityAttributesList:[],/// 商家属性
     showMaskView:false,
     selectTypeIndex:0,
     showCategory:false,
     selectSortIndex:0,
     showSort:false,
     showFilter:false,
     sortList:[
       {"name":"智能排序",
         "image":require("../../assets/sort.png"),
       },
       {"name":"距离最近",
         "image":require("../../assets/address.png"),
       },
       {"name":"销量最高",
         "image":require("../../assets/hot.png"),
         "selected":0
       },
       {"name":"起送价最低",
         "image":require("../../assets/money.png"),
       },
       {"name":"配送速度最快",
         "image":require("../../assets/time.png"),
       },
       {"name":"评分最高",
         "image":require("../../assets/star.png"),
       }
     ]
   }
  },
  mixins: [getImgPath],
  components:{HeadTop,shopList},
  created(){
    this.typeId = this.$route.query.id;
    this.name = this.$route.query.name;
    this.initData();

  },
  methods:{
    async initData(){
      this.categoryList = await categoryServiceList();
      this.activityAttributesList = await  activityAttributes();
      this.deliveryModesList = await deliveryModes();
      this.sub_categoryList = this.categoryList[this.selectTypeIndex]["sub_categories"];
    },
    /**
     * 选择那个分类
     * @param index
     */
    selectFoodType(index){
      this.selectTypeIndex = index;
      this.sub_categoryList = this.categoryList[index]["sub_categories"];
    },
    /**
     * 选择的那个排序方式
     * @param index
     */
    selectSortAction(index){
      //:todo 获取到分类后，再次请求数据显示
      this.selectSortIndex = index;
      this.removeMask();
    },

    subCategoryAction(sub_category){
      this.categoryTitle = sub_category.name;
      //:todo 获取到分类后，再次请求数据显示
      this.removeMask();
    },
    /**
     * 选择方式的店家action
     * @param index
     */
    showTypeAction(index){
      if (index==1){
        this.showCategory = !this.showCategory;
        this.showSort = false;
        this.showFilter = false;
      } else if (index == 2){
        this.showSort = !this.showSort;
        this.showCategory = false;
        this.showFilter = false;
      }else if (index == 3){
        this.showSort = false;
        this.showCategory = false;
        this.showFilter = !this.showFilter;
      }
      if (this.showCategory || this.showSort || this.showFilter){
        this.showMaskView = true
      } else {
        this.showMaskView = false;
      }

    },
    deviceFiterAction(index){
      const  deviceModel = this.deliveryModesList[index];
      const  selected = _.get(deviceModel,"selected",false);
      deviceModel.selected = !selected;
      this.$set(this.deliveryModesList,index,deviceModel);
    },
    selectAttributesAction(index){
      const  attributes = this.activityAttributesList[index];
      const  selcted = _.get(attributes,"selected",false);
      attributes.selected = !selcted;
      this.$set(this.activityAttributesList,index,attributes);
    },
    /**
     * 情况按钮
      */
    cleanAction(){
      this.activityAttributesList = this.activityAttributesList.map(res=>{
        if (_.get(res,"selected",false)){
          res.selected = false;
        }
        return res;
      });
      this.deliveryModesList = this.deliveryModesList.map(res=>{
        if (_.get(res,"selected",false)){
          res.selected = false;
        }
        return res;
      });
    },
    /**
     * 确认按钮
     */
    submitAction(){
      this.removeMask();
      //:todo 获取到分类后，再次请求数据显示
    },
    removeMask(){
      this.showMaskView = false;
      this.showCategory = false;
      this.showSort = false;
      this.showFilter = false;
    }
  }

}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";
  .food_type_head {
    background-color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 1.95rem;
    display: flex;
    z-index: 14;
    align-items: center;
    @include wh(100%,100%);
    @include wh(100%,1.5rem);
    .food_type_head_item{
      width: 33%;
      text-align: center;
      @include sc(.5rem,#333);
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        @include wh(.8rem,.8rem);
      }
    }
    .food_type_line {
      @include wh(1px,60%);
      background-color: #999;
    }
  }
  .food_type_content {
    position: absolute;
    left: 0;
    right: 0;
    top: 3.5rem;
    background-color: #f1f1f1;
    z-index: 12;
  }
  .foot_type_filter_span {
    @include sc(.5rem,#333);
  }
  .food_type_category {
    display: flex;
    max-height: 10rem;
    .food_type_left_content {
      width: 50%;
      overflow-y: auto;
      .foot_type_left_view {
        display: flex;
        justify-content:space-between;
        padding: .4rem;
        .foot_type_name_view {
          display: flex;
          align-items: center;
          img{
            @include wh(.8rem,.8rem);
            margin-right: .2rem;
          }
        }
        .foot_type_number_view {
          display: flex;
          align-items: center;
          img{
            @include wh(.5rem,.5rem);
            margin-left: .2rem;
          }

        }
        span{
          @include sc(.5rem,#999);
        }
      }
    }
    .show{
      background-color:  white;
    }
    .food_type_right_content{
      width: 50%;
      overflow-y: auto;
      .food_type_right_view{
        display: flex;
        justify-content: space-between;
        background-color: white;
        border-bottom: 1px solid #f1f1f1;
        padding: 0.5rem;
        span{
          @include sc(.5rem,#666);
        }
      }

    }
  }
  .food_type_sort {
    background-color: white;
    overflow-y: auto;
    .food_type_sort_view {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 .3rem;
      img{
        @include wh(.8rem,.8rem);
      }
    }
    .food_type_sort_name{
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 0.3rem;
      border-bottom: #f1f1f1 solid 1px;
      padding: .6rem 0rem;
      span{
        @include sc(.7rem,#666);
      }
      img{
        @include wh(.8rem,.8rem);
      }
    }
  }
  .foot_type_filter{
    max-height: 10rem;
    background-color: white;

    .food_type_device_filter {
      display: flex;
      justify-content: left;
      .food_type_device_filter_item {
        @include wh(30%,1.3rem);
        display: flex;
        margin-top: .2rem;
        align-items: center;
        border: 1px solid #eee;
        border-radius: .2rem;
      }
      img{
        @include wh(.8rem,.8rem);
        margin-left: .3rem;
      }
      span{
        margin-left: .2rem;
      }
    }
    .food_type_filter_check{
      @include wh(.8rem,.8rem);
      margin-left: .2rem;
    }
    .food_type_attributes_filter{
      display: flex;
      flex-wrap:wrap;
      padding-bottom: .4rem;
      .food_type_attributes_filter_item{
        width: 30%;
        .food_type_attributes_filter_item_content {
          display: flex;
          margin-right: .5rem;
          border: 1px solid #eee;
          border-radius: .2rem;
          text-align: center;
          height: 1.3rem;
          align-items: center;
          margin-top: .2rem;
          .food_type_attributes_icon {
            border: 1px solid #eee;
            border-radius: .1rem;
            padding: .08rem .12rem;
            margin-left: .2rem;
          }
          .food_type_attributes_name {
            margin-left: .2rem;
          }
        }
      }
    }
    .foot_type_filter_base_btn{
      background-color: #f1f1f1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding:.3rem ;
      .foot_type_filter_base_btn_item {
        @include wh(45%,1.8rem);
        background-color: white;
        text-align: center;
        line-height: 1.8rem;
        @include sc(.8rem,#333);
        border-radius: 5px;
      }

    }
  }
  .selected_span {
    color:#3190e8;
  }

  .buy_food_mask_view {
    background-color: rgba(0,0,0,.3);
    position: fixed;
    z-index: 11;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .showlist-enter-active,
  .showlist-leave-active {
    transition: all 0.3s;
    transform: translateY(0);
  }
  .showlist-enter,
  .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }
</style>
