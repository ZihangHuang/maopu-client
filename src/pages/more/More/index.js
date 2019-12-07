import React from 'react'
import { inject, observer } from 'mobx-react'
import BottomBar from '../../../components/layout/BottomBar'

@inject('rootStore')
@observer
class More extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>暂无内容</h1>
        <BottomBar />
      </div>
    )
  }
}

export default More
