import moment from 'moment'
import 'moment/locale/zh-cn'
import { Toast } from 'antd-mobile'

moment.locale('zh-cn')

// 格式化时间
export function setFormatDate(date, fromNow) {
  date = moment(date)
  if (fromNow) {
    return date.fromNow()
  } else {
    return date.format('YYYY-MM-DD HH:mm')
  }
}

export function getFormatDate(fromNow) {
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
export function toast(text, duration = 2, cb = null, mask = false) {
  Toast.info(text, duration, cb, mask)
}

export function fileToBase64(file) {
  if (!file) return

  return new Promise(resolve => {
    //声明js文件流
    let reader = new FileReader()
    //通过文件流把文件转化成Base64字符串
    reader.readAsDataURL(file)
    //转换成功后
    reader.onloadend = function() {
      resolve(reader.result)
    }
  })
}
