/**
 * 自定义需要鉴权的路由父组件
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { storageName } from './config'
import { authentication } from './utils/proxy'

@inject('rootStore')
@observer
class AuthRouter extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    let t = this
    let { userStore } = t.props.rootStore
    // console.log('isLogin1:', userStore.isLogin)
    if (!userStore.isLogin) {
      authentication().then(res => {
        if (res.data.code === 1) {
          let token = localStorage.getItem(storageName)
          userStore.setToken(token)
          userStore.getUserInfoByToken()
          // console.log('isLogin2:', userStore.isLogin)
        }
      })
    }
  }

  render() {
    const { component: Component, ...rest } = this.props
    let { userStore } = this.props.rootStore
    // let isLogin = userStore.isLogin
    //console.log('isLogin3:', userStore.isLogin)
    return (
      <Route
        {...rest}
        render={props =>
          userStore.isLogin ? <Component {...props} /> : <Redirect to="/user" />
        }
      />
    )
  }
}

export default withRouter(AuthRouter)
