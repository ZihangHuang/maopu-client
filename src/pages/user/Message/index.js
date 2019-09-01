import React from 'react'
import { getMessageList, setMessagesToHasRead } from '../../../utils/proxy'
import { inject, observer } from 'mobx-react'
import MessageItem from '../../../components/user/MessageItem'
import BaseLoadMore from '../../../components/base/LoadMore'
import { setFormatDate } from '../../../utils/tools'

@inject('rootStore')
@observer
class Message extends React.Component {
  state = {
    messageList: [],
    isLoading: false,
    hasMore: false
  }

  pageNo = 1

  componentDidMount() {
    // let { userStore } = this.props.rootStore
    // userStore.checkLogin()
    this.getMessageList()
  }

  getMessageList = () => {
    let t = this
    let { userStore } = t.props.rootStore

    getMessageList({
      userId: userStore.userInfo._id,
      pageNo: t.pageNo
    }).then(res => {
      if(res.data.code === 1) {
        let data = res.data.data
        //console.log(data)
        t.setState({
          messageList: [...t.state.messageList, ...data.list],
          hasMore: data._pageNo < data._totalPage ? true : false,
          isLoading: false
        })
        t.pageNo++

        //设置所有消息为已读
        let locationState = t.props.location.state //获取路由的state参数
        if(locationState && locationState.isSetHasRead) {
          setMessagesToHasRead({ userId: userStore.userInfo._id })
        }
      } else {
        t.setState({
          isLoading: false
        })
      }
    })
  }

  render() {
    const items = this.state.messageList.map(v => {

      if(v.type === 'reply2') {
        return <MessageItem type="reply2" topic={v.topic} reply={v.reply} reply1={v.reply1} createTime={setFormatDate(v.createTime, true)} key={v._id}/>
      }else if(v.type === 'reply'){
        return <MessageItem type="reply" topic={v.topic} reply={v.reply} createTime={setFormatDate(v.createTime, true)} key={v._id}/>
      }
    })

    return (
      <div>
        {items}
        <BaseLoadMore
          isLoading={this.state.isLoading}
          hasMore={this.state.hasMore}
          loadMoreHandle={this.getMessageList}
        />
      </div>
    )
  }
}

export default Message