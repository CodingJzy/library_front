import {del, get, post, put} from "./service"

export const loginApi = data => {
    return post({
        url: "/login",
        data
    })
}
// 获取用户列表
export const userListApi = data => {
    return get({
        url: "/api/v1/users",
        data
    })
}

// 新增用户列表
export const userAddApi = data => {
    return post({
        url: "/api/v1/users",
        data
    })
}

// 用户录修改密码
export const userChangePasswordApi = data => {
    return post({
        url: "/api/v1/users/change_password",
        data
    })
}

//  用户列表更改状态
export const userChangeStateApi = data => {
    return put({
        url: `users/${data.id}/state/${data.mg_state}`,
        data
    })
}

// 更改用户信息
export const userChangeInfoApi = data => {
    return put({
        url: `/api/v1/users/${data.id}`,
        data
    })
}

// 删除用户
export const userDeleteApi = data => {
    return del({
        url: `/api/v1/users/${data.id}`
    })
}

// 获取图书列表
export const getBookKindsApi = data => {
    return get({
        url: `/api/v1/book_kinds`,
        data
    })
}
// 新建图书分类
export const addBookKindsApi = data => {
    return post({
        url: `/api/v1/book_kinds`,
        data
    })
}
// 编辑图书分类
export const editBookKindsApi = data => {
    return put({
        url: `/api/v1/book_kinds/${data.id}`,
        data
    })
}

// 删除图书分类
export const rolesDeleteApi = data => {
    return del({
        url: `/api/v1/book_kinds/${data.id}`
    })
}

export const goodsListApi = data => {
    return get({
        url: `goods`,
        data
    })
} 


