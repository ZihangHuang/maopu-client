import React, { MouseEvent } from 'react'
import BaseTitleCard from '../../base/TitleCard'
import { setFormatDate } from '../../../utils/tools'
import { Badge } from 'antd-mobile'
import replySrc from '../../../assets/images/reply.png'
import './index.css'

interface IAuthor {
  _id: string
  avatar: string
  nickname: string
  username?: string
}

interface IReplyAuthor {
  _id: string
  nickname?: string
}

interface IReply2 {
  authorId: number | string
  nickname: string
  replyId: number | string
}

interface IProps {
  _id: string
  index: number
  author: IAuthor
  createTime: string
  replyAuthor?: IReplyAuthor
  content: any
  isAuthor: boolean // 是否楼主
  isLogin: boolean
  isReplyOwner: boolean
  isCanDelete: boolean
  deleteReply: (replyId: string, i: number) => void
  showModal(reply2?: IReply2): void
}

const Reply: React.FC<IProps> = function({
  _id,
  author,
  createTime,
  index,
  isAuthor,
  isLogin,
  showModal,
  deleteReply,
  replyAuthor,
  content,
  isReplyOwner,
  isCanDelete
}) {
  function showModalHandle(e: MouseEvent): void {
    e.preventDefault()

    showModal({
      authorId: author._id,
      nickname: author.nickname,
      replyId: _id
    })
  }

  return (
    <div className="reply2-box" key={_id.slice(-3)}>
      <BaseTitleCard
        size={20}
        avatar={author.avatar}
        nickname={author.nickname}
        fromTime={setFormatDate(createTime, true)}
      >
        <span className="fc-blue">{index + 1}楼 </span>
        {isAuthor ? (
          <Badge
            text="楼主"
            style={{
              marginLeft: 12,
              padding: '0 3px',
              backgroundColor: '#21b68a',
              borderRadius: 2
            }}
          />
        ) : (
          ''
        )}
      </BaseTitleCard>
      <div className="reply-bar">
        {isCanDelete && (
          <span
            onClick={() => {
              deleteReply(_id, index)
            }}
            className="reply2-delete-btn"
          >
            删除
          </span>
        )}
        <img
          src={replySrc}
          alt=""
          className="icon-m reply2-add-btn"
          title="回复"
          onClick={showModalHandle}
        />
      </div>

      <div className="topic-reply">
        {replyAuthor && replyAuthor.nickname && (
          <span className="fc-blue">@{replyAuthor.nickname} </span>
        )}
        <span>{content}</span>
      </div>
    </div>
  )
}

export default Reply
