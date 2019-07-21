<template>
    <el-container>
        <el-main style="line-height:50px">
            <h4 style="float:left">订单号：{{OrderInfo[0].orderId}}</h4>
            <el-table
            :data="OrderInfo"
            style="width: 100%">
                <el-table-column
                    prop="productName"
                    label="名称">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="单价">
                </el-table-column>
                <el-table-column
                    prop="count"
                    label="数量">
                </el-table-column>
                <el-table-column
                    label="价格小计">
                    <template slot-scope="scope">
                            <span style="margin-left: 10px"> $ {{ scope.row.count * scope.row.price }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <span>总价： $ {{TotalPrice}}</span>
        </el-main>
        <el-footer style="line-height:10px;">
            <el-button type="primary" 
            @click="Pay()"
            v-show="!OrderInfo[0].payStatus">
                支付
            </el-button>
            <el-button type="primary" 
            @click="goBack()">
                返回
            </el-button>
        </el-footer>
    </el-container>

</template>

<script>
import { setTimeout } from 'timers';
export default {
    computed:{
        OrderInfo(){
            return this.$store.state.user.orderTemp;
        },
        TotalPrice(){
            let result = 0;
            for(let i = 0;i<this.OrderInfo.length;i++){
                result += this.OrderInfo[i].price * this.OrderInfo[i].count;
            }
            return result;
        },
    },
    methods:{
        Pay(){
            this.$store.dispatch('setOrderPay',this.OrderInfo[0].orderId);
            setTimeout(() => {
                this.$router.push({name:'myOrders'});
            },500);
        },
        goBack(){
            this.$router.push({name:'myOrders'});
        }
    }
}
</script>

<style scoped>

</style>
