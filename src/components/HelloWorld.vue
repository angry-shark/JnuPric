<template>
  <div class="hello">
    <el-container>
      <el-header>
        <div style="display:inline-block;float:left">
          <router-link @click.native="handleChangePage(true)" to="/index">Home</router-link>
          <span v-if="isLogin" style="margin:20px;">Hello {{username}}</span>
        </div>

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
                  <form action="/logout" method="GET" v-show="isLogin">
                    <input type="submit" value="logout" @click="LogoutUser()">
                  </form>
              </span>
            </li>
            <li>
              <span>
                <!-- 前往注册界面 -->
                <router-link 
                  @click.native="handleChangePage(false)" 
                  to="/RegisterPage">
                    Register
                  </router-link>
              </span>
            </li>
          </ul>
        </div>
      </el-header>

      <el-container style="height: 480px; border: 1px solid #eee">
        <transition name="el-fade-in-linear">
          <el-aside width="200px" v-show="inMarket">
            <el-button 
            type="parmary" 
            class="el-icon-d-arrow-left" 
            @click="handleChangePage(!inMarket)"
            style="float:right;width:100%">
            </el-button>
            <nav>
              <ul>
                <li>a</li>
                <li>a</li>
                <li>a</li>
                <li>a</li>
              </ul>
            </nav>       
          </el-aside>
        </transition>

        <transition name="el-fade-in-linear">
          <el-aside width="55px" v-show="!inMarket" class="closeBar">
            <el-button type="parmary" class="el-icon-d-arrow-right" @click="handleChangePage(!inMarket)">
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
export default {
  name: 'HelloWorld',
  data() {
    return {
      inMarket: true,
      isLogin:false,
      username:""
    }
  },
  components:{

  },
  methods: {
    handleChangePage(isinMarket){
      console.log("change Page!");
      this.inMarket = isinMarket;
    },

    setUser(newusername){
      if(newusername != ""){
        this.isLogin = true;
        this.username = newusername;
        this.inMarket = true;
      }
    },

    LogoutUser(){
      if(this.isLogin){
        this.isLogin = false;
        console.log("before clear " + this.username)
        this.username = "";
        localStorage.removeItem("username");
        console.log("after clear " + this.username)
      }else{
        this.isLogin = false;
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul{
    list-style-type: none;
    margin:0;
    padding:0;
  }

  li{
    margin: 0;
    padding: 0;
    display: inline-block;
    margin-right: 25px;
  }

  nav>ul>li{
    width:100%;
    margin: 0;
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
    text-align: center;
    line-height: 160px;
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
    }
</style>
