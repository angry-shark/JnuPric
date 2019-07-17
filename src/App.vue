<template>
  <div id="app">
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  created(){
    axios.get('/getLoginUser').
    then((response)=>{
      console.log('init get successfully');
      console.log(response);
      this.$store.dispatch('CheckLoginUser',response.data.username);
    }).
    catch(function(error){
      console.log('init get error');
      console.log(error);
    });
    //   if (sessionStorage.getItem("store")) {
    //     console.log('has sessionStorage')
    //     this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))));
    //     sessionStorage.removeItem("store");
    //   } 

    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener("beforeunload",()=>{
    //     sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    // })

    /*页面刷新时重定向 */
    // window.addEventListener("beforeunload",()=>{
    //     this.$router.push("/index")
    // })
  }
}
</script>

<style scoped>

</style>

