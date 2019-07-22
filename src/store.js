import APIs from './utils/api';
import axios from 'axios';
import AdminAPI from './utils/AdminAPI';


const store = {
    state: {//获取store中的值
      user:{
          uid:"",
          username:"guest",
          password:"",
          userType:"user",
          email:"",
          address:"",
          telephone:"",
          name:"",
          idcard:"",
          isLogin:false,
          cart:[],
          cartTemp:[],
          orders:[],
          orderTemp:[]
      },
      AllOrders:[],
      AllUserInfo:[],
      AllUsers:[],
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
      modifyTextCondition (state,newCondition) {
        state.textInputCondition = newCondition;
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
        state.user.userType = Innerdata.data.userType;
        if(Innerdata.data.msg === "LoginSuccess"){
          state.user.username = Innerdata.newUser.username;
          state.user.password = Innerdata.newUser.password;
          if(state.user.userType === "admin"){
            state.routerName = "adminPage";
          }else{
            state.routerName = Innerdata.data.router;
          }
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

      updateUserInfo(state,res){//更新用户信息
        console.log('update UserInfo success');
        console.log(res);
        //state.routerName = 'modifyData';
        state.user.email = res.data[1].email;
        state.user.telephone = res.data[1].telephone;
        state.user.name = res.data[1].name;
        state.user.address = res.data[1].address;
        state.user.idcard = res.data[1].idcard;
      },


      modifyUserInfo(state,InnerData){
        console.log("InnerData");
        console.log(InnerData);
        state.routerName = InnerData;
      },
      modifyPwd(state,res){
        if(res.data[0].msg === "ModifySuccess"){
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
          username:"guest",
          password:"",
          userType:"user",
          email:"",
          address:"",
          telephone:"",
          name:"",
          idcard:"",
          isLogin:false,
          cart:[],
          cartTemp:[],
          orders:[],
          orderTemp:[]
        }},
        state.AllOrders=[],
        state.AllUserInfo=[],
        state.AllUsers=[],
        state.productBrand="*";
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
      },
      RemoveCartItemFromList(state,Itemid){
        state.user.cart = state.user.cart.filter(item => item.productId !== Itemid);
        console.log("update local success");
        console.log(state.user.cart);
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
      },

      getOrdersList(state,res){
        state.user.orders  = res.data;
        console.log('after update local orders success in store');
        console.log(state);
      },

      getOrderItem(state,orderItemProducts){
        state.user.orderTemp = [];
        state.user.orderTemp = orderItemProducts;
        state.routerName = 'orderinfo';
        console.log("update local orderItemTemp success");
      },

      /**For admin */
      getOrdersListForAdmin(state,res){
       // AllOrders:[],
        state.AllOrders  = res.data;
        console.log('after update admin local orders success in store');
        console.log(state.AllOrders);
      },

      getAllUsersByAdmin(state,res){
        state.AllUsers  = res.data;
        console.log('after update admin local Users success in store');
        console.log(state.AllUsers);
      },
      
      getAllUserInfoByAdmin(state,res){
        state.AllUserInfo = res.data;
        console.log('after update admin local UserInfo success in store');
        console.log(state.AllUserInfo);
      },

      // ChangeLocalProductUrl(state,UrlidSet){
      //   state.products = state.products.map((item) => {
      //     if(item.id === UrlidSet.id){
      //       item.url = UrlidSet.url;
      //     }
      //   });
      //   console.log('after update admin local UserInfo success in store');
      //   console.log(state.products);
      // }
      
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
        modifyTextCondition(context,newTextCondition){
          context.commit('modifyTextCondition',newTextCondition);
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
                // context.dispatch('updateUserInfo'); //登陆后更新本地用户信息
                // console.log("after update user info in login");
                // console.log(context.state);           
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

        updateUserInfo(context){
          axios.post(APIs.getUserInfoApi,{
            username:context.state.user.username,
          }).
          then(function(response){
              console.log("gup update receive sucessful");
              console.log(response);
              context.commit('updateUserInfo',response)
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
          axios.post(APIs.ModifyUserInfo,newInfo).
          then((response) => {
            console.log("receive successfully")
            console.log(response);
            if(response.data.msg === 'ModifySuccess'){
              console.log("modifyInfo suceess");
              context.commit('modifyUserInfo','QueryUserData')
            }
          }).
          catch(function(error){
            console.log("modifyInfo fail");
            console.log(error);
          })
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
            }
          }).catch(error => {
            console.log('add fail');
            console.log(error);
          })
        },

        SetCartTemp(context,newTemp){
          //context.dispatch('setUserInfo');
          axios.post(APIs.getUserInfoApi,{
            username:context.state.user.username,
          }).
          then(function(response){
              console.log("gup update receive sucessful");
              console.log(response);
              context.commit('updateUserInfo',response);
              context.commit('SetCartTemp',newTemp);
          }).
          catch(function(error){
              console.log("gup can't connnect")
              console.log(error);
          })

        },

        RemoveCartItemFromList(context,Itemid){//从购物车中移除某一项
          axios.post(APIs.removeCartItem,{
            productId:Itemid
          }).
          then((response) => {
            console.log("connect success!");
            console.log(response);
            console.log('update local cart after remove someone item in cart');//移除后更新购物车
            context.dispatch('getCartList');
          }).
          catch((error) => {
            console.log('connect fail');
            console.log(error);
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
          axios.post(APIs.genOrder,payload.order).
          then((response) => {
            console.log(response);
            if(response.data.msg === 'success'){
              context.commit('OrderGen',response.data);
              context.dispatch('getCartList');//生成订单后，update local cart
              context.dispatch('getOrdersList');//生成订单后，update local orders
            }
          }).
          catch((error) => {
            console.log("connect fail");
            console.log(error);
          })
        },

        getOrdersList(context){//获取所有订单
          axios.get(APIs.getUserOrders).
          then((response) => {
            console.log('update loacl orders list success');
            console.log(response);
            context.commit('getOrdersList',response);
          }).
          catch((error) => {
            console.log("connect fail");
            console.log(error);
          })
        },

        getOrderItem(context,ordertempId){//获取单个订单
          console.log("orderid will be sent");
          console.log({
            orderId:ordertempId
          })

          axios.post(APIs.getOrderItemProducts,{
            orderId:ordertempId
          }).
          then((response) => {
            console.log('get success');
            console.log(response);
            context.commit('getOrderItem',response.data);
          }).
          catch((error) => {
            console.log('get fail');
            console.log(error);
          })
        },

        setOrderPay(context,ordertempId){//支付
          axios.post(APIs.payForOrder,{
            orderId:ordertempId
          }).
          then((response) => {
            console.log('get success');
            console.log(response);
            if(response.data.msg === 'success'){
              console.log('pay success');
              context.dispatch('getOrdersList');//支付完刷新本地订单总览
            }else{
              console.log('pay fail');
            }
          }).
          catch((error) => {
            console.log('pay connect fail');
            console.log(error);
          })
        },

              /**For admin */
        setOrderPostByAdmin(context,ordertempId){//admin 设置发货
          axios.post(AdminAPI.setOrderPost,{
            orderId:ordertempId
          }).
          then((response) => {
            console.log('Admin connect success');
            console.log(response);
            if(response.data.msg === 'success'){
              console.log('Admin set Post success');
              context.dispatch('getAllOrdersForAdmin');//支付完刷新本地AllOrders总览
            }else{
              console.log('Admin set Post success');
            }
          }).
          catch((error) => {
            console.log('Admin connect fail');
            console.log(error);
          })
        },

        getAllOrdersForAdmin(context){
          axios.get(AdminAPI.getAllOrders).
          then((response) => {
            console.log("connect success");
            console.log('update loacl admin Allorders list success');
            console.log(response);
            context.commit('getOrdersListForAdmin',response);
          }).
          catch((error) => {
            console.log("connect fail");
            console.log(error);
          })
        },

        getAllUsersByAdmin(context){
          axios.get(AdminAPI.getAllUsers).
          then((response) => {
            console.log("connect success");
            console.log('update loacl admin AllUsers list success');
            console.log(response);
            context.commit('getAllUsersByAdmin',response);
          }).
          catch((error) => {
            console.log("connect fail");
            console.log(error);
          })
        },

        getAllUserInfoByAdmin(context){
          axios.get(AdminAPI.getAllUserInfo).
          then((response) => {
            console.log("connect success");
            console.log('update loacl admin AllUserInfo list success');
            console.log(response);
            context.commit('getAllUserInfoByAdmin',response);
          }).
          catch((error) => {
            console.log("connect fail");
            console.log(error);
          })
        },

        ChangeProducts(context,Productitem){
          axios.post(AdminAPI.changeProducts,Productitem).
          then((response) => {
            console.log("connect succss");
            if(response.data.msg === "changeSuccess"){
              console.log("change success")
              context.dispatch('getAllProductListByAdmin');
            }else{
              console.log("change fail")
            }
          }).
          catch((error) => {
            console.log("connect fail");
            console.log(error);
          })
        },

        getAllProductListByAdmin(context){
          axios.get(AdminAPI.getAllProductsByAdmin).
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
          
        ResetUserPwd(context,userTempName){
          axios.post(AdminAPI.resetUserPwd,{
            username:userTempName
          }).
          then((response) => {
            console.log("connect succss");
            if(response.data.msg === "success"){
              console.log("reset success");
            }else{
              console.log("change fail");
            }
          }).
          catch((error) => {
            console.log("connect fail");
            console.log(error);
          })
        },

        addNewProduct(context,newProdutct){
          axios.post(AdminAPI.addNewProduct,newProdutct).
          then((response) => {
            console.log("connect succss");
            if(response.data.msg === "success"){
              console.log("add success");
            }else{
              console.log("add fail");
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