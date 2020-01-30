/**
 * 自定义需要鉴权的路由组件
 */
import React, { useEffect, useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { storageName } from '../config'
import { authentication } from '../utils/proxy'
import { Context } from '../store'
import history from '../core/history'

interface IAuthRoute extends RouteProps {
  isRedict?: boolean
}

const AuthRoute: React.FC<IAuthRoute> = function(props) {
  const store = useContext(Context)
  const userStore = store!.userStore

  useEffect(() => {
    if (!userStore.isLogin) {
      authentication().then(res => {
        if (res.data.code === 1) {
          let token = localStorage.getItem(storageName)
          userStore.setToken(token!)
          userStore.getUserInfoByToken()
        }
      })
    }
  }, [])

  const { component: Component, ...rest } = props

  if (!Component) return null

  let isRedict = false

  if (props.isRedict === undefined) {
    if (!userStore.isLogin && history.location.pathname !== '/user') {
      isRedict = true
    }
  } else {
    isRedict = props.isRedict
  }

  return (
    <Route
      {...rest}
      render={props =>
        isRedict ? <Redirect to="/user" /> : <Component {...props} />
      }
    />
  )
}

export default AuthRoute
