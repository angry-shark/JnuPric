<template>
    <el-table
      :data="AllUsersAndInfo"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column>
            <template slot-scope="scope">
                <el-button 
                type="danger"
                @click="ResetPwdByAdmin(scope.row.username)">
                    重置密码
                </el-button>
            </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
    methods:{
        ResetPwdByAdmin(userName){
            //todo
            this.$store.dispatch('ResetUserPwd',userName);
        }
    },
    computed:{
        AllUser(){
            return this.$store.state.AllUsers;
        },
        AllUserInfo(){
            return this.$store.state.AllUserInfo;
        },
        AllUsersAndInfo(){
            let result = [];
            for(let user of this.AllUser){
                for(let userinfo of this.AllUserInfo){
                    if(user.id === userinfo.uid){
                        result.push({...user,...userinfo});
                    }
                }
            }
            console.log(result);
            return result;
        }
    }
}
</script>

<style scoped>

</style>
