<template>
    <div>
        <nav>
            <ul>
                <li>
                    <el-button @click="transferCondition('联想')">联想</el-button>
                </li>
                <li>
                    <el-button @click="transferCondition('ASUS')">ASUS</el-button>
                </li>
                <li>
                    <el-button @click="transferCondition('DELL')">DELL</el-button>
                </li>
                <li>
                    <el-button @click="transferCondition('HUAWEI')">HUAWEI</el-button>
                </li>
                <li>
                    <el-button @click="transferCondition('XIAOMI')">XIAOMI</el-button>
                </li>
                <li>
                    <el-button @click="transferCondition('*')">ALLBrandI</el-button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods:{
        transferCondition(brand){
            this.$store.dispatch('ModifyBrand',brand);
        }
    }
}
</script>

<style scoped>
    ul{
        list-style-type: none;
        margin:0;
        padding:0;
    }

  li{
    margin: 0;
    padding: 0;
    display: inline-block;
    margin-bottom: 25px;
    height: 100%;
    width: 100%;
  }

  .el-button{
      width:100%;
      background: inherit;
  }
</style>
