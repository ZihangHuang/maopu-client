import React from 'react'
import TopBar from '../../../components/layout/TopBar'
import BottomBar from '../../../components/layout/BottomBar'
import NewsItem from '../../../components/home/NewsItem'
import { Carousel } from 'antd-mobile'
// import { inject, observer } from 'mobx-react'

// @inject('rootStore')
// @observer
class Home extends React.Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      })
    }, 100)
  }

  render() {
    return <div className="home">
      <TopBar />
      <Carousel
        autoplay={false}
        infinite
        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={index => console.log('slide to', index)}
      >
        {this.state.data.map(val => (
          <a
            key={val}
            href=""
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
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
      <NewsItem />
      <NewsItem />
      <BottomBar />
    </div>
  }
}

export default Home
