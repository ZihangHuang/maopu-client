import React from 'react'
import { inject, observer } from 'mobx-react'
import { ListView } from 'antd-mobile'

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: `McDonald's invites you`,
    des: '不是所有的兼职汪都需要风吹日晒'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒'
  }
]
const NUM_ROWS = 10
let pageIndex = 0

function genData(pIndex = 0) {
  const dataBlob = {}
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = pIndex * NUM_ROWS + i
    dataBlob[`${ii}`] = `row - ${ii}`
  }
  //console.log(dataBlob)
  return dataBlob
}

@inject('rootStore')
@observer
class Home extends React.Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      dataList: [],
      dataSource,
      isLoading: true
    }
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData()
      this.setState({
        dataList: data,
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      })
    }, 600)
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource)
      })
    }
  }

  onEndReached = event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    console.log('reach end', event)
    this.setState({ isLoading: true })
    setTimeout(() => {
      let newData = genData(++pageIndex)
      this.rData = { ...this.rData, ...newData }
      this.setState({
        dataList: data,
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      })
    }, 1000)
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED'
        }}
      />
    )
    let index = this.state.dataList.length - 1
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = this.state.dataList.length - 1
      }
      const obj = this.state.dataList[index--]
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              display: '-webkit-box',
              display: 'flex',
              padding: '15px 0'
            }}
          >
            <img
              style={{ height: '64px', marginRight: '15px' }}
              src={obj.img}
              alt=""
            />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                {obj.des}
              </div>
              <div>
                <span style={{ fontSize: '30px', color: '#FF6E27' }}>
                  {rowID}
                </span>
                ¥
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>猫扑新闻</span>}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>
        )}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        useBodyScroll
        onScroll={() => {
          //console.log('scroll')
        }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    )
  }
}

export default Home
