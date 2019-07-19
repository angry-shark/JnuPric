import APIs from './utils/api';
import axios from 'axios';


const store = {
    state: {//获取store中的值
      user:{
          uid:"",
          username:"guest",
          password:"",
          userType:"",
          email:"",
          address:"",
          telephone:"",
          name:"",
          idcard:"",
          isLogin:false,
          cart:[],
          cartTemp:[],
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
      setUser (state,Innerdata) {
        console.log('inner data is ');
        console.log(Innerdata);
        state.loginMsg = Innerdata.data.msg;
        if(Innerdata.data.msg === "LoginSuccess"){
          state.user.username = Innerdata.newUser.username;
          state.user.password = Innerdata.newUser.password;
          state.routerName = Innerdata.data.router;
          state.user.isLogin = true;
        }else{
          state.routerName = 'login';
          state.user.isLogin = false;
        }
      },
      setLoginMsg(state,Msg){
        state.loginMsg = Msg;
      },
      setUserInfo(state,res){
        console.log(res);
        state.routerName = res.data[0].router;
        state.user.email = res.data[1].email;
        state.user.telephone = res.data[1].telephone;
        state.user.name = res.data[1].name;
        state.user.address = res.data[1].address;
        state.user.idcard = res.data[1].idcard;
      },
      modifyUserInfo(state,newInfo){
        console.log(state);
        console.log(newInfo);
      },
      modifyPwd(state,res){
        if(res.data.msg === "ModifySuccess"){
          console.log("modify successfully")
          state.user.password = res.newpwd;

          state.user.address = res.data[1].address;
          state.user.email = res.data[1].email;
          state.user.uid = res.data[1].uid;
          state.user.telephone = res.data[1].telephone;
          state.user.name = res.data[1].name;
          state.user.idcard = res.data[1].idcard;
        }else{
          console.log('ModifyFail');
        }
        state.ModifyPwdMsg = res.data[0].msg;
        console.log("local msg is:" + state.ModifyPwdMsg)
        state.routerName = res.data[0].router;
      },
      logout(state,res){
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
        state.loginMsg = "";
        state.routerName = res.data.router;
      },
      //getAllProduct
      getAllProductList(state,res){
        state.products = res.data;
      },

      getCartList(state,res){
        state.user.cart =  res.data;
      },
      // addToCartList(state,AddCartItem){//when buy something user this
        
      // },
      //about order and cart
      SetCartTemp(state,newTemp){
        state.user.cartTemp = newTemp;
        state.routerName = "genorder";
        //console.log(state.user.cartTemp);
      },
      RemoveCartItemFromList(state,Itemid){

      },
      ChangeCartItemCount(state,Innerdata){
        console.log('inner data');
        console.log(Innerdata);
        for(let i=0;i<state.user.cart.length;i++){
          if(state.user.cart[i].productId === Innerdata.productId){
            state.user.cart[i].count = Innerdata.tempCount;
          }
        }
      },

      OrderGen(state,payload){
        state.routerName = payload.router;
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
              axios.post(APIs.loginApi,{
                username:newUser.username,
                password:newUser.password
            }).
            then(function(response){
                console.log("receive sucessful");
                console.log(response);
              if(response.data.router === "default"){
                console.log("login suceess");      
                context.commit('setUser',{...response,newUser});
              }else{//to do unAccounct etc
                console.log("login fail error username");
                context.commit('setLoginMsg',response.data.msg);
              }
            }).
            catch(function(error){
                console.log("can't connnect")
                console.log(error);
            }) 
        },

        setUserInfo(context){
          axios.post(APIs.getUserInfoApi,{
            username:context.state.user.username,
          }).
          then(function(response){
              console.log("gup receive sucessful");
              console.log(response);
              context.commit('setUserInfo',response)
          }).
          catch(function(error){
              console.log("gup can't connnect")
              console.log(error);
          })
        },

        modifyPwd(context,newpwd){
          axios.post(APIs.ModifyPwdApi,{
            password:context.state.user.password,
            newpassword:newpwd
          }).
          then(function(response){
              console.log("receive successfully")
              console.log(response);
              context.commit('modifyPwd',{...response,newpwd});
            }).
            catch(function(error){
              console.log("modifypwd fail");
              console.log(error);
            })
        },

        modifyUserInfo(context,newInfo){
          context.commit('modifyUserInfo',newInfo);
        },
        logout(context){
          axios.get(APIs.logoutApi).
          then((response) => {
              console.log("logout successfully");
              console.log(response);
              context.commit('logout',response);
              
          }).
          catch(error => {
            console.log('logout fail');
            console.log(error);
          })
        },

        getAllProductList(context){
          axios.get(APIs.getProductList).
          then((response) => {
            console.log("get list successfully");
            console.log(response);
            context.commit('getAllProductList',response);
            console.log(context.state.products);
          }).
          catch(error => {
            console.log("get list fail");
            console.log(error);
          })


        },

        getCartList(context){
          axios.get(APIs.getCartList).
          then(response =>{
            console.log("get Cartlist suceess");
            console.log(response);
            context.commit('getCartList',response);
            console.log("local cart: ");
            console.log(context.state.user.cart);
          }).
          catch(error => {
            console.log("get Cartlist fail");
            console.log(error);
          })


        },

        addToCartList(context,AddCartItem){//when buy something user this
          axios.post(APIs.addToCart,{
            productId:AddCartItem.id,
            count:AddCartItem.count
          }).
          then(response => {
            if(response.data.msg === 'success'){
              console.log("add suceess");
              console.log(response);
              // context.commit('addToCartList',AddCartItem);
              context.dispatch('getCartList');//after buy,update local cart
            }else{
              console.log('add fail');
              console.log(error);
            }
          }).catch(error => {
            console.log('add fail');
            console.log(error);
          })
        },

        SetCartTemp(context,newTemp){
          context.commit('SetCartTemp',newTemp);
        },

        RemoveCartItemFromList(context,Itemid){
          axios.post(APIs.removeCartItem,{
            
          })
        },

        ChangeCartItemCount(context,params){
          axios.post(APIs.ChangeCart,params).
          then((response) => {
            console.log('change count success');
            if(response.data.msg === 'success'){
              context.commit('ChangeCartItemCount',
              {
                productId:params.productId,
                tempCount:response.data.count
              });
            }else{
              console.log('change count fail');
            }
          }).
          catch((error) => {
            console.log('connect fail');
            console.log(error)
          })
        },

        OrderGen(context,payload){
          axios.post(APIs.genOrder,payload).
          then((response) => {
            console(response);
            if(response.data.msg === 'success'){
              context.commit('OrderGen',response.data);
            }
          }).
          catch((error) => {
            console.log("connect fail");
            console.log(error);
          })
        }
      }
  }

export default store