import { observable, action, computed, runInAction, configure } from 'mobx'
import { api, storageName } from '../config'
import { httpPost } from '../utils/http'
import { authentication } from '../utils/proxy'
import history from '../history'

// configure({ enforceActions: 'observed' })
configure({ enforceActions: 'always' })

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }
  @observable token = ''
  @computed get isLogin() {
    return this.token !== ''
  }

  @action.bound
  checkLogin(isGetUser) {
    let t = this
    if (t.token) {
      //如果已经登录了，是否更新用户信息
      if (isGetUser) {
        return t.getUserInfoByToken()
      }
    }

    return authentication().then(res => {
      if (res.data.code === 1) {
        runInAction(() => {
          let token = localStorage.getItem(storageName)
          t.token = token
        })
        return t.getUserInfoByToken()
      }
    })
  }

  @action.bound
  setToken(token) {
    this.token = token
  }

  @action.bound
  login(data) {
    let t = this
    httpPost(api.login, data).then(res => {
      if (res.data.code !== 1) return
      runInAction(() => {
        let token = res.data.data.token
        t.token = token
        localStorage.setItem(storageName, token)
        history.push('/user')
      })
    })
  }

  @action.bound
  logout() {
    this.token = ''
    localStorage.removeItem(storageName)
  }

  @observable userInfo = {
    _id: '',
    nickname: '还没想好名字',
    username: '',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg',
    email: '',
    level: 1,
    reputation: 0,
    signature: '这个人很懒，什么都没写。'
  }
  @action.bound
  getUserInfoByToken() {
    let t = this
    return httpPost(api.getUser, {}).then(res => {
      if (res.data.code !== 1) return
      runInAction(() => {
        let userInfo = res.data.data
        t.userInfo = { ...t.userInfo, ...userInfo }
      })
      return t.userInfo
    })
  }
}

export default UserStore
