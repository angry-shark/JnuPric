import Login from './components/AboutUser/Login.vue';
import Default from './components/default.vue';
import Register from './components/AboutUser/register.vue';

const routes = [
    {
        path:"/",
        name:"default",
        component: Default
    },
    {
        path: '/LoginPage',
        name: 'login',
        component: Login,
    },
    {
        path:"/RegisterPage",
        name:'register',
        component:Register
    },
    {
        path:'/index',
        redirect: "/"
    }
]

export default routes;
