import Login from './components/Login.vue';
import Default from './components/default.vue';

const routes = [
    {
        path:"/",
        name:"default",
        component: Default
    },
    {
        path: '/LoginPage',
        name: 'login',
        component: Login
    },
    {
        path:'/index',
        redirect: "/"
    }
]

export default routes;
