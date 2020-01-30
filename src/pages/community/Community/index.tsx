import React, {
  useState,
  useRef,
  useEffect,
  ReactText,
  ReactElement
} from 'react'
import TopBar from '../../../components/layout/TopBar'
import BottomBar from '../../../components/layout/BottomBar'
import { ListView } from 'antd-mobile'
import { getTopicList } from '../../../utils/proxy'
import TopicItem from '../../../components/community/TopicItem'
import { IRes } from '../../../types'
import { useAsyncFetch } from '../../../hooks'

let pageIndex = 0
let index = 0

function genData(startNum: number, length: number): AnyObject {
  const dataBlob: AnyObject = {}

  for (let i = startNum; i < startNum + length; i++) {
    const ii = startNum + i
    dataBlob[`${ii}`] = `row - ${ii}`
  }

  return dataBlob
}

const Community: React.FC = function(props) {
  const [dataSource, setDataSource] = useState(
    new ListView.DataSource({
      rowHasChanged: (row1: any, row2: any) => row1 !== row2
    })
  )

  const rDataRef = useRef<AnyObject>({})

  // const [dataList, setDataList] = useState<any[]>([])
  const dataListRef = useRef<any[]>([])

  // const [isLoading, setIsLoading] = useState(true)
  // const [hasMore, setHasMore] = useState(true)

  function getTopicListSuccess(res: IRes) {
    let hasMore: boolean | undefined

    if (res.data.code === 1) {
      let rowLength = res.data.data.list.length
      pageIndex = res.data.data._pageNo

      const startNum = Object.keys(rDataRef.current).length
      const newDataBlob = genData(startNum, rowLength)

      rDataRef.current = { ...rDataRef.current, ...newDataBlob }

      hasMore = res.data.data._totalPage > pageIndex ? true : false

      dataListRef.current = [...dataListRef.current, ...res.data.data.list]

      setDataSource(dataSource.cloneWithRows(rDataRef.current))
    }
    return hasMore
  }

  const { isLoading, hasMore, run: getTopicListAjax } = useAsyncFetch(
    getTopicList,
    {
      onSuccess: getTopicListSuccess
    }
  )

  // function getTopicListAjax(): void {
  //   setIsLoading(true)
  //   getTopicList({ pageNo: ++pageIndex }).then(res => {
  //     if (res.data.code === 1) {
  //       let rowLength = res.data.data.list.length
  //       pageIndex = res.data.data._pageNo
  //       rDataRef.current = { ...rDataRef.current, ...genData(rowLength) }
  //       let hasMore = res.data.data._totalPage > pageIndex ? true : false

  //       setDataList(res.data.data.list)
  //       setDataSource(dataSource.cloneWithRows(rDataRef.current))
  //       setIsLoading(false)
  //       setHasMore(hasMore)
  //     } else {
  //       setIsLoading(false)
  //     }
  //   })
  // }
  useEffect(() => {
    pageIndex = 0
    index = 0
    getTopicListAjax({ pageNo: ++pageIndex })
  }, [])

  function onEndReached(event: Event): void {
    if (isLoading || !hasMore) {
      return
    }
    // console.log('reach end', event)

    getTopicListAjax({ pageNo: ++pageIndex })
  }

  function separator(sectionID: ReactText, rowID: ReactText): ReactElement {
    if (dataListRef.current.length < 2) {
      return <div key={`${sectionID}-${rowID}`}></div>
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

  function row(
    rowData: any,
    sectionID: ReactText,
    rowID: ReactText
  ): ReactElement {
    if (index > dataListRef.current.length - 1) {
      index = 0
    }
    const obj = dataListRef.current[index++]
    return <TopicItem key={rowID} obj={obj} />
  }

  let footerText = '下滑加载更多'

  if (isLoading) {
    footerText = '获取中...'
  } else if (!hasMore) {
    footerText = '已经到底啦'
  }
  return (
    <div>
      <TopBar />
      <ListView
        dataSource={dataSource}
        renderFooter={() => (
          <div style={{ marginBottom: 50, textAlign: 'center' }}>
            {footerText}
          </div>
        )}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        useBodyScroll
        onScroll={() => {
          // console.log('scroll')
        }}
        scrollRenderAheadDistance={500}
        onEndReached={onEndReached}
        onEndReachedThreshold={10}
      />
      <BottomBar />
    </div>
  )
}

export default Community
