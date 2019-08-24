/**
 * 封装通用请求
 */
import { httpPost } from './http'
import { api } from '../config'

//是否登录
export function authentication() {
  return httpPost(api.authentication, {})
}

export function register(data) {
  return httpPost(api.register, data)
}

export function updateUser(data) {
  return httpPost(api.updateUser, data)
}

//帖子
export function releaseTopic(data) {
  return httpPost(api.releaseTopic, data)
}
export function getTopicList(data) {
  return httpPost(api.getTopicList, data)
}
export function getTopicDetail(data) {
  return httpPost(api.getTopicDetail, data)
}

//评论&回复
export function addReply(data) {
  return httpPost(api.addReply, data)
}
export function getReplyListByTopicId(data) {
  return httpPost(api.getReplyList, data)
}
export function deleteReply(data) {
  return httpPost(api.deleteReply, data)
}

//上传
export function getQiniuToken(data) {
  return httpPost(api.getQiniuToken, data)
}