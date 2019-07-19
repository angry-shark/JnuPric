<template>
    <el-container>
        <el-header>
            <el-page-header @back="goBack" content="详情页面">
            </el-page-header>
        </el-header>
        <el-main>
            <el-row>
                <el-col :span="8">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" 
                    class="image" style="height:200px;margin:auto;">
                </el-col>
                <el-col :span="16" style="line-height:30px;">
                    <span>品牌型号：{{getProduct.brandName}}-{{getProduct.name}}</span>
                    <el-divider></el-divider>
                    <span>价格：${{getProduct.price}}</span>
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
      }
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
      }
  }
}
</script>

<style scoped>

</style>
