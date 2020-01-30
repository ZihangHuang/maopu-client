/**
 * 封装通用请求
 */
import { httpPost } from './http'
import { api } from '../config'
import {
  IRes,
  ILoginData,
  IUpdateUserData,
  IAddTopicData,
  IGetListData,
  IGetDetailData,
  IAddNewsHasFocusPicData,
  IAddReplyData,
  IDeleteReplyData,
  IGetQiniuTokenData,
  ISetMessagesToHasReadData
} from '../types'

// 是否登录
export function authentication(): Promise<IRes> {
  return httpPost(api.authentication, {})
}

export function register(data: ILoginData): Promise<IRes> {
  return httpPost(api.register, data)
}

export function updateUser(data: IUpdateUserData): Promise<IRes> {
  return httpPost(api.updateUser, data)
}

// 帖子
export function addTopic(data: IAddTopicData): Promise<IRes> {
  return httpPost(api.addTopic, data)
}
export function getTopicList(data?: IGetListData): Promise<IRes> {
  return httpPost(api.getTopicList, data)
}
export function getTopicDetail(data: IGetDetailData): Promise<IRes> {
  return httpPost(api.getTopicDetail, data)
}
// 新闻
export function getNewsList(data?: IGetListData): Promise<IRes> {
  return httpPost(api.getNewsList, data)
}
export function getNewsHasFocusPic(data?: IGetListData): Promise<IRes> {
  return httpPost(api.getNewsHasFocusPic, data)
}

export function addNews(data: IAddTopicData): Promise<IRes> {
  return httpPost(api.addNews, data)
}

export function addNewsHasFocusPic(
  data: IAddNewsHasFocusPicData
): Promise<IRes> {
  return httpPost(api.addNews, data)
}

// 评论&回复
export function addReply(data: IAddReplyData): Promise<IRes> {
  return httpPost(api.addReply, data)
}
export function getReplyListByTopicId(data: IGetListData): Promise<IRes> {
  return httpPost(api.getReplyList, data)
}
export function deleteReply(data: IDeleteReplyData): Promise<IRes> {
  return httpPost(api.deleteReply, data)
}

// 上传
export function getQiniuToken(data?: IGetQiniuTokenData): Promise<IRes> {
  return httpPost(api.getQiniuToken, data)
}

// 消息
export function getMessageList(data?: IGetListData): Promise<IRes> {
  return httpPost(api.getMessageList, data)
}
export function getUnReadMessagesCount(data?: IGetListData): Promise<IRes> {
  return httpPost(api.getUnReadMessagesCount, data)
}
// 设置所有消息为已读
export function setMessagesToHasRead(
  data: ISetMessagesToHasReadData
): Promise<IRes> {
  return httpPost(api.setMessagesToHasRead, data)
}
