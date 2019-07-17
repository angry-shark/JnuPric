<template>
  <div class="hello">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="5">
                <div style="display:inline-block;float:left">
                  <router-link @click.native="handleChangePage(true)" to="/index">Home</router-link>
                  <span v-if="isLogin" style="margin:20px;">Hello {{getUser.username}}</span>
              </div>
          </el-col>
           <el-col :span="8">
              <div style="display:inline-block;float:left;margin-left:">
                <img src="../assets/logo.png" width="20%">
            </div>
          </el-col>
          <el-col :span="6">
              <div style="display:inline-block;float:left;margin-left:">
                aaa
            </div>
          </el-col>
          <el-col :span="5">
              <div style="display:inline-block;float:right">
                <ul>
                  <li>
                    <span>
                        <!-- 前往登陆页面 -->
                        <router-link 
                        v-show="!isLogin"
                        @click.native="handleChangePage(false)" 
                        to="/LoginPage">
                          login
                        </router-link>

                        <!-- 登出 -->
                        <el-dropdown v-show="isLogin" style="text-align:center">
                          <span class="el-dropdown-link">
                            我的账户<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>
                                <router-link :to="{name:'QueryUserData',params:{username:getUser.username}}" @click.native="getUserInfoForVuex()">
                                  个人信息
                                </router-link>
                              </el-dropdown-item>
                              <br>
                              <el-dropdown-item>
                                <router-link to="/ModifyPage">修改资料</router-link>
                              </el-dropdown-item>
                              <br>
                              <el-dropdown-item>
                                <router-link to="/ModifyPassWord">修改密码</router-link>
                              </el-dropdown-item>
                              <br>
                                <el-dropdown-item>
                                  <router-link to="/MyCart">购物车</router-link>
                                </el-dropdown-item>
                              <br>
                              <el-dropdown-item>
                                <button style="background:rgba(51, 51, 51, 0);border:0;text-align:left;padding:0;width:100%;" 
                                @click="LogoutUser()">
                                  登出账户
                                </button>
                                  <!-- <form action="/logout" method="GET" v-show="isLogin">
                                    <input type="submit" value="退出账户" @click="LogoutUser()">
                                  </form> -->
                              </el-dropdown-item>
                            </el-dropdown-menu>
                    </el-dropdown>
                  </span>
                  </li>
                  <li>
                    <span>
                      <!-- 前往注册界面 -->
                      <router-link 
                        @click.native="handleChangePage(false)" 
                        to="/RegisterPage"
                        >
                          Register
                        </router-link>
                    </span>
                  </li>
                </ul>
              </div>
          </el-col>
        </el-row>
      </el-header>

      <el-container style="height: 100vh; border: 1px solid #eee">
        <transition name="el-fade-in-linear">
          <el-aside width="200px" v-show="inMarket">
            <el-button 
            type="parmary" 
            class="el-icon-s-fold"
            @click="handleChangePage(!inMarket)"
            style="float:right;width:100%;margin-bottom:45px;background:#D3DCE6;font-size:35px;">
            </el-button>

            <NavPanel></NavPanel> 
          </el-aside>
        </transition>

        <transition name="el-fade-in-linear">
          <el-aside width="50px" v-show="!inMarket" class="closeBar">
            <el-button type="parmary" class="el-icon-s-unfold"
            style="font-size:20px;float:left;height:100%;" 
            @click="handleChangePage(!inMarket)">
            </el-button>
          </el-aside>
        </transition>  

        <el-main>
          <router-view @loginSuccess="setUser"></router-view>
        </el-main>
      </el-container>


      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import NavPanel from './AboutProduct/NavBarForProduct'
export default {
  name: 'HelloWorld',
  data() {
    return {
      inMarket: true,
//      isLogin:false,
    }
  },
  components:{
    NavPanel
  },
  computed:{
    getUser(){
      return this.$store.state.user;
    },
    isLogin(){
      return this.getUser.isLogin;
    },
    brand(){
      return this.$store.state.productBrand;
    }
  },
  methods: {
    handleChangePage(isinMarket){
      console.log("change Page!");
      this.inMarket = isinMarket;
    },
    setUser(){
      if(this.getUser.username != ""){
        console.log("not empty")
      }
      this.inMarket = true;
    },
    getUserInfoForVuex(){
      console.log("get before")
      this.$store.dispatch('getUserInfo');
      console.log("get after the vuex state")
      console.log(this.$store.state);
    },
    LogoutUser(){
      this.$store.dispatch('logout');
    },
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    overflow-x: hidden;
  }

  ul{
    list-style-type: none;
    margin:0;
    padding:0;
  }

  li{
    margin: 0;
    padding: 0;
    display: inline-block;
    margin-right: 20px;
    height: 100%;
    text-align: center;
  }

  nav>ul>li{
    width:100%;
    margin: 0;
  }

  .router-link-active {
    text-decoration: none;
    
  }

  a{
    text-decoration: none;
    text-align: center;
    margin: auto;
    width: 100%;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
    padding:5px;
    text-align: center;
    line-height: 160px;
    margin-right: -25px;
  }

   .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 20px;
  }

  .closeBar{
    background-color: #E9EEF3;
    color: #333;
    line-height: 300px;
    overflow: hidden;
    margin-right: -40px;
  }
  
  .el-dropdown-menu{
    background: #B3C0D1;
  } 

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
