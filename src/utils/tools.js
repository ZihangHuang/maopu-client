import moment from 'moment'
import 'moment/locale/zh-cn'

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
