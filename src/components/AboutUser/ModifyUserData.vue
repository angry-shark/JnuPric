<template>
    <div>
        <el-card>
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="姓名" label-position="right">
                    <el-input v-model="form.name" size="small" type="text"></el-input>
                </el-form-item>
                <el-form-item label="电子邮件" label-position="right">
                    <el-input v-model="form.email" size="small" type="text"></el-input>
                </el-form-item>
                <el-form-item label="通信地址" label-position="right">
                    <el-input v-model="form.address" size="small" type="text"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" 
                            label-position="right" 
                            type="number"
                            prop="telephone"
                            :rules="[
                            { required: true, message: '号码不能为空'},
                            { type: 'number', message: '号码必须为数字值'},
                            ]">
                    <el-input type="age" v-model.number="form.telephone" 
                    size="small" maxlength="11" minlength="11" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="身份证号" 
                            label-position="right" 
                            type="number"
                            prop="idcard"
                            :rules="[
                            { required: true, message: '号码不能为空'},
                            { type: 'number', message: '号码必须为数字值'},
                            ]">
                    <el-input type="age" v-model.number="form.idcard" 
                    size="small" maxlength="11" minlength="11" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="UpdateUserInfo()">Confirm</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>


<script>
export default {
    data(){
        return {
            //userInfo:this.getUserInfo
            // form:{
            //     email:this.getUserInfo.email,
            //     address:this.getUserInfo.address,
            //     telephone:this.getUserInfo.telephone,
            // }

            form:{}
        }
    },
    created(){
        console.log('state userInfo');
        console.log(this.$store.state.user);
        this.form = {...this.$store.state.user};
        console.log('data is');
        console.log(this.form);
    },
    methods:{
        UpdateUserInfo(){
            //todo
            console.log("userInfo");
            console.log(this.form);
        }
    },
    // computed:{
    //     getUserInfo(){
    //         return {
    //             username:this.$store.state.user.username,
    //             name:this.$store.state.user.name,
    //             email:this.$store.state.user.email,
    //             address:this.$store.state.user.address,
    //             telephone:this.$store.state.user.telephone,
    //             idcard:this.$store.state.user.idcard,
    //         }
    //     },
    // }
}
</script>

<style scoped>
    .el-card{
        width:75%;
        margin: auto;
        margin-top: 80px;
    }    

    .el-form .el-form-item .el-input{
        width:60%;
    }
</style>
