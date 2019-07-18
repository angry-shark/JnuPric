<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="6">
                    <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" 
                    class="image" style="height:150px;float:left;"> -->
                      <el-image
                        style="width: 140px; height: 140px"
                        :src="url"
                        :fit="fit"></el-image>
            </el-col>
            <el-col :span="12">
                <h4>{{CartItem.brandName}} {{CartItem.productName}}</h4>
                <p>{{CartItem.description}}</p>
            </el-col>
            <el-col :span="6" style="line-height:148px;">
                <div style="text-align:center;">
                    <span>
                        购买数量:
                    </span>
                    <span>
                        <el-button icon="el-icon-minus"></el-button>
                        <span>{{CartItem.count}}</span>
                        <el-button icon="el-icon-plus"></el-button>
                    </span>
                </div>
            </el-col>
        </el-row>
        <el-divider></el-divider>
    </div>
 
</template>

<script>
export default {
    props:['CartItem'],
    data() {
        return {
            url:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        }
    },
}
</script>

<style scoped>
    span{
        font-size: 24px;
    }

    .el-row{
        line-height: 30px;
    }

    .el-col{
        height: 33%;
    }
</style>