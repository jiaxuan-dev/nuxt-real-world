// 在服务端渲染期间运行的都是同一个实例
// 防止数据冲突

const cookieparser = process.server ? require('cookieparser') : undefined


export const state = () => {
    return {
        user: null
    }
}

export const mutations = {
    setUser(state, data) {
        state.user = data
    },
    logout(state) {
        state.user = null
    }
}

export const actions = {
    // nuxtServerInit特殊的方法
    // 在服务端渲染期间自动调用
    // 作用，初始化容器数据，传递数据给容器使用
    nuxtServerInit({ commit }, { req }) {
        let user = null

        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (error) {
            }
        }

        commit('setUser', user)
    }
}