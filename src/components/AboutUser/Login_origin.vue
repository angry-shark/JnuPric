<template>
    <div>
        <!-- <form action="/login" method="POST">
            Username: <input type="text" name="username">
            Password:<input type="password" name="password">
            <input type="submit" value="login">
        </form> -->
        <el-card>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="Username" label-position="right">
                    <el-input v-model="form.username" size="small"></el-input>
                </el-form-item>
                <el-form-item label="Password" label-position="right">
                    <el-input v-model="form.password" size="small" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">login</el-button>
                </el-form-item>
            </el-form>
        </el-card>
 
    </div>
</template>

<script>
import API from '../../utils/api';

export default {
    data() {
      return {
        form: {
            username:(localStorage.getItem("username") === undefined) ? "":localStorage.getItem("username"),
            password:""
        }
      }
    },
    methods: {
      onSubmit() {
         console.log('submit!');
         //console.log(this.form.username + "p: " + this.form.password)
        // this.$router.push({name:"default", params:{
        //     InMarket: true,
        //     isLogin:true
        //   }});

        /**本地测试用，打包前请注释 */
        this.$emit("loginSuccess",this.form.username);
        this.$router.push("/")

        /**打包前去掉注释 */
        //  this.axios.post('/login',{
        //      username:this.form.username,
        //      password:this.form.password
        //  }).
        //  then(function(response){
        //      console.log("receive sucessful");
        //      console.log(response);
        //      let routername = response.data.router;
        //      let username = response.data.username;
        //      console.log(routername + "\n" + username)
        //     this.$emit("loginSuccess",username);
        //     this.$router.push({name:routername, params:{
        //     InMarket: true
        // }}); 

        //     //to do unAccounct etc
        //  }.bind(this)).
        //  catch(function(error){
        //      console.log("can't connnect")
        //      console.log(error);
        //     //  let routername = error.body.login;
        //     //  this.$router.push({name:routername}); 
        //  })

      }
    }
}
</script>

<style scoped>
    .el-card{
        width:500px;
        margin: auto;
        margin-top: 80px;
    }    

    .el-form .el-form-item .el-input{
        width:60%;
    }
</style>
