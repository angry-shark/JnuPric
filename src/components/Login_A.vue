<template>
    <div>
        <!-- <form action="/login" method="POST">
            Username: <input type="text" name="username">
            Password:<input type="password" name="password">
            <input type="submit" value="login">
        </form> -->
        <el-card>
            <!-- <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="Username">
                    <el-input v-model="form.username" size="small"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="form.password" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">login</el-button>
                </el-form-item>
            </el-form> -->
            <form action="/login" method="POST">
                <div>
                    username:
                    <input type="text" name="username" v-model="form.username" >
                    <br>
                    password:
                    <input type="password" name="password">
                    <br>
                    <input type="submit" value="login" class="el-button--primary">
                </div>
            </form>
        </el-card>
 
    </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
            username:"",
            password:""
        }
      }
    },
    methods: {
      onSubmit() {
         console.log('submit!');
         //console.log(this.form.username + "p: " + this.form.password)

        /**若向服务器post成功，则调用**/
        // this.$emit("loginSuccess",this.form.username);
        // this.$router.push({name:"default", params:{
        //     InMarket: true
        //   }});

          
         this.axios.post('#/login',{
             username:this.form.username,
             password:this.form.password
         }).
         then(function(response){
             console.log(response);
        //      this.$router.push({name:"default", params:{
        //     InMarket: true
        //   }}); 
         }).
         catch(function(error){
             console.log(error);
         })

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

    /* .el-form .el-form-item .el-input{
        width:60%;
    } */

    form{
        width:60%;
    }

    input[type="text"] input[type="password"]{
        width:60%;
        line-height: 25px;
    }

    input[type="submit"]{
        width: 30%;
    }
</style>
