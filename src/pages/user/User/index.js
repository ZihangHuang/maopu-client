import React from 'react'
import { inject, observer } from 'mobx-react'
import './index.css'
import TopCard from '../../../components/user/TopCard'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile'
// import { Link } from 'react-router-dom'

@inject('rootStore')
@observer
class MyPage extends React.Component {
  componentDidMount() {
    let { userStore } = this.props.rootStore
    userStore.checkLogin(true)
  }
  logout = () => {
    let { userStore } = this.props.rootStore
    userStore.logout()
  }

  render() {
    let { userStore } = this.props.rootStore
    
    let logoutBtn = userStore.isLogin ? (
      <WingBlank>
        <WhiteSpace />
        <Button type="primary" onClick={this.logout}>
          退出登陆
        </Button>
      </WingBlank>
    ) : (
      <WingBlank/>
    )
    return (
      <div className="page">
        <TopCard userInfo={userStore.userInfo} isLogin={userStore.isLogin} />
        {logoutBtn}
      </div>
    )
  }
}

export default MyPage
