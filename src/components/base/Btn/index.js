import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import PropTypes from 'prop-types'

function BaseBtn(props) {
  let btnSize = props.size || 'btn'
  let clickHandle = props.clickHandle || function(){}

  let linkBtn = <Link to={props.href || ''} className={btnSize + ' ' + props.btnName} style={props.style || {}}></Link>
  let normalBtn = <div className={btnSize + ' ' + props.btnName} onClick={clickHandle}  style={props.style || {}}></div>

  return props.href ? linkBtn : normalBtn
}

BaseBtn.propTypes = {
  size: PropTypes.string,
  href: PropTypes.string,
  btnName: PropTypes.string.isRequired,
  clickHandle: PropTypes.func
}

/**
 * example:
 * 链接:<BaseBtn key="2" href="/topic/release" btnName="icon-release" />
 * 按钮:<BaseBtn btnName="icon-link" clickHandle={this.onOpen.bind(this, 'isShowLinkModal')} size="btn-x"/>
 */
export default BaseBtn