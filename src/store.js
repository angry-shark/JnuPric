const store = {
    state: {//获取store中的值
      user:{
          uid:"",
          username:"",
          password:"",
          email:"",
          isLogin:false,
          cart:[],
          order:[]
      },
      products:[
          {
            productId:"",
            productName:"",
            productPrice:0
          },
          {
            productId:"",
            productName:"",
            productPrice:0
          }
      ]
    },
    mutations: {//状态变更 eg:store.commit('increment')
      increment (state) {
        state.count++
      },
      setUser (state,newUser) {
        // sessionStorage.setItem("username", newUser);  //将user添加到sessionStorage

        state.user.username = newUser.username
        state.user.password = newUser.password
        //login
        state.user.isLogin = true;
      },
      logout(state){
        state.user.username = ""
        state.user.password = ""
        //login
        state.user.isLogin = false;

        // sessionStorage.removeItem("username");  //登出前移除sessionStorage  
      }
    },
    actions: {
        /*Action 类似于 mutation，不同在于：
        Action 提交的是 mutation，而不是直接变更状态。
        Action 可以包含任意异步操作。*/
        //Action 通过 store.dispatch 方法触发：
        // 以对象形式分发
        /*store.dispatch({
            type: 'incrementAsync',
            amount: 10
          })*/
        increment (context) {
          context.commit('increment')
        },
        setUser (context,newUser) {
          context.commit('setUser',newUser);
 
        },
        logout(context){
          context.commit('logout');
        }
      }
  }

export default store