<template>
    <el-table
      :data="AllUsersAndInfo"
      style="width: 100%">
      <el-table-column
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
    </el-table>
</template>

<script>
export default {
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
            return AllUsersAndInfo;
        }
    }
}
</script>

<style scoped>

</style>
