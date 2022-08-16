<template>
    <!--    <div class="login_wrap">
            <div class="form_wrap">

                <el-form
                        ref="formRef"
                        :model="loginData"
                        label-width="100px"
                        class="demo-dynamic"
                        :label-position="left"
                        style="max-width: 480px; margin-right: 30px"


                >
                    <el-form-item
                            prop="name"
                            label="用户名"
                            :rules="[
                            {
                            required: true,
                            message: '此项为必填项',
                            trigger: 'blur',
                            },
                        ]"
                    >
                        <el-input v-model="loginData.name"/>
                    </el-form-item>

                    <el-form-item
                            prop="password"
                            label="密码"
                            :rules="[
                        {
                        required: true,
                        message: '此项为必填项',
                        trigger: 'blur',
                        },
                    ]"
                    >
                        <el-input type="password" show-password v-model="loginData.password"/>
                    </el-form-item>
                </el-form>
                <el-button type="primary" class="login_btn" @click="handleLogin">登录</el-button>
                &lt;!&ndash; <p>{{num}}</p> &ndash;&gt;
            </div>
        </div>-->

    <div class="login-wrapper">
        <div>
            <div>
                <img src="@/assets/images/login-3.jpg" width="400" height="500">
            </div>
            <div>
                <img src="@/assets/images/login-4.jpg" width="70" height="70">
                <div>欢迎登录</div>
                <el-input v-model="loginData.name" size="large" placeholder="请输入用户名"></el-input>
                <el-input v-model="loginData.password" size="large" show-password placeholder="请输入密码"></el-input>
                <div>
                    <el-checkbox size="small" v-model="sure"></el-checkbox>
                    <div style="margin-left: 8px">我已阅读并同意</div>
                    <a>《用户隐私政策》</a>
                </div>
                <el-button type="primary" size="large" style="width: 335px" @click="handleLogin">登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {reactive, toRefs} from 'vue'
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import {loginApi} from "@/util/request"
import {ElMessage} from "element-plus";

export default {
    name: "login",
    setup() {
        const store = useStore()
        const router = useRouter()
        const count = store.state.number.count
        const data = reactive({
            loginData: {
                name: "",
                password: ""
            },
            num: count,
            sure: false
        })
        const handleLogin = () => {
            // 请求后台接口
            // 默认用户：admin/admin
            loginApi(data.loginData).then(res => {
                if (res.code === 1) {
                    ElMessage.success(res.msg)
                    store.commit('setUserInfo', res.data);
                    localStorage.setItem("loginData", JSON.stringify(res.data))
                    // 如果是第一次登录，需要跳到改密码页面，修改完再重新登录
                    if (res.data.first_login) {
                        ElMessage.warning("第一次登录需要修改密码")
                        router.push({
                                path: "/users/change_password"
                            }
                        )
                    } else {
                        router.push({
                            path: "/"
                        })
                    }
                }
            })
        }


        // vuex更改语法
        // console.log("修改前getters",store.getters["number/countStatus"])
        // const handleLogin=()=>{
        //     // store.commit('number/setCount', 100);
        //     store.dispatch('number/setCountPromise', 10).then(res=>{
        //         alert("修改成功")
        //     }).catch(err=>{
        //         alert(err)
        //     });
        //     console.log(store.state.number.count)
        //     console.log("修改后getters",store.getters["number/countStatus"])
        // }
        return {
            ...toRefs(data),
            handleLogin
        }
    }
}
</script>
<style lang="scss" scoped>
.login-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(242, 247, 251, 1);
    height: 100%;
    overflow: auto;

> div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 660px;
    box-shadow: 0px 1px 8px 0px rgba(234, 233, 241, 0.5);

> div:nth-child(1) {
    width: 600px;
    height: 100%;
    background-color: rgba(41, 132, 248, 1);
    border-radius: 8px 0 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

> div:nth-child(2) {
    width: 600px;
    height: 100%;
    background-color: white;
    border-radius: 0 8px 8px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

img {
    margin-bottom: 20px;
}

> div:nth-child(2) {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
}

> div:nth-child(5) {
    width: 335px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 30px;

a {
    color: #1F52D9;
}

}
.el-input {
    width: 335px;
    margin-bottom: 20px;
}

.el-input:nth-child(4) {
    margin-bottom: 10px;
}

}
}
}
</style>
