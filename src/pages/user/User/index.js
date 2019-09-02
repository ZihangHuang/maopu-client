import React from 'react'
import { inject, observer } from 'mobx-react'
import './index.css'
import BottomBar from '../../../components/layout/BottomBar'
import TopCard from '../../../components/user/TopCard'
import { Button, Badge, WingBlank } from 'antd-mobile'
import BaseBtn from '../../../components/base/Btn'
// import { Link } from 'react-router-dom'
import { getUnReadMessagesCount } from '../../../utils/proxy'

@inject('rootStore')
@observer
class MyPage extends React.Component {
  state = {
    unReadMessagesCount: 0
  }

  componentDidMount() {
    let t = this
    let { userStore } = t.props.rootStore
    userStore.checkLogin(true).then(userInfo => {
      if (userInfo) {
        getUnReadMessagesCount({
          userId: userInfo._id
        }).then(res => {
          if (res.data.code === 1) {
            t.setState({
              unReadMessagesCount: res.data.data.count
            })
          }
        })
      }
    })
  }
  logout = () => {
    let { userStore } = this.props.rootStore
    userStore.logout()
  }

  render() {
    let { userStore } = this.props.rootStore
    let unReadMessagesCount = this.state.unReadMessagesCount

    let logoutBtn = userStore.isLogin ? (
      <div>
        <div className="btn-bar">
          <Badge text={unReadMessagesCount} overflowCount={10}>
            <BaseBtn
              btnName="icon-message"
              size="btn-x"
              href={{
                pathname: '/message',
                state: { isSetHasRead: unReadMessagesCount ? true : false }
              }}
            />
          </Badge>
        </div>
        <WingBlank>
          <Button type="primary" onClick={this.logout}>
            退出登陆
          </Button>
        </WingBlank>
      </div>
    ) : (
      <WingBlank />
    )
    return (
      <div className="page">
        <TopCard userInfo={userStore.userInfo} isLogin={userStore.isLogin} />
        {logoutBtn}
        <BottomBar />
      </div>
    )
  }
}

export default MyPage
