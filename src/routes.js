import Default from './components/default.vue';

import Login from './components/AboutUser/Login.vue';
import Register from './components/AboutUser/register.vue';
import ModifyPage from './components/AboutUser/ModifyUserData.vue'
import ModifyPassWord from './components/AboutUser/ModifyPassWord.vue'
import QueryData from './components/AboutUser/QueryUserData.vue';

import ProductInfo from './components/AboutProduct/ProductInfo.vue';

import MyCart from './components/AboutOrderAndPay/MyCart.vue'
import PayForCart from './components/AboutOrderAndPay/PayForCart.vue'
import MyOrder from './components/AboutOrderAndPay/MyOrder.vue'
import GenOrder from './components/AboutOrderAndPay/GenOrder.vue'


const routes = [
    //product page
    {
        path:'/',
        name:'default',
        component: Default
    },
    {
        path:'/product',
        name:'productInfo',
        component: ProductInfo,
    },
    {
        path:'/MyCart',
        name:'mycart',
        component:MyCart
    },
    //order and cart page
    {
        path:'/MyOrder',
        name:'myorder',
        component:MyOrder
    },
    {
        path:'/PayForCart',
        name:'payforcart',
        component:PayForCart
    },
    {
        path:'/MyOrder',
        name:'myorder',
        component:MyOrder
    },
    {
        path:'/GenOrder',
        name:'genorder',
        component:GenOrder
    },
    //user page
    {
        path: '/LoginPage',
        name: 'login',
        component: Login,
    },
    {
        path:'/RegisterPage',
        name:'register',
        component:Register
    },
    {
        path:"/ModifyPassWord",
        name:'modifyPassWord',
        component: ModifyPassWord
    },
    {
        path:"/QueryDataPage/:username",
        name:'QueryUserData',
        component:QueryData
    },
    {
        path:"/ModifyPage",
        name:'modifyData',
        component:ModifyPage
    },
    {
        path:'/index',
        redirect: "/"
    },
    {
        path:'/404',
        redirect: '/'
    }
]

export default routes;
