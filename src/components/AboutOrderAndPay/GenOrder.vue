<template>
    <div>
        <el-table
            :data="CartTempList"
            style="width: 100%">
            <el-table-column
                label="品牌">
                 <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.brandId }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="productName"
                label="名称">
            </el-table-column>
            <el-table-column
                label="价格小计">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.count * scope.row.price }}</span>
                    </template>
            </el-table-column>
        </el-table>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="邮寄人姓名">
                    <el-input v-model="formInline.name" placeholder="邮寄人姓名"></el-input>
                </el-form-item>
                <el-form-item label="邮寄地址">
                    <el-input v-model="formInline.address" placeholder="邮寄地址"></el-input>
                </el-form-item>
                <el-form-item label="电话号码">
                    <el-input v-model="formInline.telephone" placeholder="电话号码">
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="ConfirmOrder()">确认订单</el-button>
                </el-form-item>
            </el-form> 
        </el-card>      
    </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            formInline:{
                name:this.$store.state.user.name,
                address:this.$store.state.user.address,
                telephone:this.$store.state.user.telephone
            }
        }
    },
    methods:{
        ConfirmOrder(){
            this.$store.dispatch('OrderGen',{order:[this.formInline, ...CartTempList]});
            setTimeout(() => {
                if(this.$store.state.routerName === 'myOrders'){
                    this.$router.push({name:this.$store.state.routerName});
                }else{
                    this.$router.push({name:this.$store.state.routerName});
                    console.log("generate order fail");
                }
            },500)
        }
    },
    computed:{
        CartTempList(){
            return this.$store.state.user.cartTemp;
        }
    },
}
</script>

<style scoped>
    .el-card{
        padding:20px;
    }
</style>