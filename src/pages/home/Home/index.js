import React from 'react'
import { Link } from 'react-router-dom'
import TopBar from '../../../components/layout/TopBar'
import BottomBar from '../../../components/layout/BottomBar'
import NewsItem from '../../../components/home/NewsItem'
import BaseLoadMore from '../../../components/base/LoadMore'
import { Carousel } from 'antd-mobile'
import { getNewsList, getNewsHasFocusPic } from '../../../utils/proxy'
// import { inject, observer } from 'mobx-react'

// @inject('rootStore')
// @observer
class Home extends React.Component {
  state = {
    newsList: [],
    focusList: [],
    imgHeight: 176,
    isLoading: false,
    hasMore: true
  }

  pageNo = 1

  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: [
          'AiyWuByWklrrUDlFignR',
          'TekJlZRVCjLFexlOCuWn',
          'IJOtIlfsYdTyaDTRVrLI'
        ]
      })
    }, 100)
    
    this.getNewsHasFocusPic()
    this.getNewsList()
  }

  getNewsHasFocusPic() {
    let t = this
    getNewsHasFocusPic().then(res => {
      if (res.data.code === 1) {
        t.setState({
          focusList: res.data.data.list
        })
      }
    })
  }

  getNewsList() {
    let t = this
    if (t.state.isLoading || !t.state.hasMore) return

    t.setState({
      isLoading: true
    })

    getNewsList().then(res => {
      if (res.data.code === 1) {
        let data = res.data.data
        t.setState({
          newsList: [...t.state.newsList, ...data.list],
          hasMore: data._pageNo < data._totalPage ? true : false,
          isLoading: false
        })
        t.pageNo++
      } else {
        t.setState({
          isLoading: false
        })
      }
    })
  }

  render() {
    let newsList = this.state.newsList.map(v => <NewsItem info={v} key={v._id}/>)

    return (
      <div className="home">
        <TopBar />
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) =>
            console.log(`slide from ${from} to ${to}`)
          }
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.focusList.map(val => (
            <Link
              key={val._id}
              to={`/topic/detail/${val._id}`}
              style={{
                display: 'inline-block',
                width: '100%',
                height: this.state.imgHeight
              }}
            >
              <img
                src={val.focusPic}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'))
                  this.setState({ imgHeight: 'auto' })
                }}
              />
            </Link>
          ))}
        </Carousel>
        {newsList}
        <BaseLoadMore
          isLoading={this.state.isLoading}
          hasMore={this.state.hasMore}
          loadMoreHandle={this.getNewsList}
        />
        <BottomBar />
      </div>
    )
  }
}

export default Home
