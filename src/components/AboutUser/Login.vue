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
                username:"",
                password:""
            }
        }
    },
    methods: {
      onSubmit() {
         console.log('submit!');
         this.$store.dispatch('setUser',this.form)
         this.$emit("loginSuccess");
         this.$router.push("/index");

      },
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
