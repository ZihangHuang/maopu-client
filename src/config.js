// const domain = 'http://192.168.17.182:8889'
const domain = 'http://192.168.0.101:8889'
// const domain = 'http://localhost:8889'

export const api = {
  domain,

  authentication: domain + '/authentication',
  login: domain + '/login',
  register: domain + '/register',
  getUser: domain + '/user/detail',
  updateUser: domain + '/user/update',

  releaseTopic: domain + '/topic/add',
  getTopicList: domain + '/topic/list',
  getTopicDetail: domain + '/topic/detail',
  addReply: domain + '/reply/add',
  getReplyList: domain + '/reply/list',
  deleteReply: domain + '/reply/delete',

  getQiniuToken: domain + '/base/getQiniuToken'
}

export const tabs = {
  default: '话题圈',
  news: '新闻',
  street: '步行街'
}


export const storageName = 'maopu_token'

export const qiniu = {
  uploadDomain: 'http://upload-z2.qiniup.com/putb64' //七牛云上传base64图片的华南域名
}