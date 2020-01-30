import React, { useState, useContext, useEffect } from 'react'
import { getMessageList, setMessagesToHasRead } from '../../../utils/proxy'
import { RouteComponentProps } from 'react-router-dom'
// import { observer } from 'mobx-react-lite'
import { Context } from '../../../store'
import MessageItem from '../../../components/user/MessageItem'
import BaseLoadMore from '../../../components/base/LoadMore'
import { setFormatDate } from '../../../utils/tools'

let pageNo = 1

interface ILocationState {
  isSetHasRead: boolean
}

interface IProps extends RouteComponentProps<any, any, ILocationState> {}

const Message: React.FC<IProps> = function Message(props) {
  const store = useContext(Context)
  const userStore = store!.userStore

  const [messageList, setMessageList] = useState<AnyObject[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const [hasMore, setHasMore] = useState(false)

  function getMessageListAjax() {
    getMessageList({
      userId: userStore.userInfo._id,
      pageNo: pageNo
    }).then(res => {
      if (res.data.code === 1) {
        let data = res.data.data
        // console.log(data)
        if (Array.isArray(data.list)) {
          setMessageList([...messageList, ...data.list])
        }
        setHasMore(data._pageNo < data._totalPage ? true : false)
        setIsLoading(false)
        pageNo++
        // 设置所有消息为已读
        let locationState = props.location.state // 获取路由的state参数
        if (locationState && locationState.isSetHasRead) {
          setMessagesToHasRead({ userId: userStore.userInfo._id })
        }
      } else {
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {
    pageNo = 1
    getMessageListAjax()
  }, [])

  const items = messageList.map(v => {
    if (v.type === 'reply2') {
      return (
        <MessageItem
          type="reply2"
          topic={v.topic}
          reply={v.reply}
          reply1={v.reply1}
          createTime={setFormatDate(v.createTime, true)}
          key={v._id}
        />
      )
    } else if (v.type === 'reply') {
      return (
        <MessageItem
          type="reply"
          topic={v.topic}
          reply={v.reply}
          createTime={setFormatDate(v.createTime, true)}
          key={v._id}
        />
      )
    }

    return <div key={v._id}></div>
  })

  return (
    <div>
      {items}
      <BaseLoadMore
        isLoading={isLoading}
        hasMore={hasMore}
        loadMoreHandle={getMessageListAjax}
      />
    </div>
  )
}
export default Message
