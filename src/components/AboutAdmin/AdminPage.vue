<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">
                <el-container>
                    <el-header>用户管理</el-header>
                    <el-main>
                        <ManagerUser></ManagerUser> 
                    </el-main>
                </el-container>
            </el-tab-pane>
            <el-tab-pane label="订单管理" name="second">
                <el-container>
                    <el-header>订单管理</el-header>
                    <el-main>
                        <ManagerOrders></ManagerOrders> 
                    </el-main>
                </el-container>
            </el-tab-pane>
            <el-tab-pane label="货物管理" name="third">
                <el-container>
                    <el-header>货物管理</el-header>
                    <el-main>
                        <ManagerProduct></ManagerProduct> 
                    </el-main>
                </el-container>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
import ManagerUser from './ManagerUser';
import ManagerOrders from './ManagerOrders';
import ManagerProduct from './ManagerProduct';

export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    created(){
        this.$store.dispatch('getAllOrdersForAdmin');//获取admin local All Orders
        this.$store.dispatch('getAllUsersByAdmin');//获取admin local All Users
        this.$store.dispatch('getAllUserInfoByAdmin')//获取admin local All Users
    },
    components:{
        ManagerUser,
        ManagerOrders,
        ManagerProduct
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>


<style scoped>

</style>
