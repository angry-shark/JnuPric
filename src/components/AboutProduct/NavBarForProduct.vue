<template>
    <div>
        <nav>
            <ul>
                <li>
                    <el-button @click="transferCondition('联想')">联想</el-button>
                </li>
                <li>
                    <el-button @click="transferCondition('apple')">apple</el-button>
                </li>
                <li>
                    <el-button @click="transferCondition('魅族')">魅族L</el-button>
                </li>
                <li>
                    <el-button @click="transferCondition('戴尔')">戴尔</el-button>
                </li>
                <li>
                    <el-button @click="transferCondition('荣耀')">荣耀</el-button>
                </li>
                <li>
                    <el-button @click="transferCondition('*')">ALLBrand</el-button>
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
    },
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
