import { createStore } from 'vuex'
import { useStorage } from '@vueuse/core'

export default createStore({
  state: {
    token:  useStorage('token', '')  as any
  },
  mutations: {
  },
  actions: {
    setToken(context,newToken) {
      context.commit("setToken" , newToken)
    },
    logoutUser() {
      useStorage('token', '')
    }
  },
  getters: {
    isLoggedIn: state => {
      if(state.token !== undefined && state.token !== ''){
        return true
      } else {
        return false
      }
    },
  },
  modules: {
  }
})
