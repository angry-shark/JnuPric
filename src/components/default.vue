<template>
    <div  style="line-height:70px;">
        <el-row>
            <el-col :span="24">
                <el-input v-model="input" placeholder="请输入型号搜索" style="width:80%;margin:auto;">
                </el-input>
            </el-col>
        </el-row>
        <el-divider style="margin:5px 0;"></el-divider>
        <el-row :gutter="10">
            <el-col :span="4" v-for="(product,i) in ProductList" :key="i">
                <ProductCard :product="product" @leaveDefaultPage="handleleaveMarket()"></ProductCard>
            </el-col>
        </el-row>
 
    </div>
</template>

<script>
import ProductCard from './AboutProduct/ProductCard';
export default {
    data() {
        return {
            input:""
        }
    },
    created(){
        console.log('init');
        this.$store.dispatch("getAllProductList");
    },
    components:{
        ProductCard
    },
    computed:{
        ProductList(){
            let result = this.$store.state.products;
            if(this.$store.state.productBrand !== "*"){
                result = this.$store.state.products.filter(item => item.brandName === this.$store.state.productBrand);
            }
            if(this.input !== ""){
                result = result.filter(item => (item.name.toLowerCase().includes(this.input.toLowerCase())
                ||item.brandName.toLowerCase().includes(this.input.toLowerCase())));
            }
            return result;
        },
    },
    methods:{
        handleleaveMarket(){
            this.emit('leaveMarket');
        }
    }
}
</script>

<style scoped>
    .el-col{
        margin-top: 5px;
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

    .el-header{
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 0;
        padding:0;
        overflow: hidden;
    }
</style>
