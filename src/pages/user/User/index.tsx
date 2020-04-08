import React, { useState, useEffect, useContext } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../store'
import BottomBar from '../../../components/layout/BottomBar'
import TopCard from '../../../components/user/TopCard'
import { Button, Badge, WingBlank } from 'antd-mobile'
import BaseBtn from '../../../components/base/Btn'
import { getUnReadMessagesCount, authentication } from '../../../utils/proxy'
import { IUserInfo } from '../../../types'
import { storageName } from '../../../config'
import './index.css'

const UserPage: React.FC = function() {
  const [unReadMessagesCount, setUnReadMessagesCount] = useState(0)

  const store = useContext(Context)
  const userStore = store!.userStore

  useEffect(() => {
    if (userStore.isLogin) {
      if (userStore.userInfo) {
        getUnReadMessagesCount({
          userId: (userStore.userInfo as IUserInfo)._id
        }).then(res => {
          if (res.data.code === 1) {
            setUnReadMessagesCount(res.data.data.count)
          }
        })
      }
    } else {
      authentication().then(res => {
        if (res.data.code === 1) {
          let token = localStorage.getItem(storageName)
          userStore.setToken(token!)
          userStore.getUserInfoByToken()
        }
      })
    }
  }, [])

  function logout() {
    userStore.logout()
  }

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
        <Button type="primary" onClick={logout}>
          退出登陆
        </Button>
      </WingBlank>
    </div>
  ) : (
    <WingBlank />
  )

  return (
    <div className="page">
      <TopCard
        userInfo={toJS(userStore.userInfo)}
        isLogin={userStore.isLogin}
      />
      {logoutBtn}
      <BottomBar />
    </div>
  )
}

export default observer(UserPage)
