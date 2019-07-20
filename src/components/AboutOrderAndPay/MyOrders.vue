<template>
     <el-table
      :data="MyOrder"
      style="width: 100%">
      <el-table-column
        label="支付状态">
            <template slot-scope="scope">
                <span style="margin-left: 10px">
                    {{ scope.row.payStatus? "已支付":"未支付"}}
                </span>
            </template>
      </el-table-column>
      <el-table-column
        prop="orderId"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="总价">
      </el-table-column>
      <el-table-column
        label="发货状态">
          <template slot-scope="scope">
              <span style="margin-left: 10px">
                  {{ scope.row.postStatus? "已发货":"未发货"}}
              </span>
          </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
            <el-button 
            :type="scope.row.payStatus?'primary':'info'"
            @click="getOrderProducts(scope.row.orderId)">
                查看详情
            </el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    computed:{
        MyOrder(){
            return this.$store.state.user.orders;
        }
    },
    methods:{
        getOrderProducts(itemid){
          console.log("get item id");
          console.log(itemid);
          this.$store.dispatch('getOrderItem',itemid);
          setTimeout(()=>{
            this.$router.push({name:this.$store.state.routerName});
          },500); 
        }
    }
}
</script>

<style scoped>

</style>