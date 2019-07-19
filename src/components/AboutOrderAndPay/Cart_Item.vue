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
            <el-col :span="6">
                <h4>{{CartItem.brandName}} {{CartItem.productName}}</h4>
                <p>{{CartItem.description}}</p>
                <p>{{CartItem.price}}</p>
            </el-col>
            <el-col :span="6" style="line-height:148px;">
                <div style="text-align:center;">
                    <span>
                        购买数量:
                    </span>
                    <span>
                        <el-input-number v-model="count" 
                        :min="1" :max="ProductItem.stock"
                        label="描述文字"></el-input-number>
                    </span>
                </div>
            </el-col>
            <el-col :span="4">
                <p>{{SingleTotalPrice}}</p>
            </el-col>
            <el-col :span="2">
                <el-button @click="removeItem()">移除此项</el-button>
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
        },
        // print(){
        //     console.log('ProductItem');
        //     console.log(this.ProductItem);
        // },
        removeItem(){
            //todo
        }
    },
    computed:{
        ProductItem(){
            return this.$store.state.products.filter(item => item.id === this.CartItem.id)
        },
        SingleTotalPrice(){
            return this.CartItem.count * this.CartItem.price;
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