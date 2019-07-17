<template>
    <div>
        <el-card>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="Username" label-position="right">
                    <el-input v-model="form.username" size="small"></el-input>
                </el-form-item>
                <el-form-item label="Password" label-position="right">
                    <el-input v-model="form.password" size="small" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Login</el-button>
                </el-form-item>
            </el-form>
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
         this.$store.dispatch('setUser',this.form)
         if(!this.isLoginSuceessfully){
             console.log("login fail in Vue")
             //若登录未成功
             this.form =  {
                username:"",
                password:""
            }
            console.log(this.$store.state.loginMsg);
            // this.$alert(this.$store.state.loginMsg, 'Warning!', {
            //     confirmButtonText: '确定',
            //     callback: action => {}
            // });           
         }else{
             console.log('login suceess in vue')
            this.$emit("loginSuccess");
            this.$router.push({name:this.routerName});
         }
     
      },
    },
    computed:{
        routerName() { 
            return this.$store.state.routerName;
        },
        isLoginSuceessfully(){
            return this.$store.state.user.isLogin;
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
