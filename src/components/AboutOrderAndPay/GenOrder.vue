<template>
    <div>
        <ul>
            <li v-for="(item, index) in CartTempList" :key="index">
                {{item}}
            </li>
        </ul>        
    </div>
</template>

<script>
export default {
    computed:{
        CartTempList(){
            return this.$store.state.user.cartTemp;
        }
    },
}
</script>

<style scoped>

</style>