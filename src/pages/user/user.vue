<template>
    <div>
      <head_top head-title="用户信息"></head_top>
      <section class="user_content">
        <section class="user_info_content" @click="userHeadAction">
          <section class="user_info_content_left">
            <img src="../../assets/logo.jpg" class="user_contet_info_img"/>
            <section class="user_login_info">
              <section v-if="userInfo" class="user_login_info_top">{{userInfo.username}}</section>
              <section v-else class="user_login_info_top">登录/注册</section>
              <section>暂无绑定手机号</section>
            </section>
          </section>
          <img src="../../assets/right-white.png"/>
        </section>
        <section class="user_money_coupons">
          <router-link to="/balance" class="user_money_coupons_item">
            <section>
              <span style="color: #f90">{{userInfo ? userInfo.balance : 0.00}}</span>
              <span class="user_money_coupons_des_item">元</span>
            </section>
            <span>我的余额</span>
          </router-link>
          <router-link to="/coupon" class="user_money_coupons_item">
            <section>
              <span style="color: #ff5f3e">{{userInfo ? userInfo.gift_amount:0 }}</span>
              <span class="user_money_coupons_des_item">个</span>
            </section>
            <span>我的优惠</span>
          </router-link>
          <router-link to="/point" class="user_money_coupons_item">
            <section>
              <span style="color: #6ac20b;">{{userInfo ? userInfo.point : 0}}</span>
              <span class="user_money_coupons_des_item">个</span>
            </section>
            <span>我的积分</span>
          </router-link>
        </section>
        <section>
          <ul class="user_one_section_ul">
            <li v-for="(item,index) in userOneSectionList" >
              <section class="user_section_item">
                <img :src="item.image"/>
                <section class="user_section_item_right">
                  <span>{{item.name}}</span>
                  <img src="../../assets/right.png"/>
                </section>
              </section>
            </li>
          </ul>
          <ul class="user_one_section_ul">
            <li v-for="(item,index) in userSecondSectionList">
              <section class="user_section_item">
                <img :src="item.image"/>
                <section class="user_section_item_right">
                  <span>{{item.name}}</span>
                  <img src="../../assets/right.png"/>
                </section>
              </section>
            </li>
          </ul>
        </section>
      </section>
      <foot_guide selector-index="3"></foot_guide>
    </div>
</template>

<script>
import foot_guide from '../../components/footGuide'
import head_top from '../../components/head'
import {getUserInfo} from '../../service/getData'
export default {
  name: "user",
  data(){
    return{
      userInfo:null,
      userOneSectionList:[
        {"name":"我的订单",
        "image":require('../../assets/order.png')
        },
        {"name":"积分商城",
          "image":require('../../assets/jifen.png')
        },
        {"name":"饿了么会员卡",
          "image":require('../../assets/card.png')
        }
      ],
      userSecondSectionList:[
        {"name":"服务中心",
          "image":require('../../assets/service.png')
        },
        {"name":"下载饿了么App",
          "image":require('../../assets/elema.png')
        }
      ],
    }
  },
  components:{foot_guide,head_top},
  mounted(){
    this.initData();
  },
  methods:{
    initData(){
      getUserInfo(this.$root.$data.userId).then(res=>{
        this.userInfo = res;
        console.log(res);
      }).catch(err=>{

      })
    },
    userHeadAction(){
      if (this.userInfo){
        this.$router.push({path:"/userInfo",query:{}})
      }else {
        this.$router.push({path:"/login",query:{}})
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";

  .user_content {
    margin-top: 1.95rem;
  }
  .user_info_content {
    display:  flex;
    padding: .66rem .5rem;
    background-color: #3190e8;
    justify-content: space-between;
    align-items: center;
    .user_info_content_left {
      display: flex;
      align-items: center;
      .user_contet_info_img {
        background-color: red;
        @include wh(2.5rem,2.5rem);
        border-radius: 50%;
      }
      .user_login_info {
        margin-left: .4rem;
        @include sc(.5rem,#fff);
        section{
          color: white;
          margin-top: .2rem;
        }
      }

      .user_login_info_top {
        @include sc(.7rem,#fff);
        font-weight: 700;
      }
    }

    img{
      @include wh(.8rem,.8rem);

    }
  }
  .user_money_coupons {
    display: flex;
    background-color: white;
    padding: .4rem 0;

  }
  .user_money_coupons_item {
    flex-basis: 33.33%;
    display: flex;
    flex-direction: column;
    padding:.3rem 0;
    border-left: 1px #e4e4e4 solid;
    section{
      text-align: center;
      padding-bottom: .2rem;

     span{
       @include sc(1rem,#999);
       font-weight: 700;
     }
      .user_money_coupons_des_item {
        font-size: .5rem;
      }
    }
    span{
      @include sc(.6rem,#666);
      text-align: center;
    }

  }
  .user_one_section_ul {
    margin-top: .4rem;
    background-color: white;
  }
  .user_section_item {
    display: flex;
    align-items: center;
    img{
      @include wh(.8rem,.8rem);
      padding: 0 .4rem;
    }
    .user_section_item_right {
      display: flex;
      justify-content: space-between;
      flex: 1;
      align-items: center;
      padding:.6rem 0;
      span{
        @include sc(.5rem,#666);
      }
      border-bottom: 1px #e4e4e4 solid;

    }
  }


</style>
