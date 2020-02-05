import React, { useState, useContext, useEffect } from 'react'
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
import { tabs } from '../../../config'
import { Modal, TextareaItem } from 'antd-mobile'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'
import ReplyItem from '../../../components/topic/Reply'
import { Context } from '../../../store'
import { useAsyncFetch, HasMore } from '../../../hooks'
import { IRes, IAddReplyData } from '../../../types'
import './index.css'

interface IReply2 {
  authorId: string
  nickname: string
  replyId: string
}

interface IParams {
  id: string
}

interface IReplyAuthor {
  _id: string
  nickname?: string
}

interface IAuthor {
  _id: string
  avatar: string
  nickname: string
  username?: string
}

interface IReply {
  _id: string
  author: IAuthor
  content: any
  createTime: string
  topicId: string
  replyAuthor?: IReplyAuthor
}

let pageNo = 1

const TopicDetail: React.FC<RouteComponentProps<IParams>> = function(props) {
  const store = useContext(Context)
  const userStore = store!.userStore

  const [topic, setTopic] = useState<AnyObject>({})

  const [author, setAuthor] = useState<AnyObject>({})

  const [replies, setReplies] = useState<IReply[]>([])

  const [fromTime, setFromTime] = useState('')

  const [isShowModal, setIsShowModal] = useState(false) // 是否显示评论弹窗

  const [replyText, setReplyText] = useState('')

  // 二级回复
  const [reply2, setReply2] = useState<IReply2>({
    authorId: '', // 二级回复对应的一级回复作者id
    nickname: '', // 二级回复对应的一级回复作者昵称
    replyId: '' // 二级回复对应的一级回复id
  })

  useEffect(() => {
    pageNo = 1
    getTopicDetailAjax()
    getReplyList()
  }, [])

  // 获取帖子详情
  function getTopicDetailAjax(): void {
    let topicId = props.match.params.id

    getTopicDetail({
      _id: topicId
    }).then(res => {
      if (res.data.code === 1) {
        let data = res.data.data

        setTopic(data)
        setAuthor(data.author)
        setFromTime(setFormatDate(data.createTime, true))
      }
    })
  }

  // 获取评论
  function getReplySuccess(res: IRes): HasMore {
    let hasMore: HasMore

    if (res.data.code === 1) {
      let data = res.data.data

      setReplies([...replies, ...data.list])
      hasMore = data._pageNo < data._totalPage ? true : false

      pageNo++
    }

    return hasMore
  }
  const { isLoading, hasMore, run } = useAsyncFetch(getReplyListByTopicId, {
    onSuccess: getReplySuccess
  })
  function getReplyList() {
    let topicId = props.match.params.id
    run({
      topicId: topicId,
      pageNo: pageNo
    })
  }

  // 获取评论
  // const [isLoading, setIsLoading] = useState(false)
  // const [hasMore, setHasMore] = useState(true)

  // function getReplyList(): void {
  //   if (isLoading || !hasMore) return

  //   let topicId = props.match.params.id

  //   setIsLoading(true)

  //   getReplyListByTopicId({
  //     topicId: topicId,
  //     pageNo: pageNo
  //   }).then(res => {
  //     if (res.data.code === 1) {
  //       let data = res.data.data

  //       setReplies([...replies, ...data.list])
  //       setHasMore(data._pageNo < data._totalPage ? true : false)
  //       setIsLoading(false)

  //       pageNo++
  //     } else {
  //       setIsLoading(false)
  //     }
  //   })
  // }

  function showModal(reply2?: IReply2): void {
    if (reply2) {
      setReply2(reply2)
    }

    setIsShowModal(true)
  }

  function onClose(): void {
    setIsShowModal(false)
  }

  function handleChange(value = ''): void {
    setReplyText(value)
  }

  function replySubmit(): void {
    if (!replyText) {
      toast('请输入内容哦……', 2, null, false)
      return
    }
    // console.log('text:', replyText)
    let data: IAddReplyData = {
      content: replyText,
      topicId: topic._id
    }
    if (reply2 && reply2.replyId) {
      data.replyId = reply2.replyId
      data.replyAuthor = {
        nickname: reply2.nickname,
        _id: reply2.authorId
      }
    }
    onClose()
    addReply(data).then(res => {
      if (res.data.code === 1) {
        toast('评论成功')
        setReplies([...replies, res.data.data])
        setReplyText('')
      } else {
        toast(res.data.msg)
      }
    })
  }

  function deleteReplyAjax(replyId: string, i: number) {
    deleteReply({
      replyId
    }).then(res => {
      if (res.data.code === 1) {
        toast('删除成功')
        setReplies([...replies.slice(0, i), ...replies.slice(i + 1)])
      } else {
        toast(res.data.msg)
      }
    })
  }

  let replyList: React.ReactElement | React.ReactElement[] =
    replies.length > 0 ? (
      replies.map((v, i) => {
        const isReplyOwner = userStore.userInfo._id === v.author._id

        const isCanDelete: boolean =
          userStore.isLogin &&
          (userStore.userInfo._id === author._id || isReplyOwner)

        return (
          <ReplyItem
            key={v._id}
            _id={v._id}
            author={v.author}
            createTime={v.createTime}
            index={i}
            deleteReply={deleteReplyAjax}
            showModal={showModal}
            isLogin={userStore.isLogin}
            isAuthor={v.author._id === author._id}
            content={v.content}
            replyAuthor={v.replyAuthor}
            isReplyOwner={isReplyOwner}
            isCanDelete={isCanDelete}
          />
        )
      })
    ) : (
      <div className="no-reply">暂无评论</div>
    )

  const tabName = topic.isNews ? '猫扑新闻' : tabs[topic.tab]

  return (
    <div className="topic-container">
      <div className="tab-title">{tabName}</div>
      <div className="topic-title">{topic.title}</div>
      <BaseTitleCard
        avatar={author.avatar}
        nickname={author.nickname}
        fromTime={fromTime}
      />
      <div
        className="topic-content"
        dangerouslySetInnerHTML={{ __html: topic.content }}
      ></div>
      <div className="reply-nav">
        <span className="line" />
        <span>这些回复亮了</span>
        {userStore.isLogin && (
          <BaseBtn
            style={{ marginLeft: 'auto' }}
            btnName="icon-release"
            size="btn"
            triggerHandle={showModal}
          />
        )}
      </div>
      <div className="reply-container">
        {replyList}
        {/* 加载更多组件 */}
        {replies.length > 0 && (
          <BaseLoadMore
            isLoading={isLoading}
            hasMore={hasMore}
            loadMoreHandle={getReplyList}
          />
        )}
      </div>
      <Modal
        visible={isShowModal}
        transparent
        closable={true}
        maskClosable={false}
        onClose={onClose}
        title="我来评论"
        footer={[
          {
            text: '提交',
            onPress: replySubmit
          }
        ]}
      >
        <TextareaItem
          autoHeight
          placeholder="说点什么……"
          title={reply2.nickname ? `@${reply2.nickname} ` : ''}
          value={replyText}
          onChange={handleChange}
        />
      </Modal>
    </div>
  )
}

export default observer(TopicDetail)
