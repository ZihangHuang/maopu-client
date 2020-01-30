import { httpPost } from './http'
import { qiniu } from '../config'
import { IRes } from '../types'
import { ab2str } from './tools'

export const uploadBase64 = (
  token: string,
  data: string | ArrayBuffer,
  size: number,
  key?: string
): Promise<IRes> => {
  let url = key
    ? `${qiniu.uploadDomain}/${size}/key/${btoa(key)}`
    : `${qiniu.uploadDomain}/${size}`

  let base64: string
  if (data instanceof ArrayBuffer) {
    base64 = ab2str(data)
  } else {
    base64 = data
  }
  base64 = base64.slice(base64.indexOf('base64,') + 7) // 去掉类似data:image/jpeg;base64,的前缀
  return httpPost(url, base64, {
    headers: {
      'Content-Type': 'application/octet-stream',
      Authorization: `UpToken ${token}`
    }
  })
}
