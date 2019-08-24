import { httpPost } from './http'
import { qiniu } from '../config'

export const uploadBase64 = (token, base64, size, key) => {
  let url = key ? `${qiniu.uploadDomain}/${size}/key/${btoa(key)}` : `${qiniu.uploadDomain}/${size}`
  base64 = base64.slice(base64.indexOf('base64,') + 7) //去掉类似data:image/jpeg;base64,的前缀
  return httpPost(url, base64, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Authorization': `UpToken ${token}`
    }
  })
}
