<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="4" v-for="(product,i) in ProductList" :key="i">
                <ProductCard :product="product"></ProductCard>
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
    }
}
</script>

<style scoped>
    .el-col{
        margin-top: 5px;
    }
</style>
