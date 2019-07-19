<template>
    <div>
        <el-container style="line-height:200px;">
              <el-header height="200px">
                <el-carousel trigger="click" height="200px" width="105%">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3 class="small">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
              </el-header>
              <el-main>
                  <CartItem v-for="(item,i) in getCartList" :key="i" 
                  :CartItem="item" @add="AddToCartTemp(item)" @remove="RemoveFromCartTemp(item)"></CartItem>
              </el-main>
              <el-footer>
                  <router-link :to="{name:'GenOrder'}"
                  @click.native="GenOrder()" 
                  style="float:right">
                    生成订单
                  </router-link>
              </el-footer>
        </el-container>
    </div>
</template>

<script>
import CartItem from './Cart_Item';


export default {
    data() {
        return {
            cartTemp:[]
        }
    },
    components:{
        CartItem
    },
    methods:{
        AddToCartTemp(CartItem){
            console.log('add');
            this.cartTemp.push(CartItem);
            console.log(this.cartTemp);
        },
        RemoveFromCartTemp(CartItem){
            console.log('remove');
            this.cartTemp = this.cartTemp.filter(item => {
                return item.id !== CartItem.id;
            });
            console.log(this.cartTemp);
        },
        GenOrder(){
            this.$store.dispatch('SetCartTemp',this.cartTemp);
            console.log("gen success");
        }
    },
    computed:{
        getCartList(){
            return {
                ...this.$store.state.user.cart,
            };
        }
    }
}
</script>

<style scoped>
    .el-header{
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 0;
        padding:0;
        overflow: hidden;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    .el-carousel{
        margin-right: -15px
    }

     .el-carousel__item{
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        margin: 1px;
        padding: -5px;       
    }
    
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>