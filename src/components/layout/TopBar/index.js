import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import BaseBtn from '../../base/Btn'
import logoSrc from '../../../assets/images/logo.png'

function TopBar() {
  return (
    <NavBar
      mode="light"
      leftContent={<img className="logo" src={logoSrc}/>}
      rightContent={[
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <BaseBtn key="2" href="/topic/release" btnName="icon-release" />
      ]}
    >
      
    </NavBar>
  )
}

export default TopBar
