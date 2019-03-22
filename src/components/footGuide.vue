<template>
    <section id="foot_guide">
      <section class="guide_item" @click="sectionAction(0,'/')">
        <img v-if="selectorIndex == 0"  class="guide_item_image" src="../images/home_s.png"/>
        <img v-else class="guide_item_image" src="../images/home_n.png"/>
        <span v-bind:class="{selectspan:selectorIndex == 0}">外卖</span>
      </section>
      <section class="guide_item" @click="sectionAction(1,'/search')">
        <img class="guide_item_image" :src="selectorIndex == 1 ? require('../images/s_s.png'):require('../images/s_n.png')"/>
        <span v-bind:class="{selectspan:selectorIndex == 1}">搜索</span>
      </section>
      <section class="guide_item" @click="sectionAction(2,'/order')">
        <img class="guide_item_image" :src="selectorIndex == 2 ? require('../images/order_s.png'):require('../images/order_n.png')"/>
        <span :class="{selectspan:selectorIndex==2}">订单</span>
      </section>
      <section class="guide_item" @click="sectionAction(3,'/user')">
        <img class="guide_item_image" :src="selectorIndex == 3 ? require('../images/profile_s.png'):require('../images/profile_n.png')"/>
        <span :class="{selectspan:selectorIndex==3}">我的</span>
      </section>
    </section>
</template>

<script>
    export default {
      props:['selectorIndex'],
      methods:{
        sectionAction(index,router){
          this.$router.push(router)
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import '../style/mixin.scss';
  #foot_guide{

    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    @include wh(100%,1.95rme);
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
  }
  .guide_item {
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    display: flex;
  }
  .guide_item_image{
    margin-top: 5px;
    @include wh(1rem,1rem)
  }
  span{
    color: darkgray;
    font-size: 12px;
    padding: 2px 0px;
  }
  .selectspan{
    color: rgb(68,143,212);
  }
</style>
