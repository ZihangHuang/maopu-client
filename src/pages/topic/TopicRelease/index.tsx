import React, { useState } from 'react'
import { List, NavBar, InputItem, Picker } from 'antd-mobile'
import { RouteComponentProps } from 'react-router-dom'
import { createForm } from 'rc-form'
import { addTopic } from '../../../utils/proxy'
import { toast } from '../../../utils/tools'
import { tabs } from '../../../config'
// import SlateEditor from '../../../components/layout/SlateEditor'
import SimpleEditor from '../../../components/layout/SimpleEditor'
import { IAddTopicData } from '../../../types'

interface ITab {
  label: string
  value: string
}

const topicTabs: ITab[] = []

for (const key in tabs) {
  if (tabs[key]) {
    topicTabs.push({
      label: tabs[key],
      value: key
    })
  }
}

interface IProps extends RouteComponentProps {
  form: any
}

const TopicRelease: React.FC<IProps> = function(props) {
  const [content, setContent] = useState('')

  function cancel(): void {
    props.history.goBack()
  }

  function submit() {
    props.form.validateFields((error: any, value: any) => {
      // console.log(error, value)
      if (error) {
        const errKeys = Object.keys(error)
        if (errKeys.length > 0) {
          toast(error[errKeys[0]].errors[0].message)
          return
        }
      }

      if (!content) {
        toast('不能发表空白内容哦')
        return
      }
      let postData: IAddTopicData = {
        tab: value.tab[0],
        title: value.title,
        content
      }
      addTopic(postData).then(res => {
        if (res.data.code === 1) {
          toast('发布成功', 2, () => {
            props.history.push('/community')
          })
        }
      })
    })
  }

  const { getFieldProps } = props.form

  return (
    <div>
      <NavBar
        mode="light"
        leftContent={<span onClick={cancel}>取消</span>}
        rightContent={<span onClick={submit}>发布</span>}
      >
        发布图文
      </NavBar>

      <List>
        <Picker
          data={topicTabs}
          cols={1}
          {...getFieldProps('tab', {
            initialValue: [topicTabs[0].value]
          })}
          className="forss"
        >
          <List.Item arrow="horizontal">板块</List.Item>
        </Picker>
        <InputItem
          {...getFieldProps('title', {
            rules: [{ required: true, message: '请输入标题' }]
          })}
          placeholder="取个标题吧"
          type="text"
        />
        {/* <SlateEditor getContent={setContent} /> */}
        <SimpleEditor getContent={setContent}></SimpleEditor>
      </List>
    </div>
  )
}

export default createForm()(TopicRelease)
