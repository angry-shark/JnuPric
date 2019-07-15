import Login from './components/AboutUser/Login.vue';
import Default from './components/default.vue';
import Register from './components/AboutUser/register.vue';
import ModifyPage from './components/AboutUser/ModifyUserData.vue'
import ModifyPassWord from './components/AboutUser/ModifyPassWord.vue'
import QueryData from './components/AboutUser/QueryUserData.vue';

const routes = [
    {
        path:'/',
        name:'default',
        component: Default
    },
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
    }
]

export default routes;
