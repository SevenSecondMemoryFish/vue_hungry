<template>
    <section class="cart_module">
      <section class="car_button">
        <transition name="showReduce">
          <img class="buy_car_button" @click="removeOutCart" v-if="buyNum" src="../assets/reduction.png"/>
        </transition>
        <transition name="fade">
          <span class="buy_number" v-if="buyNum" >{{buyNum}}</span>
        </transition>
        <img class="buy_car_button" @click="addToCart" src="../assets/add.png"/>
      </section>
    </section>
</template>

<script>
export default {
  name: "buyCar",
  data(){
    return {
      number:_.get(this.food,"buyNum",0)
    }
  },
  computed:{
    buyNum:function () {
      return this.number;
    }
  },
  props:["food"],
  methods:{
    removeOutCart(){
      if (this.number > 0){
        this.number = this.number -1
      }
      this.$emit("removeshopcar",this.food._id,this.number)
    },
    addToCart(){
      this.number = this.number+1;
      this.$emit("addshopcar",this.food._id,this.number);
    },
    changeNumber(number){
      this.number = number;
    }
  }

}
</script>

<style lang="scss" scoped>

  @import '../style/mixin.scss';

  .car_button {

    display: flex;
    align-items: center;


  }
  .buy_car_button {
    @include wh(.9rem,.9rem);
  }
  .buy_number {
    font-weight: bold;
    min-width: 1.2rem;
    text-align: center;
    @include sc(0.7rem,#666);
  }
  .showReduce-enter-active, .showReduce-leave-active {
    transition: all .3s ease-out;
  }
  .showReduce-enter, .showReduce-leave-active {
    opacity: 0;
    transform: translateX(1rem);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

</style>
