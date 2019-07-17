<template>
    <div>
        <h1>UserInfo</h1>
        <ul>
            <li v-for="(val,key,i) in getUserInfo" :key="i">
                {{key}} is {{val}}
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    computed:{
        getUserInfo(){
            return {
                username:this.$store.state.user.username,
                name:this.$store.state.user.name,
                email:this.$store.state.user.email,
                address:this.$store.state.user.address,
                telephone:this.$store.state.user.telephone,
                idcard:this.$store.state.user.idcard,
            }
        },
    }
}
</script>
<style scoped>
    ul{
    list-style-type: none;
    display: inline-block;
    margin:0;
    padding:0;
  }

  li{
    margin: 0;
    padding: 0;
    display: inline-block;
    margin-right: 5px;
    height: 100%;
    width:100%;
  }
</style>