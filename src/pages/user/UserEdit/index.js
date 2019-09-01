import React from 'react'
import { List, InputItem, Button, Flex, ImagePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import { inject, observer } from 'mobx-react'
import { updateUser, getQiniuToken } from '../../../utils/proxy'
import { toast } from '../../../utils/tools'
import { uploadBase64 } from '../../../utils/qiniu-handle'

const Item = List.Item

@inject('rootStore')
@observer
class UserEdit extends React.Component {
  state = {
    files: [],
    avatar: '',
    selectable: true,//是否可以上传图片
    disableDelete: false, //是否隐藏删除按钮
  }

  domain = '' //图片域名

  componentDidMount() {
    //this.autoFocusInst.focus()
    const { userStore } = this.props.rootStore
    this.setState({
      avatar: userStore.userInfo.avatar
    })
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

      value.avatar = this.state.avatar

      updateUser(value).then(res => {
        if(res.data.code === 1) {
          toast('修改个人信息成功！', 2, () => {
            t.props.history.push('/user')
          })
        }else{
          toast(res.data.msg)
        }
      })

    })
  }
  
  //上传图片组件句柄
  onChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      files,
      selectable: type === 'remove' ? true : false
    })
  }
  //上传图片
  uploadAvatar = () => {
    let t = this
    if(t.state.files.length < 1) {
      return toast('请先选择图片')
    }
    let img = t.state.files[0]
    //let key = img.file.name
    let size = img.file.size

    getQiniuToken().then(res => {
      if(res.data.code === 1) {
        let data = res.data.data
        t.domain = data.domain
        uploadBase64(data.token, img.url, size).then(res2 => {
          //console.log(res2)
          if(res2.data.key) {
            t.setState({
              avatar: t.domain + '/' + res2.data.key,
              files: [],
              selectable: true
            })
            toast('上传成功')
          }
        })
      }
    })
  }

  render() {
    const {
      getFieldProps
      // getFieldError
    } = this.props.form
    //let errors = getFieldError('username') //获取验证错误信息
    
    const { userStore } = this.props.rootStore
    const { files } = this.state

    const avatar = this.state.avatar

    return (
      <div>
        <List renderHeader={() => '修改个人信息'}>
          <InputItem
            {...getFieldProps('username', {
              initialValue: userStore.userInfo.username
            })}
            disabled
            placeholder="用户名"
            type="text"
          >
            用户名
          </InputItem>
          <InputItem
            {...getFieldProps('password', {
              initialValue: '',
              rules: [{ required: true, message: '请输入密码' }]
            })}
            type="password"
            placeholder="密码"
          >
            密码
          </InputItem>
          <InputItem
            {...getFieldProps('nickname', {
              initialValue: userStore.userInfo.nickname,
              rules: []
            })}
            type="text"
            placeholder="昵称"
          >
            昵称
          </InputItem>
          <InputItem
            {...getFieldProps('email', {
              initialValue: userStore.userInfo.email,
              rules: []
            })}
            type="text"
            placeholder="电子邮箱"
          >
            电子邮箱
          </InputItem>
          <InputItem
            {...getFieldProps('signature', {
              initialValue: userStore.userInfo.signature,
              rules: []
            })}
            type="text"
            placeholder="个性签名"
          >
            个性签名
          </InputItem>
          <Item>
            头像: <img src={avatar} alt="" className="avatar"/>
          </Item>
          <Item>
            修改头像：
            <ImagePicker
              files={files}
              onChange={this.onChange}
              selectable={files.length < 7}
              multiple={false}
              selectable={this.state.selectable}
              disableDelete={this.state.disableDelete}
            />
            <Button size="small" style={{ margin: '0 auto', width: '100px' }} type="primary" onClick={this.uploadAvatar}>确定上传</Button>
          </Item>
        </List>
        <Flex>
          <Flex.Item />
          <Flex.Item>
            <Button
              type="primary"
              style={{ marginTop: '20px' }}
              onClick={this.submit}
            >
              提交
            </Button>
          </Flex.Item>
          <Flex.Item />
        </Flex>
      </div>
    )
  }
}

const UserEditPage = createForm()(UserEdit)

export default UserEditPage
