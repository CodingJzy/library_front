<template>


    <div class="common-layout">
        <el-container>
            <el-header class="common-header flex-float">
                <div class="flex">
                    <img class="logo" src="../../assets/logo1.jpg" alt="">
                    <h1 class="title">图书管理系统</h1>
                </div>

                <el-menu
                        mode="horizontal"
                        :ellipsis="false"
                >
                    <div class="flex" />
                    <el-sub-menu index="2">
                        <template #title>用户名：江伟</template>
                        <el-menu-item index="2-1">修改密码</el-menu-item>
                        <el-menu-item index="2-2" @click="loginOut">退出</el-menu-item>
                    </el-sub-menu>
                </el-menu>

                <el-button @click="loginOut">退出</el-button>
            </el-header>
            <el-container>
                <el-aside class="common-aside" width="200px">
                    <el-menu
                            background-color="none"
                            active-color="red"
                            text-color="black"
                            :router="true"
                    >
                        <el-sub-menu index="1" >
                            <template #title>
                                <el-icon>
                                    <Avatar/>
                                </el-icon>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/users">用户列表</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon>
                                    <Box/>
                                </el-icon>
                                <span>图书分类管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/book_kinds">图书分类列表</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon>
                                    <Box/>
                                </el-icon>
                                <span>图书管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/goods">图书列表</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>

                        <el-sub-menu index="4">
                            <template #title>
                                <el-icon>
                                    <Box/>
                                </el-icon>
                                <span>借阅管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/goods">借书列表</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-menu-item index="/goods">还书列表</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                    </el-menu>
                </el-aside>
                <el-main>

                    <!-- router-view -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>
<script>
import {useRouter} from 'vue-router'
import {useStore} from "vuex"

export default {
    name: "layout",
    setup() {
        const store = useStore()
        const router = useRouter()
        const loginOut = () => {
            localStorage.removeItem("loginData")
            store.commit('setUserInfo', {});
            router.push({
                path: "/login"
            })

        }
        return {
            loginOut
        }
    }
}
</script>
<style>
.el-container {
    height: 100vh;
    overflow: hidden;
}

.common-header {
    background: rgb(0, 118, 245);

}

.common-aside {
    background: rgb(234, 234, 234);
}

.logo {
    width: 80px;
}

.title {
    color: #fff;
}

.el-main {
    background: #efefef;
}

</style>