<template>
    <div class="alert_container" v-if="showAlert">
     <section class="tip_text_container">
       <span v-if="title" class="alert_title"><strong>{{title}}</strong></span>
       <img class="tip_image" v-if="errorIcon" src="../images/error.png"/>
       <img class="tip_image" v-if="successfulIcon" src="../images/successful.png"/>
       <span class="tip_message" v-if="message">{{message}}</span>
       <span class="tip_line"></span>
       <div class="tip_base_action">
         <span class="tip_action cancle" v-if="showCancle" @click="closeAlert">取消</span>
         <span class="tip_vertical_line"></span>
         <span class="tip_action successful" :class="{no_cancel:!showCancle}" v-if="showConfirm" @click="okAction">确认</span>
       </div>
     </section>
    </div>
</template>

<script>
export default {
    name: "alertTip",
  data(){
      return{
        showAlert:false
      }
  },
  props:['title','message','successfulIcon','errorIcon','showConfirm','showCancle'],
  methods:{
    closeAlert(){
      this.showAlert = false;
    },
    okAction(){
      this.closeAlert();
      this.$emit('confirmAction')
    },
    showTip(){
      this.showAlert = true;
    }
  },

}
</script>

<style lang="scss" scoped>

  @import "../style/mixin";
  @keyframes tipMove {
    0%   { transform: scale(1) }
    35%  { transform: scale(.8) }
    70%  { transform: scale(1.1) }
    100% { transform: scale(1) }
  }
  .alet_container {
   position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background-color: red;
  }
  .tip_text_container {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -6rem;
    margin-left: -6rem;
    width: 12rem;
    animation: tipMove .4s;
    background-color: #ffffff;
    border: 1px;
    padding-top: .6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 0.25rem;

  }
  .alert_title {
    font-size: 1rem;
  }
  .tip_image {
    @include wh(2rem,2rem);
  }
  .tip_message {
    padding:0.5rem 1rem 0;
    text-align: center;
    font-size: 0.8rem;
  }
  .tip_line {
    margin-top: 0.5rem;
    background-color: #f1f1f1;
    @include wh(100%,1px);
  }
  .tip_base_action {
    display: flex;
    text-align: center;
    line-height: 2.5rem;
    @include wh(100%,2.5rem);
    .tip_action{
      @include wh(6rem,100%);
      font-size: 0.7rem;
    }
    .cancle{
      color: #444;
    }
    .successful {
      color: $blue;
    }
    .no_cancel{
      @include wh(12rem,2.5rem);
    }
    .tip_vertical_line{
      @include wh(1px,100%);
      background-color:#f1f1f1; ;
    }
  }
</style>
