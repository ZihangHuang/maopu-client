import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import './index.css'
import commentSrc from '../../../assets/images/comment.png'

interface IINfo {
  _id: string
  title: string
  replyCount: number
}

interface IProps extends RouteComponentProps {
  info: IINfo
}

const NewsItem: React.FC<IProps> = function NewsItem(props) {
  const info = props.info

  const goTopicDetail = () => {
    props.history.push(`/topic/detail/${info._id}`)
  }

  return (
    <div className="news-item" onClick={goTopicDetail}>
      <div className="news-title">{info.title}</div>
      <div>
        <img className="icon-s" src={commentSrc} alt="" />
        <span className="font-s-n">{info.replyCount}</span>
      </div>
    </div>
  )
}

export default withRouter(NewsItem)
