import React from 'react'
import PropTypes from 'prop-types'
// import { createHashHistory } from 'history'
import './index.css'

// const history = createHashHistory()

export default function NewsItem(props) {
  // const obj = props.obj

  const goTopicDetail = () => {
    //history.push(`/topic/detail/${obj._id}`)
  }

  return (
    <div
      className="news-item"
      onClick={goTopicDetail}
    >
      <div className="left-box">
        <div className="news-title">新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题</div>
        <div>
          <img className="icon-s" src="/images/comment.png" alt="" />
          <span className="font-s-n">12</span>
        </div>
      </div>
      <img src="https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png" alt="" className="right-box"/>
    </div>
  )
}

NewsItem.propTypes = {
  obj: PropTypes.object.isRequired
}