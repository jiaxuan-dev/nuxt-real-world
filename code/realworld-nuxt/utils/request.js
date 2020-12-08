import axios from 'axios'

const request = axios.create({
    baseURL: ' https://conduit.productionready.io'
})

// 请求拦截器

// 访问拦截器

export default request