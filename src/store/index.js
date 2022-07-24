import Vue from 'vue'
import Vuex from 'vuex'


//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
export const store = new Vuex.Store({
  state: {
    //存放的键值对就是所要管理的状态
    user: '',
    token: '',
    currenMenu: '',
    currenMenuTitle: '',
    menuList: [],
    asideList: [],
    tagList: []
  },
  getters: {
    userInfo (state) {
      return state.user
    },
    token (state) {
      return state.token
    },
    menuList (state) {
      return state.menuList
    },
    asideList (state) {
      return state.asideList
    },
    tagList (state) {
      return state.tagList
    },
    currenMenu (state) {
      return state.currenMenu
    },
    currenMenuTitle (state) {
      return state.currenMenuTitle
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.user = userInfo
    },
    setToken (state, token) {
      state.token = token
    },
    userOut (state) {
      state.user = {}
      // token = ''
      sessionStorage.clear()
      // router.push({ name: 'Login', replace: true })
      window.location.reload()
    },
    setmenuList (state, menuList) {
      state.menuList = menuList
    },
    setasideList (state, asideList) {
      state.asideList = asideList
    },
    addtagList (state, view) {
      if (state.tagList.some(v => v.id === view.id)) return
      state.tagList.push(view)
    },
    deltagList (state, view) {
      state.tagList = state.tagList.filter(item => {
        return item.id != view.id
      })
    },
    setcurrenMenu (state, currenMenu) {
      state.currenMenu = currenMenu
    },
    setcurrenMenuTitle (state, currenMenuTitle) {
      state.currenMenuTitle = currenMenuTitle
    }
  },
  // actions: {
  //   async loginIn ({ commit, dispatch, getters }, loginFoem) {
  //     const res = await login(loginFoem)
  //   },
  // }
})

export default store
