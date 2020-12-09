import axios from 'axios'

const request = axios.create({
    baseURL: 'http://realworld.api.fed.lagounews.com'
})

// 请求拦截器http://realworld.api.fed.lagounews.com

// 访问拦截器

export default request