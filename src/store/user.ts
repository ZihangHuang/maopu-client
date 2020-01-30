import { IUserStore } from '../types'
import { api, storageName } from '../config'
import { httpPost } from '../utils/http'
import history from '../core/history'

export default function createUserStore(): IUserStore {
  const user: IUserStore = {
    token: '',
    get isLogin() {
      return this.token !== ''
    },

    setToken(token) {
      this.token = token
    },

    login(data) {
      let t = this
      httpPost(api.login, data).then(res => {
        if (res.data.code !== 1) return

        let token = res.data.data.token
        t.token = token
        localStorage.setItem(storageName, token)

        t.getUserInfoByToken()

        history.push('/user')
      })
    },

    logout() {
      this.token = ''
      localStorage.removeItem(storageName)
    },

    userInfo: {
      _id: '',
      nickname: '还没想好名字',
      username: '',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg',
      email: '',
      level: 1,
      reputation: 0,
      signature: '这个人很懒，什么都没写。'
    },

    setUserInfo(userInfo: AnyObject) {
      Object.assign(this.userInfo, userInfo)
    },

    getUserInfoByToken() {
      let t = this
      return httpPost(api.getUser, {}).then(res => {
        if (res.data.code !== 1) return

        let userInfo = res.data.data
        t.setUserInfo(userInfo)
        return t.userInfo
      })
    }
  }

  return user
}
