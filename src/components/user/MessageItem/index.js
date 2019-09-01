import React from 'react'
import PropTypes from 'prop-types'
import { createHashHistory } from 'history'
import './index.css'

const history = createHashHistory()

export default function MessageItem(props) {
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
          [帖子]<span className="link">{topic.title}</span>提到了你
          <span className="time">
            {props.createTime}
          </span>
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
                引用 @<span className="link">{props.reply1.author.nickname}</span>发表的
              </div>
              <div>{props.reply1.content}</div>
            </div>
            <div style={{ lineHeight: '20px' }}>{props.reply.content}</div>
          </div>
        </div>
      </div>
    )
  } else if (type === 'reply') {
    item = (
      <div className="title-bar">
        [帖子]<span className="link">{topic.title}</span>新增一回复
        <span className="time ">
          {props.createTime}
        </span>
      </div>
    )
  }

  const goTopicDetail = () => {
    history.push(`/topic/detail/${props.topic._id}`)
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

MessageItem.propTypes = {
  type: PropTypes.string,
  topic: PropTypes.object.isRequired,
  createTime: PropTypes.string.isRequired,
  reply: PropTypes.object.isRequired,
  reply1: PropTypes.object //如果type是reply2（二级回复），则存在reply1
}
