import React from 'react'

interface IProps {
  avatar?: string
  nickname?: string
  fromTime?: string
  size?: number
}

const BaseTitileCard: React.FC<IProps> = function BaseTitileCard(props) {
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
        <div style={{ fontSize: '14px' }}>
          {nickname} {props.children}
        </div>
        <div style={{ lineHeight: '14px', fontSize: '12px', color: '#8a8a8a' }}>
          {fromTime}
        </div>
      </div>
    </div>
  )
}

export default BaseTitileCard
