<template>
    <div>
        <el-table
        :data="AllProducts"
        style="width: 100%">
        <el-table-column
            label="上架状态">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">
                        <el-checkbox v-model="scope.row.active">{{scope.row.active? "下架":"上架"}}</el-checkbox>
                    </span>
                </template>
        </el-table-column>
        <el-table-column
            prop="id"
            label="商品Id">
        </el-table-column>
        <el-table-column
            prop="name"
            label="名称">
        </el-table-column>
        <el-table-column
            prop="price"
            label="单价">
        </el-table-column>
        <el-table-column
            label="库存">
            <template slot-scope="scope">
                <span style="margin-left: 10px">
                    <el-input v-model="scope.row.stock" type="number"></el-input>
                </span>
            </template>
        </el-table-column>
        <!-- <el-table-column>
            <template slot-scope="scope">
            <el-button type="text" @click="changeDialogFormVisible(true,scope.row)">开始上传</el-button>
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">                 
                <el-upload
                class="avatar-uploader"
                action="/static/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-error="afterUploadFail">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-button type="text" @click="changeDialogFormVisible(false,ItemTemp)">关闭</el-button>
            </el-dialog>
            </template>
        </el-table-column> -->
        <el-table-column>
            <template slot-scope="scope">
                <el-button @click="submitUpdateProducts(scope.row)">更新</el-button>
            </template>
        </el-table-column>
        </el-table>
    </div>

</template>

<script>
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            AllProducts: this.$store.state.products,
            dialogFormVisible: false,
            ItemTemp:{},
            imageUrl: ''
        }
    },
    methods:{
        submitUpdateProducts(Item){
            console.log(Item);
            this.$store.dispatch('ChangeProducts',Item);
            setTimeout(() => {
                console.log('after update local product');
                this.AllProducts = this.$store.state.products;
                console.log(this.AllProducts);
            },500);
        },
    }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
