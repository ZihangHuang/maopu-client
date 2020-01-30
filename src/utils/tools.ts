import moment from 'moment'
import 'moment/locale/zh-cn'
import { Toast } from 'antd-mobile'

moment.locale('zh-cn')

// 格式化时间
export function setFormatDate(date: Date | string, fromNow?: boolean): string {
  let rDate = moment(date)
  if (fromNow) {
    return rDate.fromNow()
  } else {
    return rDate.format('YYYY-MM-DD HH:mm')
  }
}

export function getFormatDate(fromNow?: boolean): string {
  if (fromNow) {
    return moment().fromNow()
  } else {
    return moment().format('YYYY-MM-DD HH:mm')
  }
}

/**
 * @param  {[type]}   text     [提示内容]
 * @param  {Number}   duration [自动关闭的延时，单位秒]
 * @param  {Function} cb       [关闭后回调]
 * @param  {Boolean}  mask     [是否显示透明蒙层，防止触摸穿透]
 */
export function toast(
  text: string,
  duration = 2,
  cb: any = null,
  mask = false
): void {
  Toast.info(text, duration, cb, mask)
}

export function fileToBase64(file: File): Promise<FileReader['result']> {
  return new Promise(resolve => {
    // 声明js文件流
    let reader: FileReader = new FileReader()
    // 通过文件流把文件转化成Base64字符串
    reader.readAsDataURL(file)
    // 转换成功后
    reader.onloadend = function() {
      resolve(reader.result)
    }
  })
}

// ArrayBuffer转为字符串，参数为ArrayBuffer对象
export function ab2str(buf: ArrayBuffer): string {
  return String.fromCharCode.apply(null, new Uint16Array(buf) as any)
}

// 字符串转为ArrayBuffer对象，参数为字符串
export function str2ab(str: string): ArrayBuffer {
  let buf = new ArrayBuffer(str.length * 2) // 每个字符占用2个字节
  let bufView = new Uint16Array(buf)
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}
