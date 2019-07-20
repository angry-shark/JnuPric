<template>
    <el-table
      :data="AllOrders"
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
            type="danger"
            :disabled="!scope.row.payStatus"
            @click="setPostStatus(scope.row.orderId)">
                发货
            </el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
    computed:{
        AllOrders(){
            return this.$store.state.AllOrders;
        },
    },
    methods:{
        setPostStatus(itemId){
            this.$store.dispatch('setOrderPostByAdmin',itemId);
            console.log('after set post by admin')
            console.log(this.$store.state.AllOrders)
        }
    }
}
</script>

<style scoped>

</style>
