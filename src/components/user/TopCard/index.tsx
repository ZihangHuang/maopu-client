import React from 'react'
import { Link } from 'react-router-dom'
import { Card, WhiteSpace } from 'antd-mobile'
import { IUserInfo } from '../../../types'

import './index.css'

interface IProps {
  isLogin: boolean
  userInfo: IUserInfo
}

const TopCard: React.FC<IProps> = function(props) {
  let content = props.isLogin ? (
    <Card full>
      <Card.Header
        title={props.userInfo.nickname}
        thumb={props.userInfo.avatar}
        thumbStyle={{ width: 32, height: 32 }}
        extra={
          <Link to="/user/edit" className="link">
            编辑个人资料
          </Link>
        }
      />
      <Card.Body>
        <div>{props.userInfo.signature}</div>
      </Card.Body>
      <Card.Footer
        content={'等级：' + props.userInfo.level}
        extra={<div>{'声望：' + props.userInfo.reputation}</div>}
      />
    </Card>
  ) : (
    <div className="login-box">
      <Link to="/login" className="login-btn" />
      <div className="text-center">去登陆</div>
      <div className="text-right">
        <Link to="/register" className="link">
          没有账号？
        </Link>
        <WhiteSpace />
      </div>
    </div>
  )

  return <div className="top-card">{content}</div>
}

export default TopCard
