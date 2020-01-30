const domain = 'http://localhost:8889'

export const api: AnyObject = {
  domain,

  authentication: domain + '/authentication',
  login: domain + '/login',
  register: domain + '/register',
  getUser: domain + '/user/detail',
  updateUser: domain + '/user/update',

  addTopic: domain + '/topic/add',
  getTopicList: domain + '/topic/list',
  getTopicDetail: domain + '/topic/detail',
  addReply: domain + '/reply/add',
  getReplyList: domain + '/reply/list',
  deleteReply: domain + '/reply/delete',

  getNewsList: domain + '/news/list',
  getNewsHasFocusPic: domain + '/news/list/focus',
  addNews: domain + '/news/add',

  getQiniuToken: domain + '/base/getQiniuToken',

  getMessageList: domain + '/message/list',
  getUnReadMessagesCount: domain + '/message/list/unread',
  setMessagesToHasRead: domain + '/message/set/hasread'
}

export const tabs: AnyObject = {
  default: '话题圈',
  street: '步行街'
}

export const storageName = ''

export const qiniu: AnyObject = {
  uploadDomain: 'http://upload-z2.qiniup.com/putb64' // 七牛云上传base64图片的华南域名
}
