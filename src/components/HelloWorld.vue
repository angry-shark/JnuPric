<template>
  <div class="hello">
    <el-container>
      <el-header>
        <div style="display:inline-block;float:left">
          <router-link @click.native="handleChangePage(true)" to="/index">Home</router-link>
          <span v-if="username != ''" style="margin:20px;">Hello {{username}}</span>
        </div>

        <div style="display:inline-block;float:right">
          <ul>
            <li>
              <span>
                  <router-link @click.native="handleChangePage(false)" to="/LoginPage">login</router-link>
              </span>
            </li>
            <li>
              <span>
                register
              </span>
            </li>
          </ul>
        </div>
      </el-header>

      <el-container style="height: 480px; border: 1px solid #eee">
        <transition name="el-fade-in-linear">
          <el-aside width="200px" v-show="inMarket">
            Aside         
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
        this.username = newusername;
        this.inMarket = true;
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
    line-height: 200px;
  }
</style>
