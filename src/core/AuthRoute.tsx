/**
 * 自定义需要鉴权的路由组件
 */
import React, { useEffect, useContext, useState } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { storageName } from '../config'
import { authentication } from '../utils/proxy'
import { Context } from '../store'
import history from '../core/history'

export function Loading() {
  return <div>loading</div>
}


interface IAuthRoute extends RouteProps {
  isRedict?: boolean
}

const AuthRoute: React.FC<IAuthRoute> = function(props) {
  const store = useContext(Context)
  const userStore = store!.userStore

  const [isRedict, setIsRedict] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    if (props.isRedict === undefined) {
      if (!userStore.isLogin && history.location.pathname !== '/user') {
        authentication().then(res => {
          if (res.data.code === 1) {
            let token = localStorage.getItem(storageName)
            userStore.setToken(token!)
            userStore.getUserInfoByToken()

            setIsFinished(true)
          } else {
            // 两者的顺序很重要，如果先setIsFinished(true)，那么这时isRedict还是等于false，会先加载<Component {...props} />，
            // 进行一些无必要的初始化和请求等，所以要先setIsRedict(true)，使得setIsRedict(true)时可以马上跳转到user页
            setIsRedict(true)
            setIsFinished(true)
          }
        })
      }else {
        setIsFinished(true)
      }
    } else {
      setIsRedict(props.isRedict)
      setIsFinished(true)
    }
  }, [])

  const { component: Component, ...rest } = props

  if (!Component) return null

  return <Route {...rest} render={props => !isFinished ? <Loading /> : isRedict ? <Redirect to="/user" /> : <Component {...props} />} />
}

export default AuthRoute
