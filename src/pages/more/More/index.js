import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('rootStore')
@observer
class More extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}

  render() {
    return (
      <div>More</div>
    )
  }
}

export default More
