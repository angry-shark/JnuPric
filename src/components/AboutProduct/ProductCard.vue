<template>
    <el-card :body-style="{ padding: '0px',height:'250px', padding:'0'}">
        <div style="height:60%;width:100%">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" 
            class="image" style="height:100%;float:left;width:100%">
        </div>
      <div>
          <router-link :to="{name:'productInfo',params:{id:product.id}}">
            <p>{{product.brandName}} {{product.name}} : {{product.price}}</p>
          </router-link>
      </div>
    </el-card>
</template>

<script>
export default {
    props:["product"],
    methods:{

    }
}
</script>

<style scoped>
    p{
        margin:0;
    }

   .bottom {
        margin-top: 13px;
        line-height: 12px;
   }

   .el-card{
       line-height: 50px;
   }
</style>
