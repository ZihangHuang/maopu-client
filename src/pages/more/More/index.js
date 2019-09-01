import React from 'react'
import { inject, observer } from 'mobx-react'
import BottomBar from '../../../components/layout/BottomBar'

@inject('rootStore')
@observer
class More extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        More
        <BottomBar />
      </div>
    )
  }
}

export default More
