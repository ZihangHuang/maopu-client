import React from 'react'
import TopBar from '../../../components/layout/TopBar'
// import { inject, observer } from 'mobx-react'

// @inject('rootStore')
// @observer
class Home extends React.Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    return <div>
      <TopBar />
    </div>
  }
}

export default Home