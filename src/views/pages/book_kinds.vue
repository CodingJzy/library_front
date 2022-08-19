<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>图书分类列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色内容区域 -->
        <div class="page_content">
            <el-button type="success" @click="dialogFormVisible=true" style="margin-left: 440px">新建图书分类</el-button>
            <el-table :data="bookKindsList"  table-layout="auto">
                <el-table-column prop="name" label="分类名称"/>
                <!--                <el-table-column prop="roleDesc" label="角色描述"  />-->
                <el-table-column>
                    <template #default="scope">
                        <el-button type="primary" @click="editRow(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 新建编辑弹窗表单 -->
        <el-dialog v-model="dialogFormVisible" width="500px"
                   @close="clearForm"
                   :title="formData.id?'编辑图书分类':'新建图书分类'">
            <el-form style="margin-left: 60px"
                     ref="bookKindForm"
                     :model="formData"
                     :rules="rules"
                     width="80px"
            >
                <el-form-item label="图书分类名称" prop="name">
                    <el-col :span="20">
                        <el-input v-model="formData.name" placeholder="请输入图书分类名称"/>
                    </el-col>
                </el-form-item>
            </el-form>
            <template #footer>
                <div style="margin-right: 50px">
                    <el-button type="warning" @click="closeTanChuang()">取消</el-button>
                    <el-button type="primary" @click="submitForm(bookKindForm)">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script>

import {reactive, ref, toRefs} from "vue"
import {addBookKindsApi, editBookKindsApi, getBookKindsApi, rolesDeleteApi} from "@/util/request.js"
import {ElNotification} from 'element-plus'

export default {
    name: "book_kinds",
    setup() {
        const data = reactive({
            bookKindsList: [],
            dialogFormVisible: false,
            formData: {
                name: "",
            },
            rules: {
                name: {
                    required: true, message: "此项必填", trigger: "blur"
                }
            },
        })
        const getList = () => {
            getBookKindsApi().then(res => {
                data.bookKindsList = res.data
            })
        }
        const submitForm = formEl => {
            formEl.validate(res => {
                if (!res) {
                    return
                }
                // 提交表单
                if (data.formData.id) {
                    editBookKindsApi(data.formData).then(res => {
                        if (res.code === 1) {
                            ElNotification({
                                title: '编辑图书分类成功',
                                message: data.formData.name,
                                type: 'success',
                            })
                            data.dialogFormVisible = false
                            getList()
                        } else {
                            console.log(res.msg);
                        }
                    })

                } else {
                    addBookKindsApi(data.formData).then(res => {
                        if (res.code === 1) {
                            ElNotification({
                                title: '添加图书分类成功',
                                message: res.data.name,
                                type: 'success',
                            })
                            data.dialogFormVisible = false
                            getList()
                        } else {
                            console.log(res.msg);
                        }

                    })

                }
            })
        }
        const editRow = row => {
            data.dialogFormVisible = true
            const {name, id} = row
            data.formData = {
                id,
                name
            }
        }
        const deleteRow = row => {
            rolesDeleteApi(row).then(res => {
                if (res.code === 1) {
                    ElNotification({
                        title: '删除图书分类成功',
                        message: row.name,
                        type: 'success',
                    })
                    data.dialogFormVisible = false
                    getList()
                } else {
                    console.log(res.msg);
                }
                getList()
            })
        }

        const closeTanChuang = () => {
            data.dialogFormVisible = false
        }

        const clearForm = () => {
            data.formData = {
            }
        }
        getList()
        const bookKindForm = ref()
        return {
            ...toRefs(data),
            editRow,
            deleteRow,
            bookKindForm,
            submitForm,
            clearForm,
            closeTanChuang
        }
    }
}
</script>