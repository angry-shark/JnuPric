<template>
    <div>
        <el-card>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名" label-position="right">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-position="right">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" round @click="Register()">注册</el-button>
                    <el-button type="danger" round>取消</el-button>
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
                username:"",
                password:""
            }
        }
    },
    methods: {
        /**注册 */
        Register() {
         console.log('start register!');

        /**若注册成功则回到登录页 */
        // localStorage.setItem("username",this.form.username); //保存到localStorage中
        // this.$router.push("/LoginPage");


         this.axios.post(API.registerApi,{
             username:this.form.username,
             password:this.form.password
         }).
         then(function(response){
             console.log("receive sucessful");
             console.log(response);
             let routername = response.data.router;
             let msg = response.data.msg;
             console.log(routername + "\n" + msg);
             console.log('register sucessfully')
             this.$router.push({name:routername}); //根据服务器回传的view名进行路由跳转
         }.bind(this)).
         catch(function(error){
             console.log("can't connnect")
             console.log(error);
            //  let routername = error.body.login;
            //  this.$router.push({name:routername}); 
         })

      }
    }
}
</script>

<style scoped>
    .el-card{
        width:500px;
        margin: auto;
        margin-top: 10px;
    }    

    .el-form .el-form-item .el-input{
        width:60%;
    }
</style>