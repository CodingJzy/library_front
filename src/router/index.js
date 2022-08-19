import {createRouter, createWebHashHistory} from 'vue-router'
import LayOut from '../views/LayOut/LayOut'
import store from "../store/index.js"

// 路由配置
const routes = [
    // 登陆页面
    {
        path: "/login",
        name: "login",
        component: () => import("../views/pages/login.vue")
    },


    // 第一次登录修改密码页面
    {
        path: "/users/change_password",
        name: "change_password",
        component: () => import("../views/pages/first_change_password")
    },
    {
        path: "/",
        name: "layout",
        component: LayOut,
        redirect: "/index",
        // 子路由/嵌套路由
        children: [
            {
                path: "/index",
                name: "index",
                component: () => import("../views/pages/index.vue")
            },
            {
                path: "/book_kinds",
                name: "book_kinds",
                component: () => import("../views/pages/book_kinds.vue")
            },
            {
                path: "/users",
                name: "users",
                component: () => import("../views/pages/usersList.vue")
            },
            {
                path: "/goods",
                name: "goods",
                component: () => import("../views/pages/goodsList.vue")
            }
        ]
    }
]
// 生成hash路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, form, next) => {
    /**
     * to:从哪个页面
     * from:到哪个页面
     * next:只有执行next()页面才会进行跳转
     */
    // 判断用户是否登录
    console.log("store", store.state.uInfo.userInfo)
    const uInfo = store.state.uInfo.userInfo
    if (!uInfo.token) {
        // 未登录,跳转到login
        if (to.path === "/login") {
            next()
            return
        }
        next("/login")

    } else {
        next()
    }

})
// 暴露路由对象
export default router
