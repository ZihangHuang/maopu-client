import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { setFormatDate } from '../../../utils/tools'
import './index.css'

interface IProps extends RouteComponentProps {
  reply: AnyObject
  createTime: string
  size?: number
  topic: AnyObject
  type?: 'reply' | 'reply2'
  reply1?: AnyObject
}

const MessageItem: React.FC<IProps> = function(props) {
  if (!props.reply) {
    return (
      <div
        style={{
          padding: '10px',
          borderBottom: '1px solid #ccc',
          textAlign: 'center'
        }}
      >
        该评论已经被删除了
      </div>
    )
  }

  let type = props.type || 'reply2' //reply:帖子一级回复，reply2:二级回复

  let author = props.reply.author
  let avatar =
    author.avatar ||
    'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg'
  let nickname = author.nickname || '昵称'

  let size = props.size || 30
  let topic = props.topic

  let item
  if (type === 'reply2') {
    item = (
      <div>
        <div className="title-bar ">
          <span className="tabname">[帖子]</span>
          <span className="link">{topic.title}</span>
          <span className="tips">[提到了你]</span>
          <span className="time">{props.createTime}</span>
        </div>
        <div style={{ display: 'flex', lineHeight: '16px', paddingTop: '5px' }}>
          <img
            style={{
              height: `${size}px`,
              marginRight: '10px',
              borderRadius: '2px',
              verticalAlign: 'middle'
            }}
            src={avatar}
            alt=""
          />
          <div style={{ width: '100%' }}>
            <div style={{ fontSize: '16px' }}>{nickname}</div>
            <div
              style={{
                lineHeight: '14px',
                fontSize: '12px',
                background: '#dbdbdb',
                padding: '5px'
              }}
            >
              <div>
                引用 @
                <span className="link">
                  {props.reply1 ? props.reply1.author.nickname : ''}
                </span>
                发表的
              </div>
              <div>{props.reply1 ? props.reply1.content : ''}</div>
            </div>
            <div style={{ lineHeight: '20px' }}>{props.reply.content}</div>
          </div>
        </div>
      </div>
    )
  } else if (type === 'reply') {
    item = (
      <div className="title-bar">
        <span className="tabname">[帖子]</span>
        <span className="link">{topic.title}</span>
        <span className="tips">[新增一回复]</span>
        <span className="time">
          {setFormatDate(props.reply.createTime, true)}
        </span>
      </div>
    )
  }

  const goTopicDetail = () => {
    props.history.push(`/topic/detail/${props.topic._id}`)
  }

  return (
    <div
      style={{
        padding: '10px',
        borderBottom: '1px solid #ccc'
      }}
      onClick={goTopicDetail}
    >
      {item}
    </div>
  )
}

export default withRouter(MessageItem)
