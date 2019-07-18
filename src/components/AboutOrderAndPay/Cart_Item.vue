<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="6">
                    <el-checkbox  v-model="checked"></el-checkbox>
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
                        <el-button icon="el-icon-minus" @click="ReduceCount"></el-button>
                        <span>{{count}}</span>
                        <el-button icon="el-icon-plus" @click="AddCount"></el-button>
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
            url:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            checked:false,
            count:this.CartItem.count
        }
    },
    methods:{
        AddCount(){
            this.count++;
        },
        ReduceCount(){
            this.count--;
        }
    },
    watch:{
        checked(newVal,oldVal){
            if(newVal){//be select will run this
                console.log(this.CartItem.id + ' be select ' + this.checked);
                this.$emit("add");
            }else{//cancel select will run this
                console.log(this.CartItem.id + ' be unselect ' + this.checked);
                this.$emit("remove");
            }
        },
        count(newVal,oldVal){
            console.log('old value ' + oldVal);
            console.log('new value ' + newVal);
            console.log('final val ' + this.count);
        }
    }
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