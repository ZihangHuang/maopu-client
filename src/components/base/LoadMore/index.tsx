import React, { useRef, useEffect } from 'react'
import './index.css'

const windowHeight = window.screen.height

interface IProps {
  loadMoreHandle?: () => void
  hasMore?: boolean
  isLoading?: boolean
}

const BaseLoadMore: React.FC<IProps> = function({
  loadMoreHandle,
  isLoading = false,
  hasMore = true
}) {
  const timeRef = useRef<ReturnType<typeof setTimeout>>()
  const loadMoreEl = useRef<HTMLDivElement>(null)

  function callback() {
    const top = loadMoreEl.current!.getBoundingClientRect().top
    if (top && top < windowHeight) {
      loadMoreHandle && loadMoreHandle()
    }
  }

  useEffect(() => {
    function scrollHandle() {
      if (isLoading || !hasMore) return

      if (timeRef.current) clearTimeout(timeRef.current)

      timeRef.current = setTimeout(callback, 50)
    }

    window.addEventListener('scroll', scrollHandle)

    return () => {
      window.removeEventListener('scroll', scrollHandle)
    }
  })

  let text = ''
  if (hasMore) {
    text = isLoading ? '获取中' : '加载更多'
  } else {
    text = '已经到底啦'
  }

  return (
    <div className="load-more" ref={loadMoreEl}>
      <span>{text}</span>
    </div>
  )
}

export default BaseLoadMore
