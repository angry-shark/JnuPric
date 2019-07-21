<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="1">
                <el-checkbox  v-model="checked"></el-checkbox>
            </el-col>
            <el-col :span="5">
                <el-image
                style="width: 140px; height: 140px"
                :src="'upload/' + CartItem.url"
                :fit="fit"></el-image>
            </el-col>
            <el-col :span="5">
                <h4>{{CartItem.brandName}} {{CartItem.productName}}</h4>
                <p>{{CartItem.description}}</p>
                <p>{{CartItem.price}}</p>
            </el-col>
            <el-col :span="5" style="line-height:181px;">
                <div style="text-align:center;">
                    <span>
                        购买数量:
                    </span>
                    <span>
                        <el-button @click="ReduceCount">-</el-button>
                        <span>  {{ItemCount}}  </span>
                        <el-button @click="AddCount">+</el-button>
                    </span>
                </div>
            </el-col>
            <el-col :span="4" style="line-height:151px;">
                <p>小计 $ {{SingleTotalPrice}}</p>
            </el-col>
            <el-col :span="4" style="line-height:181px;">
                <el-button @click="removeItem(CartItem.productId)">移除此项</el-button>
            </el-col>
        </el-row>
        <el-divider></el-divider>
    </div>
 
</template>

<script>
import { setTimeout } from 'timers';
export default {
    props:['CartItem'],
    data() {
        return {
            checked:false,
        }
    },
    methods:{
        AddCount(){
            this.ChangeCount(1);
        },
        ReduceCount(){
            this.ChangeCount(-1);
        },
        ChangeCount(deltaVal){
            console.log("In Vue Change count");
            this.$store.dispatch('ChangeCartItemCount',{
                productId:this.CartItem.productId,
                count:deltaVal
            });
        },
        removeItem(itemId){
            this.$store.dispatch('RemoveCartItemFromList',itemId);
        }
    },
    computed:{
        ProductItem(){
            return this.$store.state.products.filter(item => item.id === this.CartItem.id)
        },
        SingleTotalPrice(){
            return this.CartItem.count * this.CartItem.price;
        },
        ItemCount(){
            return this.CartItem.count;
        }
    },
    watch:{
        checked(newVal,oldVal){
            if(newVal){//be select will run this
                console.log(this.CartItem.productId + ' be select ' + this.checked);
                this.$emit("add");
            }else{//cancel select will run this
                console.log(this.CartItem.productId + ' be unselect ' + this.checked);
                this.$emit("remove");
            }
        }
    }
}
</script>

<style scoped>
    span{
        font-size: 24px;
    }

    .el-row{
        line-height: 30px;
    }

    .el-col{
        height: 33%;
    }
</style>