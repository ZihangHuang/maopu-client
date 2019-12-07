import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import './index.css'
import commentSrc from '../../../assets/images/comment.png'

function NewsItem(props) {
  const info = props.info

  const goTopicDetail = () => {
    props.history.push(`/topic/detail/${info._id}`)
  }

  return (
    <div className="news-item" onClick={goTopicDetail}>
      <div className="news-title">
        {info.title}
      </div>
      <div>
        <img className="icon-s" src={commentSrc} alt="" />
        <span className="font-s-n">{info.replyCount}</span>
      </div>
    </div>
  )
}

NewsItem.propTypes = {
  info: PropTypes.object.isRequired
}

export default withRouter(NewsItem)