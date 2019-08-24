import React from 'react'
import PropTypes from 'prop-types'

export default function BaseTitileCard(props) {
  let avatar =
    props.avatar ||
    'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg'
  let nickname = props.nickname || '昵称'
  let fromTime = props.fromTime || ''
  let size = props.size || 30

  return (
    <div
      style={{
        padding: '10px 0',
        display: 'flex'
      }}
    >
      <img
        style={{
          height: `${size}px`,
          marginRight: '10px',
          borderRadius: '2px',
          verticalAlign: 'middle'
        }}
        src={avatar}
        alt=""
      />
      <div style={{ lineHeight: '16px', padding: '0' }}>
        <div style={{ fontSize: '14px' }}>{nickname} {props.children}</div>
        <div style={{ lineHeight: '14px', fontSize: '12px', color: '#8a8a8a' }}>
          {fromTime}
        </div>
      </div>
    </div>
  )
}

BaseTitileCard.propTypes = {
  avatar: PropTypes.string,
  nickname: PropTypes.string,
  fromTime: PropTypes.string
}
