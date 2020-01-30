import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TopBar from '../../../components/layout/TopBar'
import BottomBar from '../../../components/layout/BottomBar'
import NewsItem from '../../../components/home/NewsItem'
import BaseLoadMore from '../../../components/base/LoadMore'
import { Carousel } from 'antd-mobile'
import { getNewsList, getNewsHasFocusPic } from '../../../utils/proxy'
import { useAsyncFetch, HasMore } from '../../../hooks'
import { IRes } from '../../../types'
import './index.css'

const Home: React.FC = function() {
  const [newsList, setNewsList] = useState<any[]>([])
  const [focusList, setFocusList] = useState<any[]>([])
  const pageNoRef = useRef(1)

  function getNewsHasFocusPicAjax(): void {
    getNewsHasFocusPic().then(res => {
      if (res.data.code === 1) {
        setFocusList(res.data.data.list)
      }
    })
  }

  function getNewsListSuccess(res: IRes): HasMore {
    let hasMore: HasMore

    if (res.data.code === 1) {
      let data = res.data.data

      setNewsList(newsList => [...newsList, ...data.list])
      hasMore = data._pageNo < data._totalPage ? true : false
      pageNoRef.current += 1
    }

    return hasMore
  }

  const { isLoading, hasMore, run: getNewsListAjax } = useAsyncFetch(
    getNewsList,
    {
      onSuccess: getNewsListSuccess
    }
  )

  useEffect(() => {
    getNewsHasFocusPicAjax()
    getNewsListAjax()
  }, [])

  let newsItems = newsList.map(v => <NewsItem info={v} key={v._id} />)

  return (
    <div className="home">
      <TopBar />
      <Carousel
        autoplay
        autoplayInterval={3000}
        infinite
        dotStyle={{
          background: '#ccc'
        }}
        dotActiveStyle={{
          background: '#fff'
        }}
      >
        {focusList.map(val => (
          <Link
            key={val._id}
            to={`/topic/detail/${val._id}`}
            style={{
              position: 'relative',
              display: 'inline-block',
              width: '100%',
              height: 250
            }}
          >
            <img
              className="news-img"
              src={val.focusPic}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
              }}
            />
            <p className="carousel-text">{val.title}</p>
          </Link>
        ))}
      </Carousel>
      {newsItems}
      <BaseLoadMore
        isLoading={isLoading}
        hasMore={hasMore}
        loadMoreHandle={getNewsListAjax}
      />
      <BottomBar />
    </div>
  )
}

export default Home
