<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>账号列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色内容区域 -->
        <div class="page_content">
            <div class="flex">
                <div class="input_box">
                    <el-input
                            v-model="searchParams.query"
                            placeholder="搜索关键字"
                            class="input-with-select"
                    >
                        <template #append>
                            <el-button @click="searchList">
                                <el-icon>
                                    <Search/>
                                </el-icon>
                            </el-button>
                        </template>
                    </el-input>
                </div>
                <el-button type="primary" @click="addUser">新建用户</el-button>
            </div>
            <!-- 表格 -->
            <!-- 
              el-table  的  data:要展示的数据数组
              el-table-column：列 prop每条数据的对应属性
                label：列标题
                scope.row:相当于一条数据
             -->
            <el-table :data="userList" style="width: 100%">
                <el-table-column prop="name" label="用户名" width="120"/>
                <el-table-column prop="nick_name" label="昵称" width="120"/>
                <el-table-column prop="sex" label="性别"/>
                <el-table-column prop="classed" label="班级"/>
                <el-table-column prop="code" label="学号"/>
                <el-table-column prop="phone" label="电话"/>
                <el-table-column prop="role" label="角色"/>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" @click="editRow(scope.row)">编辑</el-button>
                        <el-button v-if="scope.row.role!==1" type="danger" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                <!-- mg_state 状态 -->
            </el-table>
            <!-- 分页 -->
            <el-pagination
                    v-model:currentPage="searchParams.pagenum"
                    v-model:page-size="searchParams.pagesize"
                    :page-sizes="[2,5,10,20]"
                    :small="small"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="searchList"
                    @current-change="searchList"
            />
        </div>
        <!-- 新增弹窗 -->
        <el-dialog v-model="dialogFormVisible" title="新建用户">
            <el-form
                    :label-position="left"
                    label-width="100px"
                    style="max-width: 460px"
                    ref="userForm"
                    :model="formData"
                    :rules="rules"
            >
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item label="昵称" prop="nick_name">
                    <el-input v-model="formData.nick_name" placeholder="请输入用户昵称"/>
                </el-form-item>

                <el-form-item label="角色" prop="role">
                    <el-select v-model.number="formData.role" prop="role" placeholder="请选择用户角色">
                        <el-option v-if="isAdmin" label="图书管理员(默认密码为：admin)" :value="2" size="25px"/>
                        <el-option label="读者" :value="3"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="formData.phone" placeholder="请输入用户手机号"/>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model.number="formData.sex" prop="sex" placeholder="请选择用户性别">
                        <el-option label="未知" :value="0"/>
                        <el-option label="男" :value="1"/>
                        <el-option label="女" :value="2"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" prop="classed">
                    <el-input v-model="formData.classed" placeholder="请输入用户班级"/>
                </el-form-item>
                <el-form-item label="学号" prop="code">
                    <el-input v-model="formData.code" placeholder="请输入用户学号"/>
                </el-form-item>

            </el-form>
            <template #footer>
                <div style="margin-right: 250px">
                    <el-button type="warning" @click="closeTanChuang()">取消</el-button>
                    <el-button type="primary" @click="submitForm(userForm)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 编辑弹窗 -->
        <el-dialog v-model="dialogFormEVisible" title="编辑用户">
            <el-form
                    ref="userForm2"
                    :model="formData2"
                    :rules="rules2"
            >
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="formData2.name" placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item label="昵称" prop="nick_name">
                    <el-input v-model="formData2.nick_name" placeholder="请输入用户昵称"/>
                </el-form-item>

                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="formData2.phone" placeholder="请输入用户手机号"/>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model.number="formData2.sex" prop="role" placeholder="请选择用户性别">
                        <el-option label="未知" :value="0"/>
                        <el-option label="男" :value="1"/>
                        <el-option label="女" :value="2"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" prop="classed">
                    <el-input v-model="formData2.classed" placeholder="请输入用户班级"/>
                </el-form-item>
                <el-form-item label="学号" prop="code">
                    <el-input v-model="formData2.code" placeholder="请输入用户学号"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <div style="margin-right: 20px">
                    <el-button type="warning" @click="closeTanChuang()">取消</el-button>
                    <el-button type="primary" @click="submitEForm(userForm2)">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import {reactive, ref, toRefs} from 'vue'
