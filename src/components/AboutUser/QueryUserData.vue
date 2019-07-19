<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <h3>用户信息</h3>
        </div>
        <div v-for="(val,key,index) in getUserInfo" :key="index" class="text item">
            <el-card>
                <div>
                    <h4>{{key}} : {{val}}</h4>
                </div>
            </el-card>
        </div>
    </el-card>
</template>


<script>
export default {
    computed:{
        getUserInfo(){
            return {
                username:this.$store.state.user.username,
                name:this.$store.state.user.name,
                email:this.$store.state.user.email,
                address:this.$store.state.user.address,
                telephone:this.$store.state.user.telephone,
                idcard:this.$store.state.user.idcard,
            }
        },
    }
}
</script>
<style scoped>
   h4{
       margin:0;
   } 

  .text {
    font-size: 18px;
  }

  .item {
    margin-bottom: 20px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {   
    width: 80%;
    margin: auto;
  }

  .el-card{
      line-height: 30px;
  }
</style>