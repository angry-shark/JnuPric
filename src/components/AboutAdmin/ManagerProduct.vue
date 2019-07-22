<template>
    <div>
        <el-row style="line-height:1px;">
            <el-col :span="24">
                <el-input v-model="inputFlag" placeholder="请输入型号搜索" style="width:80%;margin:auto;">
                </el-input>
            </el-col>
        </el-row>
        <el-divider style="margin: 10px;"></el-divider>
        <el-row style="line-height:1px;">
            <el-col :span="24"><el-form :inline="true" :model="egProduct" class="demo-form-inline">
                <el-form-item label="商品名称">
                    <el-input v-model="egProduct.name" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="图片路径">
                    <el-input v-model="egProduct.url" placeholder="图片路径"></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input v-model="egProduct.description" placeholder="商品描述"></el-input>
                </el-form-item>
                <el-button @click="addNewProduct()">
                    新增商品    
                </el-button>
            </el-col>
        </el-row>
        <el-row style="width:98%">
            <el-col :span="3">
                <h4>上架状态</h4>
            </el-col>
            <el-col :span="3">
                <h4>商品id</h4>
            </el-col>
            <el-col :span="3">
                <h4>商品名称</h4>
            </el-col>
            <el-col :span="3">
                <h4>商品单价</h4>
            </el-col>
            <el-col :span="3">
                <h4>商品类型</h4>
            </el-col>
            <el-col :span="3">
                <h4>商品库存</h4>
            </el-col>
            <el-col :span="3">
                <h4>图片路径</h4>
            </el-col>
            <el-col :span="3">
                <el-button @click="updateProductList()" style="margin:30px 0;">
                    更新商品列表    
                </el-button>
            </el-col>
        </el-row>  
        <el-table
        :data="AllProducts"
        style="width: 100%;overflow:scroll;height:1500px;">
        <el-table-column>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">
                        <el-checkbox v-model="scope.row.active"></el-checkbox>
                    </span>
                </template>
        </el-table-column>
        <el-table-column>
             <template slot-scope="scope">
                <span style="margin-left: 10px">
                    <el-input v-model="scope.row.id" type="number" disabled="true"></el-input>
                </span>
            </template>
        </el-table-column>
        <el-table-column>
            <template slot-scope="scope">
                <span style="margin-left: 10px">
                    <el-input v-model="scope.row.name"></el-input>
                </span>
            </template>
        </el-table-column>
        <el-table-column>
            <template slot-scope="scope">
                <span style="margin-left: 10px">
                    <el-input v-model="scope.row.price" type="number"></el-input>
                </span>
            </template>
        </el-table-column>
        <el-table-column>
            <template slot-scope="scope">
                <span style="margin-left: 10px">
                    <el-select v-model="scope.row.typeId" placeholder="类型">
                        <el-option label="手机" :value="1"></el-option>
                        <el-option label="电脑" :value="2"></el-option>
                    </el-select>
                </span>
            </template>
        </el-table-column>
        <el-table-column>
            <template slot-scope="scope">
                <span style="margin-left: 10px">
                    <el-input v-model="scope.row.stock" type="number"></el-input>
                </span>
            </template>
        </el-table-column>
        <el-table-column>
            <template slot-scope="scope">
                <span style="margin-left: 10px">
                    <el-input v-model="scope.row.url"></el-input>
                </span>
            </template>
        </el-table-column>
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
            FormVisible: false,
            ItemTemp:{},
            inputFlag:"",
            egProduct:{
                active:false,
                brandId:1,
                description:"",
                url:"",
                typeId:1,
                stock:0,
                sold:0,
                price:0,
                name:"NewProduct"
            }
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
        updateProductList(){
            this.$store.dispatch('getAllProductListByAdmin');
            setTimeout(() => {
                console.log('after update local product');
                this.AllProducts = this.$store.state.products;
                console.log(this.AllProducts);
            },500);
        },
        addNewProduct(){
            console.log(this.egProduct);
            this.$store.dispatch('addNewProduct',this.egProduct);
        }
    },
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
