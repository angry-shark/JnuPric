<template>
    <div>
        <el-card>
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="OldPassWord" label-position="right">
                    <el-input v-model="form.oldpassword" size="small" type="password"></el-input>
                </el-form-item>
                <el-form-item label="NewPassword" label-position="right">
                    <el-input v-model="form.newpassword1" size="small" type="password"></el-input>
                </el-form-item>
                <el-form-item label="NewPassword" label-position="right">
                    <el-input v-model="form.newpassword2" size="small" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">修改密码</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>


<script>
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            form: {
                oldpassword:"",
                newpassword1:"",
                newpassword2:""
            },
            pass: -1,
            checkpass: -1
        }
    },
    methods:{
        onSubmit(){
                if((this.form.newpassword1 != this.form.newpassword2)){
                    this.form = {
                        oldpassword:"",
                        newpassword1:"",
                        newpassword2:""
                    };
                    this.$alert('新密码不一致', 'Warning!', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    });
                }else if(this.form.oldpassword === this.form.newpassword1 || 
                this.form.oldpassword === this.form.newpassword2){
                    this.form = {
                        oldpassword:"",
                        newpassword1:"",
                        newpassword2:""
                    };
                    this.$alert('新旧密码重复', 'Warning!', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    });
                }else if(this.form.newpassword1 === '' || this.form.newpassword2 === ''){
                    this.form = {
                        oldpassword:"",
                        newpassword1:"",
                        newpassword2:""
                    };
                    this.$alert('新密码为空', 'Warning!', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    });

                }else{
                    this.$store.dispatch('modifyPwd',this.form.newpassword1)
                    setTimeout(()=>{
                        if(this.$store.state.ModifyPwdMsg === "ModifySuccess"){
                            this.$router.push({name:this.routerName});
                        }else{
                            this.form = {
                            oldpassword:"",
                            newpassword1:"",
                            newpassword2:""
                        }
                        this.$alert('旧密码密码错误', 'Warning!', {
                            confirmButtonText: '确定',
                            callback: action => {}
                        });
                    }},1000)
         
                }
            }
    },
    computed:{
        getUser(){
            return this.$store.state.user;
        },
        routerName(){
            return this.$store.state.routerName;
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