import axios from 'axios'

export const request = axios.create({
    baseURL: 'http://realworld.api.fed.lagounews.com'
})

export default ({ store }) => {

    // 请求拦截器http://realworld.api.fed.lagounews.com

    // Add a request interceptor
    request.interceptors.request.use(function (config) {
        // Do something before request is sent

        const { user } = store.state

        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // 访问拦截器

}