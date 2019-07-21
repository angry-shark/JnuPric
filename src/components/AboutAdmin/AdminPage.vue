<template>
    <div>
        <el-tabs v-model="activeName" style="line-height:50px;">
            <el-tab-pane label="用户管理" name="first">
                <el-container>
                    <el-main>
                        <ManagerUser></ManagerUser> 
                    </el-main>
                </el-container>
            </el-tab-pane>
            <el-tab-pane label="订单管理" name="second">
                <el-container>
                    <el-main>
                        <ManagerOrders></ManagerOrders> 
                    </el-main>
                </el-container>
            </el-tab-pane>
            <el-tab-pane label="货物管理" name="third">
                <el-container>
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
        this.$store.dispatch('getAllProductListByAdminl')//获取属于Admin 的local All products
        console.log("After admin update state");
        console.log(this.$store.state);
    },
    components:{
        ManagerUser,
        ManagerOrders,
        ManagerProduct
    },
    methods: {

    }
}
</script>


<style scoped>
    .el-main{
        width:90%
    }
</style>
