import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ("../views/login/login.vue")
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ("../views/register/register.vue")
    },
    {
        path: '/allgoods',
        name: 'allgoods',
        component: () =>
            import ("../views/allgoods/allgoods.vue")
    },
    {
        path: '/around',
        name: 'around',
        component: () =>
            import ("../views/around/around.vue")
    },
    {
        path: '/shoppingcart',
        name: 'shoppingcart',
        component: () =>
            import ("../views/shoppingcart/shoppingcart.vue")
    },
    {
        path: '/settlement',
        name: 'settlement',
        component: () =>
            import ("../views/settlement/settlement.vue")
    }
]

const isPro = process.env.NODE_ENV === 'production'


const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})

export default router