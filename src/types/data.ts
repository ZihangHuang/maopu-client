export interface IUserInfo {
  _id: string
  username?: string
  nickname?: string
  avatar?: string
  email?: string
  level?: number
  reputation?: number
  signature?: string

  [x: string]: any
}

export interface IRes {
  code: number
  data: any
  msg: string
}

// 请求参数接口
// 通用
export interface IGetListData {
  pageNo?: number
  pageSize?: number
  [x: string]: any
}
export interface IGetDetailData {
  _id: string
  [x: string]: any
}

// user
export interface ILoginData {
  username: string
  password: string
}

export interface IUpdateUserData {
  username: string
  password: string
  [x: string]: any
}

// topic and news
export interface IAddTopicData {
  title: string
  content: string
  tab: string
  [x: string]: any
}

export interface IAddNewsHasFocusPicData {
  title: string
  content: string
  tab: string
  focusPic: string
  [x: string]: any
}

// reply
export interface IAddReplyData {
  content: string
  topicId: string
  replyId?: string
  replyAuthor?: IUserInfo
}
export interface IDeleteReplyData {
  replyId: string
}

// qiniu
export interface IGetQiniuTokenData {
  key?: string
}

// message
export interface ISetMessagesToHasReadData {
  userId: string
}
