import React from 'react'
import { Flex } from 'antd-mobile'
import { NavLink } from 'react-router-dom'
import './index.css'

function BottomBar() {
  return (
    <div className="flex-container bottom-bar">
      <Flex>
        <Flex.Item>
          <NavLink
            to="/"
            activeClassName="nav-home-active"
            className="nav-item nav-home"
            exact
          >
            首页
          </NavLink>
        </Flex.Item>
        <Flex.Item>
          <NavLink
            to="/community"
            activeClassName="nav-community-active"
            className="nav-item nav-community"
          >
            社区
          </NavLink>
        </Flex.Item>
        <Flex.Item>
          <NavLink
            to="/user"
            activeClassName="nav-user-active"
            className="nav-item nav-user"
          >
            我的
          </NavLink>
        </Flex.Item>
        {/* <Flex.Item>
          <NavLink to="/more" activeClassName="nav-more-active" className="nav-item nav-more">
            更多
          </NavLink>
        </Flex.Item> */}
      </Flex>
    </div>
  )
}

export default BottomBar
