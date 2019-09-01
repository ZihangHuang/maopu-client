import axios from 'axios'
import { Toast } from 'antd-mobile'
import { toast } from './tools'
import { storageName } from '../config'
import RootStore from '../store'
import { api } from '../config'

export function httpGet(url, data) {
  return axios.get(url, {
    params: data
  })
}

export function httpPost(url, data, config) {
  return axios.post(url, data, config)
}

//axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
//请求拦截器
axios.interceptors.request.use(
  function(config) {
    Toast.loading('', 0)
    if(config.url.indexOf(api.domain) !== -1) {
      //先读取store存储的token，没有再读缓存的
      let token = RootStore.userStore.token || localStorage.getItem(storageName)
      if(token) {
        config.headers.Authorization = 'Bearer ' + token
      }
    }
    return config
  },
  function(error) {
    Toast.hide()
    toast('网络异常')
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  function(response) {
    Toast.hide()
    let data = response.data
    if(data && data.code !== 1 && data.msg) {
      toast(data.msg, 2, null, false)
    }
    return response
  },
  function(error) {
    Toast.hide()
    toast('网络异常')
    return Promise.reject(error)
  }
)
