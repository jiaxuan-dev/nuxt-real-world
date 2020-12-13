
import { request } from '@/plugins/request'


// 登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/api/users/login',
        data
    })
}

// 注册
export const register = data => {
    return request({
        method: 'POST',
        url: '/api/users',
        data
    })
}

export const getUser = () => {
    return request({
        method: 'GET',
        url: '/api/user'
    })
}

export const updateUser = data => {
    return request({
        method: 'PUT',
        url: '/api/users',
        data
    })
}

export const getProfile = username => {
    return request({
        method: 'GET',
        url: `/api/profiles/${username}`
    })
}

export const followUser = username => {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`
    })
}

export const unfollowUser = username => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`
    })
}