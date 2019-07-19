<template>
  <div class="hello">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="5">
                <div style="display:inline-block;float:left">
                  <router-link to="/index">主页</router-link>
                  <span v-if="isLogin" style="margin:20px;margin-left:50px;">
                    Hello {{getUser.username}}
                  </span>
              </div>
          </el-col>
           <el-col :span="5">
              <div style="display:inline-block;float:left;margin-left:">
                <img src="../assets/logo.png" width="20%">
            </div>
          </el-col>
          <el-col :span="5">
              <div style="display:inline-block;float:left;margin-left:25px;">
                欢迎来到在线手机电脑商城！
            </div>
          </el-col>
          <el-col :span="9">
              <div style="display:inline-block;float:right">
                <ul>
                  <li>
                    <span>
                        <!-- 前往登陆页面 -->
                        <router-link 
                        v-show="!isLogin"
                        @click.native="handleChangePage(false)" 
                        to="/LoginPage">
                          登陆账号
                        </router-link>

                        <!-- 登出 -->
                        <el-dropdown v-show="isLogin" style="text-align:center">
                          <span class="el-dropdown-link">
                            我的账户<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>
                                <router-link :to="{name:'QueryUserData',params:{username:getUser.username}}" 
                                @click.native="getUserInfoForVuex()">
                                  个人信息
                                </router-link>
                              </el-dropdown-item>
                              <br>
                              <el-dropdown-item>
                                <router-link to="/ModifyPage">修改资料</router-link>
                              </el-dropdown-item>
                              <br>
                              <el-dropdown-item>
                                <router-link to="/ModifyPassWord" 
                                @click.native="handleChangePage(false)">
                                  修改密码
                                </router-link>
                              </el-dropdown-item>
                              <br>
                              <el-dropdown-item>
                                <button style="background:rgba(51, 51, 51, 0);
                                border:0;text-align:left;padding:0;width:100%;" 
                                @click="LogoutUser()">
                                  登出账户
                                </button>
                              </el-dropdown-item>
                            </el-dropdown-menu>
                    </el-dropdown>
                  </span>
                  </li>
                  <li>
                    <span>
                      <router-link v-show="isLogin" to="/MyCart"
                       @click.native="getCartList()">
                          我的购物车
                       </router-link>
                      <router-link v-show="isLogin" to="/MyOrders" 
                      @click.native="getCartList()">
                          我的订单
                      </router-link>
                    </span>

                    <span>
                      <!-- 前往注册界面 -->
                      <router-link 
                        @click.native="handleChangePage(false)" 
                        to="/RegisterPage"
                        v-show="!isLogin"
                        >
                          注册账号
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
            @click="handleChangePage(false)"
            style="float:right;width:100%;margin-bottom:45px;background:#D3DCE6;font-size:35px;">
            </el-button>

            <NavPanel></NavPanel> 
          </el-aside>
        </transition>

        <transition name="el-fade-in-linear">
          <el-aside width="50px" v-show="!inMarket" class="closeBar">
            <el-button type="parmary" class="el-icon-s-unfold"
            style="font-size:20px;float:left;height:100%;"
            :disabled="this.$route.name !== 'default'" 
            @click="handleChangePage(true)">
            </el-button>
          </el-aside>
        </transition>  

        <el-main>
          <!-- <router-view @loginSuccess="setUser" @></router-view> -->
          <router-view @leaveMarket="handleChangePage(false)"></router-view>
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
    },
  },
  methods: {
    handleChangePage(isinMarket){
      console.log("change Page!");
      this.inMarket = isinMarket;
    },
    // setUser(){
    //   if(this.getUser.username != ""){
    //     console.log("not empty")
    //   }
    //   this.inMarket = true;
    // },
    getUserInfoForVuex(){
      this.handleChangePage(false);
      console.log("get before")
      this.$store.dispatch('setUserInfo');
      console.log("get after the vuex state")
      console.log(this.$store.state);
    },
    LogoutUser(){
      this.$store.dispatch('logout');
      this.$router.push('/index');
    },
    getCartList(){
      this.handleChangePage(false);
      this.$store.dispatch('getCartList');
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{ 
    /* 隐藏全局的x轴滚动条 */
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

  span>a{
    margin-right:30px;
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
