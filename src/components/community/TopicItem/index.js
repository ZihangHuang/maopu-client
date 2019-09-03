import React from 'react'
import { tabs } from '../../../config'
import PropTypes from 'prop-types'
import { createHashHistory } from 'history'
const history = createHashHistory()

export default function TopicItem(props) {
  const obj = props.obj

  const goTopicDetail = () => {
    history.push(`/topic/detail/${obj._id}`)
  }

  return (
    <div
      style={{ padding: '0 15px' }}
      onClick={goTopicDetail}
    >
      <div
        style={{
          paddingTop: '5px'
        }}
      >
        <div>
          <img
            style={{
              height: '12px',
              marginRight: '10px',
              borderRadius: '2px',
              verticalAlign: 'middle'
            }}
            src={obj.author.avatar}
            alt=""
          />
          <span
            style={{
              fontSize: '12px',
              color: '#707070',
              marginRight: '10px'
            }}
          >
            {tabs[obj.tab] || '话题圈'}
          </span>
          <span className="font-s-n">{obj.author.nickname}</span>
        </div>
        <div style={{ lineHeight: 1, padding: '5px 0' }}>
          <div style={{ marginTop: '2px' }}>{obj.title}</div>
          <div>
            <img className="icon-s" src="/images/comment.png" alt="" />
            <span className="font-s-n">{obj.replyCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

TopicItem.propTypes = {
  obj: PropTypes.object.isRequired
}