import {userAddApi, userChangeInfoApi, userChangeStateApi, userDeleteApi, userListApi} from "@/util/request.js"
import store from "../../store/index.js"
import {ElNotification} from "element-plus";

export default {
    name: "users",
    setup() {
        const isAdmin = store.state.uInfo.userInfo.is_admin


        const data = reactive({
            // 是否是超级管理员
            isAdmin: isAdmin,

            searchParams: {
                query: "",
                pagesize: 5,
                pagenum: 1
            },
            total: 0,
            userList: [],
            dialogFormVisible: false,
            dialogFormEVisible: false,
            formData: {
                name: "",
                nick_name: "",
                phone: "",
                role: 3,
                sex: 0,
                classed: "",
                code: "",
            },
            formData2: {
                id: "",
                name: "",
                nick_name: "",
                sex: "",
                phone: "",
                classed: "",
                code: "",
            },
            rules: {
                name: [
                    {required: true, message: "此项为必填", trigger: "blur"}
                ],

                phone: [
                    {
                        required: false,
                        pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                        message: "请填写正确手机号", trigger: "blur"
                    }
                ]
            },
            rules2: {
                mobile: [
                    {
                        required: false,
                        pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                        message: "请填写正确手机号", trigger: "blur"
                    }
                ]
            }
        })
        const searchList = () => {
            userListApi(data.searchParams).then(res => {
                if (res.data) {
                    console.log("用户数据", res)
                    data.userList = res.data
                    data.total = res.data.total
                }
            })
        }
        const addUser = () => {
            data.dialogFormVisible = true
        }
        // 新增提交
        const submitForm = (formEl) => {
            // validate
            formEl.validate(res => {
                if (!res) {
                    return
                }
                // 表单通过请求接口
                userAddApi(data.formData).then(res => {
                    if (res.code === 1) {
                        ElNotification({
                            title: '添加用户成功',
                            message: res.data.name,
                            type: 'success',
                        })
                        // 隐藏弹窗
                        data.dialogFormVisible = false
                        // 清空form
                        data.formData = {}
                        // 重新更新列表 
                        searchList()
                    }
                })
            })
        }
        // 修改提交
        const submitEForm = (formEl) => {
            formEl.validate(res => {
                if (!res) {
                    return
                }
                // 提交修改
                userChangeInfoApi(data.formData2).then(res => {
                    if (res.code === 1) {
                        // 隐藏弹窗
                        data.dialogFormEVisible = false
                        ElNotification({
                            title: '编辑用户成功',
                            message: res.data.name,
                            type: 'success',
                        })

                        // 清空form
                        data.formData = {}
                        // 重新更新列表
                        searchList()
                    } else {
                        console.log("xxx")
                    }
                })
            })
        }
        // 数据编辑
        const editRow = row => {
            console.log("编辑的那条数据", row)
            const {name, nick_name, id, classed, phone, sex, code} = row
            // 展示编辑表单
            data.dialogFormEVisible = true;
            data.formData2.name = name
            data.formData2.nick_name = nick_name
            data.formData2.phone = phone
            data.formData2.classed = classed
            data.formData2.id = id
            data.formData2.sex = sex
            data.formData2.code = code
        }
        // 删除数据
        const deleteRow = row => {
            console.log("删除的那条数据", row)
            userDeleteApi(row).then(res => {
                if (res.code === 1) {
                    // 隐藏弹窗
                    data.dialogFormEVisible = false
                    ElNotification({
                        title: '删除用户成功',
                        message: row.name,
                        type: 'success',
                    })

                    // 清空form
                    data.formData = {}
                    // 重新更新列表
                    searchList()
                } else {
                    console.log("xxx")
                }
            })
        }

        const closeTanChuang = () => {
            data.dialogFormEVisible = false
            data.dialogFormVisible = false
        }

        // 方法初始化
        searchList()
        const userForm = ref()
        const userForm2 = ref()
        return {
            ...toRefs(data),
            searchList,
            addUser,
            submitForm,
            submitEForm,
            userForm,
            userForm2,
            editRow,
            deleteRow,
            closeTanChuang
        }
    }
}
</script>
<style scoped>
.input_box {
    width: 200px;
    margin-right: 15px;
}
</style>