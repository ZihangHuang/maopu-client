import React from 'react'
import { List, InputItem, Button, Flex } from 'antd-mobile'
import { createForm } from 'rc-form'
// import { inject, observer } from 'mobx-react'
import { register } from '../../../utils/proxy'
import { toast } from '../../../utils/tools'

// @inject('rootStore')
// @observer
class Register extends React.Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
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
      value.avatar = 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg'
      register(value).then(res => {
        if(res.data.code === 1) {
          toast('注册成功，快去登陆吧！', 2, () => {
            t.props.history.push('/user')
          })
        }else{
          toast(res.data.msg)
        }
      })

    })
  }
  render() {
    const {
      getFieldProps
      // getFieldError
    } = this.props.form
    //let errors = getFieldError('username') //获取验证错误信息
    return (
      <div>
        <List renderHeader={() => '注册'}>
          <InputItem
            {...getFieldProps('username', {
              // initialValue: '',
              rules: [{ required: true, message: '请输入用户名' }]
            })}
            placeholder="用户名"
            type="text"
          >
            用户名
          </InputItem>
          <InputItem
            {...getFieldProps('password', {
              rules: [{ required: true, message: '请输入密码' }]
            })}
            type="password"
            placeholder="密码"
          >
            密码
          </InputItem>
          <InputItem
            {...getFieldProps('nickname', {
              rules: []
            })}
            type="text"
            placeholder="昵称"
          >
            昵称
          </InputItem>
          <InputItem
            {...getFieldProps('email', {
              rules: []
            })}
            type="text"
            placeholder="电子邮箱"
          >
            电子邮箱
          </InputItem>
          <InputItem
            {...getFieldProps('signature', {
              rules: []
            })}
            type="text"
            placeholder="个性签名"
          >
            个性签名
          </InputItem>
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

const RegisterPage = createForm()(Register)

export default RegisterPage
