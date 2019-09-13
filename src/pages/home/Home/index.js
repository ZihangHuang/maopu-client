import React from 'react'
import TopBar from '../../../components/layout/TopBar'
import BottomBar from '../../../components/layout/BottomBar'
import NewsItem from '../../../components/home/NewsItem'
import BaseLoadMore from '../../../components/base/LoadMore'
import { Carousel } from 'antd-mobile'
import { getNewsList } from '../../../utils/proxy'
// import { inject, observer } from 'mobx-react'

// @inject('rootStore')
// @observer
class Home extends React.Component {
  state = {
    newsList: [],
    data: ['1', '2', '3'],
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

    this.getNewsList()
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
    let newsList = this.state.newsList.map(v => <NewsItem info={v} />)

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
          {this.state.data.map(val => (
            <a
              key={val}
              href=""
              style={{
                display: 'inline-block',
                width: '100%',
                height: this.state.imgHeight
              }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'))
                  this.setState({ imgHeight: 'auto' })
                }}
              />
            </a>
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
