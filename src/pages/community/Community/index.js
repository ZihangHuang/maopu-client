import React from 'react'
// import { inject, observer } from 'mobx-react'
import TopBar from '../../../components/layout/TopBar'
import { ListView } from 'antd-mobile'
import { getTopicList } from '../../../utils/proxy'

const tabs = {
  news: '新闻',
  street: '步行街',
  default: '话题圈'
}

class Community extends React.Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.rowNo = 0
    this.pageIndex = 0

    this.state = {
      dataList: [],
      dataSource,
      isLoading: true
    }
  }

  genData(rowNum) {
    const dataBlob = {}
    for (let i = 0; i < rowNum; i++) {
      const ii = this.rowNo + i
      dataBlob[`${ii}`] = `row - ${ii}`
    }
    this.rowNo += rowNum
    return dataBlob
  }

  getTopicList() {
    this.setState({ isLoading: true })
    getTopicList({ pageNo: ++this.pageIndex }).then(res => {
      if (res.data.code === 1) {
        let rowLength = res.data.data.list.length
        this.pageIndex = res.data.data._pageNo
        this.rData = {...this.rData, ...this.genData(rowLength)}
        let hasMore =  res.data.data._totalPage > this.pageIndex ? true : false
        //let newList = this.state.dataList.concat(res.data.data.list)
        
        this.setState({
          dataList: res.data.data.list,
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
          hasMore: hasMore
        })
      } else {
        this.setState({ isLoading: false })
      }
    })
  }

  componentDidMount() {
    this.getTopicList()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource)
      })
    }
  }

  onEndReached = event => {
    if (this.state.isLoading || !this.state.hasMore) {
      return
    }
    console.log('reach end', event)
    this.getTopicList()
  }
  
  goTopicDetail = _id => {
    this.props.history.push(`/topic/detail/${_id}`)
  }

  render() {
    const separator = (sectionID, rowID) => {
      if (this.state.dataList.length < 2) {
        return null
      }
      return (
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
    }

    let index = 0
    const row = (rowData, sectionID, rowID) => {
      if (index > this.state.dataList.length - 1) {
        index = 0
      }
      const obj = this.state.dataList[index++]
      return (
        <div key={rowID} style={{ padding: '0 15px' }} onClick={this.goTopicDetail.bind(this, obj._id)}>
          <div
            style={{
              paddingTop: '5px'
            }}
          >
            <div>
              <img
                style={{
                  height: '12px',
                  marginRight: '10px',
                  borderRadius: '2px',
                  verticalAlign: 'middle'
                }}
                src={obj.author.avatar}
                alt=""
              />
              <span
                style={{
                  fontSize: '12px',
                  color: '#707070',
                  marginRight: '10px'
                }}
              >
                {tabs[obj.tab]}
              </span>
              <span className="font-s-n">
                {obj.author.nickname}
              </span>
            </div>
            <div style={{ lineHeight: 1, padding: '5px 0' }}>
              <div style={{ marginTop: '2px' }}>{obj.title}</div>
              <div>
                <img
                  className="icon-s"
                  src="/images/comment.png"
                  alt=""
                />
                <span className="font-s-n">
                  {obj.replyCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <TopBar />
        <ListView
          ref={el => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? '获取中...' : '已经到底啦'}
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
      </div>
    )
  }
}

export default Community
