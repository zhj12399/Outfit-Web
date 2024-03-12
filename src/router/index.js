import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const welcome = r => require.ensure([], () => r(require('@/page/welcome')), 'welcome');
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const outfit_list = r => require.ensure([], () => r(require('@/page/outfit_list')), 'outfit_list');
const add_outfit = r => require.ensure([], () => r(require('@/page/add_outfit')), 'add_outfit');

const routes = [
    {
        path: '/',
        component: welcome,
    },
    {
        path: '/login',
        component: login,
        meta: ['登录'],
    },
    {
        path: '/register',
        component: register,
    },
    {
        path: '/manage',
        component: manage,
        children: [{
            path: '',
            component: home,
        }, {
            path: '/outfit_list',
            component: outfit_list,
        }, {
            path: '/add_outfit',
            component: add_outfit,
        }],

    }
]

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})