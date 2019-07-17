<template>
    <div>
        <nav>
            <ul>
                <li>
                    <button @click="transferCondition('联想')">联想</button>
                </li>
                <li>
                    <button @click="transferCondition('ASUS')">ASUS</button>
                </li>
                <li>
                    <button @click="transferCondition('DELL')">DELL</button>
                </li>
                <li>
                    <button @click="transferCondition('HUAWEI')">HUAWEI</button>
                </li>
                <li>
                    <button @click="transferCondition('XIAOMI')">XIAOMI</button>
                </li>
                <li>
                    <button @click="transferCondition('*')">ALLBrandI</button>
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
</style>
