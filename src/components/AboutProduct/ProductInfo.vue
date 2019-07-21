<template>
    <el-container>
        <el-header>
            <el-page-header @back="goBack" content="详情页面">
            </el-page-header>
        </el-header>
        <el-main>
            <el-row>
                <el-col :span="8">
                    <img :src="'upload/' + getProduct.url" 
                    class="image" style="height:200px;margin:auto;">
                </el-col>
                <el-col :span="12" style="line-height:30px;">
                    <span>品牌型号：{{getProduct.brandName}}-{{getProduct.name}}</span>
                    <el-divider></el-divider>
                    <span>价格：${{getProduct.price}}</span>
                </el-col>
                <el-col :span="4">
                     <el-button icon="el-icon-plus" :disabled="!isLogin" @click="addToCartList()">加入购物车</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <p>{{getProduct.description}}</p>
                </el-col>
            </el-row>
        </el-main>
    </el-container>

</template>

<script>
export default {
  data() {
      return {
          id:this.$route.params.id
      }
  },
  methods:{
      goBack(){
          this.$router.push('/');
      },
        addToCartList(){
        console.log('Id：' + this.product.id)
        this.$store.dispatch('addToCartList',{...this.product,count:1});
    },
  },
  computed:{
      getProduct(){
        console.log("this id is " + this.id)
        for(let i=0;i<this.$store.state.products.length;i++){
            if(this.$store.state.products[i].id === this.id){
                console.log(this.$store.state.products[i])
                return this.$store.state.products[i];
            }
        }  
      },
     isLogin(){
        return this.$store.state.user.isLogin;
      }
  }
}
</script>

<style scoped>

</style>
