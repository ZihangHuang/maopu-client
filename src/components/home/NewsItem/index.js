import React from 'react'
import PropTypes from 'prop-types'
import { createHashHistory } from 'history'
import './index.css'

const history = createHashHistory()

export default function NewsItem(props) {
  const info = props.info

  const goTopicDetail = () => {
    history.push(`/topic/detail/${info._id}`)
  }

  return (
    <div className="news-item" onClick={goTopicDetail}>
      <div className="news-title">
        {info.title}
      </div>
      <div>
        <img className="icon-s" src="/images/comment.png" alt="" />
        <span className="font-s-n">{info.replyCount}</span>
      </div>
    </div>
  )
}

NewsItem.propTypes = {
  info: PropTypes.object.isRequired
}
