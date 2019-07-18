import APIs from './utils/api';
import axios from 'axios';

const store = {
    state: {//获取store中的值
      user:{
          uid:"",
          username:"",
          password:"",
          email:"",
          address:"",
          telephone:"",
          name:"",
          idcard:"",
          isLogin:false,
          cart:[],
          order:[],
      },
      products:[],
      productBrand:"*",
      routerName:"",
      ModifyPwdMsg:"",
      loginMsg:""
    },
    mutations: {//状态变更 eg:store.commit('increment')
      modifyBrand (state,newbrand) {
        state.productBrand = newbrand;
      },
      CheckLoginUser(state,newUsername){
        if(newUsername !== 'guest'){
          state.user.username = newUsername;
          state.user.isLogin = true;
        }else{
          state.user.isLogin = false;
        }
      },
      setUser (state,newUser) {
        // sessionStorage.setItem("username", newUser);  //将user添加到sessionStorage
        axios.post(APIs.loginApi,{
             username:newUser.username,
             password:newUser.password
         }).
         then(function(response){
             console.log("receive sucessful");
             console.log(response);

             state.loginMsg = response.data.msg;

            if(response.data.router === "default"){//Successlogin successfully
              console.log("login suceess"); 
              state.user.isLogin = true;
              state.routerName = response.data.router;
              state.user.username = newUser.username
              state.user.password = newUser.password
              //login
              state.user.isLogin = true;
            }else{//to do unAccounct etc
              console.log("login fail")
              state.routerName = "login";
              state.user.isLogin = false;
            }

         }).
         catch(function(error){
             console.log("can't connnect")
             console.log(error);
            //  let routername = error.body.login;
            //  this.$router.push({name:routername}); 
         })
      },
      getUserInfo(state){
        axios.post(APIs.getUserInfoApi,{
          username:state.user.username,
        }).
        then(function(response){
            console.log("gup receive sucessful");
            console.log(response);
            state.routerName = response.data[0].router;
            state.user.email = response.data[1].email;
            state.user.telephone = response.data[1].telephone;
            state.user.name = response.data[1].name;
            state.user.address = response.data[1].address;
            state.user.idcard = response.data[1].idcard;
           // console.log(response.data.userInfo[1].email);
            // console.log('state');
            // console.log(state);
        }).
        catch(function(error){
            console.log(" gupcan't connnect")
            console.log(error);
          //  let routername = error.body.login;
          //  this.$router.push({name:routername}); 
        })
      },
      modifyUserInfo(state,newInfo){
        console.log(state);
        console.log(newInfo);
      },
      modifyPwd(state,newpwd){
          axios.post(APIs.ModifyPwdApi,{
            password:state.user.password,
            newpassword:newpwd
          }).
          then(function(response){
            console.log("receive successfully")
            console.log(response);
            if(response.data.msg === "ModifySuccess"){
              console.log("modify successfully")
              state.user.password = newpwd;

              state.user.address = response.data[1].address;
              state.user.email = response.data[1].email;
              state.user.uid = response.data[1].uid;
              state.user.telephone = response.data[1].telephone;
              state.user.name = response.data[1].name;
              state.user.idcard = response.data[1].idcard;
            }else{
              console.log('ModifyFail');
            }
            state.ModifyPwdMsg = response.data[0].msg;
            console.log("local msg is:" + state.ModifyPwdMsg)
            state.routerName = response.data[0].router;
          }).
          catch(function(error){
            console.log("modifypwd fail");
            console.log(error);
          })   
      },
      logout(state){
        // state.user.username = ""
        // state.user.password = ""
        // //login
        // state.user.isLogin = false;
        axios.get(APIs.logoutApi).
        then((response) => {
            console.log("logout successfully");
            console.log(response);
            state.user = {...{
              uid:"",
              username:"",
              password:"",
              email:"",
              address:"",
              telephone:"",
              name:"",
              idcard:"",
              isLogin:false,
              cart:[],
              order:[],
          }}
          state.routerName = response.data.router
        }).
        catch(error => {
          console.log('logout fail');
          console.log(error);
        })
        // sessionStorage.removeItem("username");  //登出前移除sessionStorage  
      },
      //getAllProduct
      getAllProductList(state){
        axios.get(APIs.getProductList).
        then((response) => {
          console.log("get list successfully");
          console.log(response);
          state.products = response.data[1];
          console.log(state.products);
        }).
        catch(error => {
          console.log("get list fail");
          console.log(error);
        })
      },
      getCartList(state){
        axios.get(APIs.getCartList).
        then(response =>{
          console.log("get Cartlist suceess");
          console.log(response);
          state.user.cart =  response.data[1];
          console.log("local cart: ");
          console.log(state.user.cart);
        }).
        catch(error => {
          console.log("get Cartlist fail");
          console.log(error);
        })
      },
      addToCartList(state,AddCartItem){
        axios.post(APIs.addToCart,{
          productId:AddCartItem.id,
          count:AddCartItem.count
        }).
        then(response => {
          if(response.data.msg === 'success'){
            console.log("add suceess");
            console.log(response);
          }else{
            console.log('add fail');
            console.log(error);
          }
        })
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
        ModifyBrand (context,newbrand) {
          context.commit('modifyBrand',newbrand);
        },
        CheckLoginUser(context,newUsername){
          context.commit('CheckLoginUser',newUsername);
        },
        setUser (context,newUser) {
          context.commit('setUser',newUser);
 
        },
        getUserInfo(context){
          context.commit('getUserInfo');
        },
        modifyPwd(context,newpwd){
          context.commit('modifyPwd',newpwd);
        },
        modifyUserInfo(context,newInfo){
          context.commit('modifyUserInfo',newInfo);
        },
        logout(context){
          context.commit('logout');
        },

        getAllProductList(context){
          context.commit('getAllProductList');
        },
        getCartList(context){
          context.commit('getCartList');
        },
        addToCartList(context,AddCartItem){
          console.log('In Vuex id ' + AddCartItem.id + 'count ' + AddCartItem.count);
          context.commit('addToCartList',AddCartItem);
        }
      }
  }

export default store