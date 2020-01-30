import React, { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

interface IProps {
  size?: string
  triggerHandle?: () => void
  href?: string | AnyObject
  btnName: string
  style?: AnyObject
  triggerType?: 'click' | 'mouseDown'
}

const BaseBtn: React.FC<IProps> = function(props) {
  let btnSize = props.size || 'btn'
  function triggerHandleFn(e: React.MouseEvent) {
    if (props.triggerHandle) {
      e.preventDefault()
      props.triggerHandle()
    }
  }

  let triggerType = props.triggerType || 'click'

  let linkBtn = (
    <Link
      to={props.href || ''}
      className={btnSize + ' ' + props.btnName}
      style={props.style || {}}
    />
  )

  let clickBtn = (
    <div
      className={btnSize + ' ' + props.btnName}
      onClick={triggerHandleFn}
      style={props.style || {}}
    ></div>
  )

  let mouseDownBtn = (
    <div
      className={btnSize + ' ' + props.btnName}
      onMouseDown={triggerHandleFn}
      style={props.style || {}}
    ></div>
  )

  return props.href
    ? linkBtn
    : triggerType === 'click'
    ? clickBtn
    : mouseDownBtn
}

/**
 * example:
 * 链接:<BaseBtn key="2" href="/topic/release" btnName="icon-release" />
 * 按钮:<BaseBtn btnName="icon-link" triggerHandle={this.onOpen.bind(this, 'isShowLinkModal')} size="btn-x"/>
 */
export default BaseBtn
