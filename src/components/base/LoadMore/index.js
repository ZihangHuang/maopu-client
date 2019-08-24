import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const windowHeight = window.screen.height

class BaseLoadMore extends React.PureComponent {
  constructor(props) {
    super(props)
    this.timeAction = null
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandle)
  }

  callback = () => {
    const top = this.refs.wrapper.getBoundingClientRect().top
    if (top && top < windowHeight) {
      this.props.loadMoreHandle()
    }
  }

  scrollHandle = () => {
    if (this.props.isLoading || !this.props.hasMore) return

    if (this.timeAction) clearTimeout(this.timeAction)

    this.timeAction = setTimeout(this.callback, 50)
  }

  componetWillUnmout() {
    window.removeEventListener('scroll', this.scrollHandle)
  }

  render() {
    let text = ''
    if(this.props.hasMore) {
      text = this.props.isLoadingMore ? '获取中' : '加载更多'
    }else {
      text = '已经到底啦'
    }

    return (
      <div>
        <div className="load-more" ref="wrapper">
          <span>{text}</span>
        </div>
      </div>
    )
  }
}

BaseLoadMore.propTypes = {
  hasMore: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadMoreHandle: PropTypes.func
}

BaseLoadMore.defaultProps = {
  hasMore: true,
  isLoading: false,
  loadMoreHandle: () => {
    console.log('get data')
  }
}

export default BaseLoadMore
