<template>
    <div>
        <h1>UserInfo</h1>
        <h4 v-for="(val,key,i) in getUser" :key="i">
            {{key}} is {{val}}
        </h4>
        <br>
    </div>
</template>


<script>
export default {
    computed:{
        getUser(){
            return this.$store.state.user
        }
    }
}
</script>
<style scoped>
br{
    margin:0;
    padding:0;
}
</style>