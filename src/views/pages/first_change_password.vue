<template>
    <div>

        <h1 style="text-align: center">修改密码</h1>

        <el-form
                label-width="100px"
                style="max-width: 460px; margin: auto"
        >
            <el-form-item label="旧密码">
                <el-input show-password v-model="formData.password" size="large" placeholder="请输入旧密码"/>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input show-password v-model="formData.new_password" size="large" placeholder="请输入新密码"/>
            </el-form-item>
        </el-form>
        <div>
            <el-button class="change_password" @click="redirectLogin()">取消</el-button>
            <el-button class="change_password" type="primary" @click="submitForm()">确定</el-button>
        </div>
    </div>
</template>

<script>

import {useRouter} from "vue-router";
import {useStore} from "vuex"

import {reactive, toRefs} from 'vue'
import {userChangePasswordApi} from "@/util/request";
import {ElMessage} from "element-plus";

export default {
    name: "change_password",
    setup() {
        const router = useRouter()
        const store = useStore()
        const data = reactive({
            "formData": {
                "password": "",
                "new_password": ""
            }
        })

        // 跳转到login
        const redirectLogin = () => {
            // 清空登录数据
            localStorage.removeItem("loginData")
            store.commit('setUserInfo', {});
            router.push("/login")
        }

        const submitForm = () => {
            // 表单通过请求接口
            userChangePasswordApi(data.formData).then(res => {
                // 修改失败
                if (res.code === 1) {
                    ElMessage.warning(res.msg + ", 需要重新登录")
                    redirectLogin();
                } else {
                    // 清空表单数据
                    data.formData = {
                        password: "",
                        new_password: ""
                    }
                }
            })

        }
        return {
            ...toRefs(data),
            redirectLogin,
            submitForm
        }
    }
}


</script>

<style>
.change_password {
    margin-right: 230px;
    margin-left: 630px
}

</style>