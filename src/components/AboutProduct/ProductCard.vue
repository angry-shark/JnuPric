<template>
    <el-card :body-style="{ padding: '0px',height:'400px', padding:'0'}" shadow="hover">
        <div style="height:220px;width:220px;">
            <img :src="'upload/' + product.url"
            class="image" style="height:100%;float:left;">
        </div>
      <div>
          <router-link :to="{name:'productInfo',params:{id:product.id}}" 
          @click.native="leaveProductListPage()">
            <p>{{product.brandName}} {{product.name}}</p>
            <p>售价： ${{product.price}}</p>
          </router-link>
          <el-button icon="el-icon-plus" :disabled="!isLogin" @click="addToCartList()">加入购物车</el-button>
      </div>
    </el-card>
</template>

<script>
export default {
    props:["product"],
    methods:{
        addToCartList(){
            console.log('Id：' + this.product.id)
            this.$store.dispatch('addToCartList',{...this.product,count:1});
        },
        leaveProductListPage(){
            this.$emit('leaveDefaultPage');
        }
    },
    computed:{
        isLogin(){
            return this.$store.state.user.isLogin;
        }
    }
}
</script>

<style scoped>
    p{
        margin:0;
        width:100%;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }

   .bottom {
        margin-top: 13px;
        line-height: 12px;
   }

   .el-card{
       line-height: 50px;
   }
</style>
