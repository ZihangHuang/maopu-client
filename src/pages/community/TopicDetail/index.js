import React from 'react'
import {
  getTopicDetail,
  addReply,
  getReplyListByTopicId,
  deleteReply
} from '../../../utils/proxy'
import BaseTitleCard from '../../../components/base/TitleCard'
import BaseBtn from '../../../components/base/Btn'
import BaseLoadMore from '../../../components/base/LoadMore'
import { setFormatDate, toast } from '../../../utils/tools'
import { Modal, TextareaItem, Badge } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import './index.css'

@inject('rootStore')
@observer
class TopicDetail extends React.Component {
  state = {
    topic: {},
    author: {},
    replies: [],
    fromTime: '',
    isShowModal: false, //是否显示评论弹窗
    replyText: '',
    reply2: { //二级回复
      authorId: 0, //二级回复对应的一级回复作者id
      nickname: '', //二级回复对应的一级回复作者昵称
      replyId: 0 ////二级回复对应的一级回复id
    },
    isLoading: false,
    hasMore: true
  }

  pageNo = 1
  // totalPage = 1

  componentDidMount() {
    let { userStore } = this.props.rootStore
    userStore.checkLogin()
    this.getTopicDetail()
    this.getReplyList()
  }

  //获取帖子详情
  getTopicDetail() {
    let t = this
    let topicId = t.props.match.params.id

    getTopicDetail({
      _id: topicId
    }).then(res => {
      if (res.data.code === 1) {
        let data = res.data.data
        t.setState({
          topic: data,
          author: data.author,
          fromTime: setFormatDate(data.createTime, true)
        })
      }
    })
  }

  //获取评论
  getReplyList = () => {
    let t = this
    if (t.state.isLoading || !t.state.hasMore) return

    let topicId = t.props.match.params.id
    t.setState({
      isLoading: true
    })

    getReplyListByTopicId({
      topicId: topicId,
      pageNo: t.pageNo
    }).then(res => {
      if (res.data.code === 1) {
        let data = res.data.data
        t.setState({
          replies: [...t.state.replies, ...data.list],
          hasMore: data._pageNo < data._totalPage ? true : false,
          isLoading: false
        })
        t.pageNo++
      } else {
        t.setState({
          isLoading: false
        })
      }
    })
  }

  showModal = (reply2, e) => {
    if (!reply2.replyId) {
      e = reply2
      reply2 = null
    }
    e.preventDefault() // 修复 Android 上点击穿透

    if (reply2) {
      this.setState({
        reply2
      })
    }

    this.setState({
      isShowModal: true
    })
  }
  onClose = () => {
    this.setState({
      isShowModal: false
    })
  }

  handleChange = value => {
    this.setState({
      replyText: value
    })
  }

  replySubmit = () => {
    if (!this.state.replyText) {
      toast('请输入内容哦……', 2, null, false)
      return
    }
    // console.log('text:', this.state.replyText)
    let data = {
      content: this.state.replyText,
      topicId: this.state.topic._id
    }
    if (this.state.reply2.replyId) {
      data.replyId = this.state.reply2.replyId
      data.replyAuthor = {
        nickname: this.state.reply2.nickname,
        _id: this.state.reply2.authorId
      }
    }
    this.onClose()
    addReply(data).then(res => {
      if (res.data.code === 1) {
        toast('评论成功')
        this.setState({
          replies: [...this.state.replies, res.data.data],
          replyText: ''
        })
      } else {
        toast(res.data.msg)
      }
    })
  }

  deleteReply = (replyId, i) => {
    let t = this
    deleteReply({
      replyId
    }).then(res => {
      if (res.data.code === 1) {
        toast('删除成功')
        t.setState({
          replies: [...t.state.replies.slice(0, i), ...t.state.replies.slice(i + 1)]
        })
      } else {
        toast(res.data.msg)
      }
    })
  }

  render() {
    let { userStore } = this.props.rootStore

    let author = this.state.author
    let topic = this.state.topic
    let replies = this.state.replies

    let replyList =
      replies.length > 0 ? (
        replies.map((v, i) => (
          <div className="reply2-box" key={v._id.slice(-3)}>
            <BaseTitleCard
              size={20}
              avatar={v.author.avatar}
              nickname={v.author.nickname}
              fromTime={setFormatDate(v.createTime, true)}>
              <span className="fc-blue">{i + 1}楼 </span>
              {v.author._id === author._id ? <Badge text="楼主" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} /> : ''}
            </BaseTitleCard>
            {userStore.isLogin && (
              <div className="reply-bar">
                <span
                  onClick={this.deleteReply.bind(this, v._id, i)}
                  className="reply2-delete-btn"
                >
                  删除
                </span>
                <img
                  src="/images/reply.png"
                  alt=""
                  className="icon-m reply2-add-btn"
                  title="回复"
                  onClick={this.showModal.bind(this, {
                    authorId: v.author._id,
                    nickname: v.author.nickname,
                    replyId: v._id
                  })}
                />
              </div>
            )}
            <div className="topic-reply">
              {v.replyAuthor && v.replyAuthor.nickname && (
                <span className="fc-blue">
                  @{v.replyAuthor.nickname}{' '}
                </span>
              )}
              <span>{v.content}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="no-reply">暂无评论</div>
      )

    return (
      <div className="topic-container">
        <div className="tab-title">话题圈</div>
        <BaseTitleCard
          avatar={author.avatar}
          nickname={author.nickname}
          fromTime={this.state.fromTime}
        />
        <div className="topic-content" dangerouslySetInnerHTML={{__html: topic.content}}></div>
        <div className="reply-nav">
          <span className="line" />
          <span>这些回复亮了</span>
          {userStore.isLogin && (
            <BaseBtn
              style={{ marginLeft: 'auto' }}
              btnName="icon-release"
              size="btn"
              clickHandle={this.showModal}
            />
          )}
        </div>
        <div className="reply-container">
          {replyList}
          {/* 加载更多组件 */}
          {replyList.length > 0 && (
            <BaseLoadMore
              isLoading={this.state.isLoading}
              hasMore={this.state.hasMore}
              loadMoreHandle={this.getReplyList}
            />
          )}
        </div>
        <Modal
          visible={this.state.isShowModal}
          transparent
          closable={true}
          maskClosable={false}
          onClose={this.onClose}
          title="我来评论"
          footer={[
            {
              text: '提交',
              onPress: this.replySubmit
            }
          ]}
          afterClose={() => {}}
        >
          <TextareaItem
            autoHeight
            placeholder="说点什么……"
            title={
              this.state.reply2.nickname
                ? `@${this.state.reply2.nickname} `
                : ''
            }
            value={this.state.replyText}
            onChange={this.handleChange}
          />
        </Modal>
      </div>
    )
  }
}

export default TopicDetail
