import React from 'react'
import {
  List,
  // TextareaItem,
  NavBar,
  InputItem,
  Picker,
} from 'antd-mobile'
import { createForm } from 'rc-form'
import { releaseTopic } from '../../../utils/proxy'
import { toast } from '../../../utils/tools'
import { tabs } from '../../../config'
import MyEditor from '../../../components/layout/MyEditor'

const topicTabs = []

for (let key in tabs) {
  topicTabs.push({
    label: tabs[key],
    value: key
  })
}

class ReleaseText extends React.Component {
  state = {
    content: ''
  }

  back = () => {
    this.props.history.goBack()
  }

  submit = () => {
    let t = this
    this.props.form.validateFields((error, value) => {
      //console.log(error, value)
      if (error) {
        let errKeys = Object.keys(error)
        if (errKeys.length > 0) {
          toast(error[errKeys[0]].errors[0].message)
          return
        }
      }
      let content = t.state.content
      if(!content) {
        toast('不能发表空白内容哦')
        return
      }
      let postData = {
        tab: value.tab[0],
        title: value.title,
        content
      }
      releaseTopic(postData).then(res => {
        if (res.data.code === 1) {
          toast('发布成功', 2, () => {
            t.props.history.push('/community')
          })
        }
      })
    })
  }
  
  /**
   * 获取MyEditor组件的编辑内容，并写入content
   * @param  {[type]} content [description]
   */
  getContent = content => {
    this.setState({
      content
    })
  }

  render() {
    const { getFieldProps } = this.props.form

    return (
      <div>
        <NavBar
          mode="light"
          leftContent={<span onClick={this.back}>取消</span>}
          rightContent={<span onClick={this.submit}>发布</span>}
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
          <MyEditor getContent={this.getContent}/>
        </List>
      </div>
    )
  }
}

const ReleaseTextPage = createForm()(ReleaseText)
export default ReleaseTextPage
