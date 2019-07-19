<template>
    <div>
        <el-row>
            <el-header height="200px">
                <el-carousel trigger="click" height="200px" width="105%">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3 class="small">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </el-header>
        </el-row>
        <el-divider></el-divider>
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
            if(this.$store.state.productBrand !== "*")
                return this.$store.state.products.filter(item => item.brandName === this.$store.state.productBrand);
            else
                return this.$store.state.products
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
