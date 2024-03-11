import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const welcome = r => require.ensure([], () => r(require('@/page/welcome')), 'welcome');
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');

const routes = [
    {
        path:'/',
        component:welcome,
    },
    {
        path:'/login',
        component:login,
    },
    {
        path:'/register',
        component:register,
    }
]

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})