import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import BaseBtn from '../../base/Btn'

function TopBar() {
  return (
    <NavBar
      mode="light"
      leftContent={<img className="logo" src="/images/logo.png"/>}
      rightContent={[
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <BaseBtn key="2" href="/topic/release" btnName="icon-release" />
      ]}
    >
      
    </NavBar>
  )
}

export default TopBar
