<template>
    <div>
        <el-container style="line-height:200px;">
            <el-header>
                <h2>我的购物车</h2>    
            </el-header>            
            <el-main>
                <CartItem v-for="(item,i) in getCartList" :key="i" 
                :CartItem="item" @add="AddToCartTemp(item)" @remove="RemoveFromCartTemp(item)"></CartItem>
            </el-main>
            <el-footer style="line-height:10px;">
                <el-button type="primary" 
                @click="GenOrder()"
                :disabled="cartTemp.length === 0">
                    生成新订单
                </el-button>
                <el-button type="primary" 
                @click="goBackAndResetTempList()">
                    返回购物车
                </el-button>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import CartItem from './Cart_Item';
import { setTimeout } from 'timers';


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
        goBackAndResetTempList(){
            this.cartTemp = [];
            this.$router.push('/');
        },
        GenOrder(){
            this.$store.dispatch('SetCartTemp',this.cartTemp);
            console.log("gen success");
            setTimeout(()=>{
                this.$router.push(this.$store.state.routerName);
            },500);
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

    .el-button{
        margin: 0px;
        margin-right: 35px;
        margin-top: 10px
    }

</style>