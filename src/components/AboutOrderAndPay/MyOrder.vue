<template>
    <div>
        MyOrders
    </div>
</template>

<script>
export default {
    computed:{
        MyOrder(){
            return this.$store.state.user.order;
        }
    }
}
</script>

<style scoped>

</style>