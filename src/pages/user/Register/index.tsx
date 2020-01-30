import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { List, InputItem, Button, Flex } from 'antd-mobile'
import { createForm } from 'rc-form'
import { register } from '../../../utils/proxy'
import { toast } from '../../../utils/tools'

interface IProps extends RouteComponentProps {
  form: any
}

const usernameReg = /^[a-zA-Z]\w{3,11}$/

const Register: React.FC<IProps> = function(props) {
  function submit() {
    props.form.validateFields((error: any, value: any) => {
      // console.log(error, value)
      if (error) {
        let errKeys = Object.keys(error)
        if (errKeys.length > 0) {
          toast(error[errKeys[0]].errors[0].message)
          return
        }
      }

      if (!usernameReg.test(value.username)) {
        toast('用户名首字为英文字母，总长度不能不少于4位')
        return
      }
      if (value.password.length < 6) {
        toast('密码总长度不能不少于6位')
        return
      }

      value.avatar =
        'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg'
      register(value).then(res => {
        if (res.data.code === 1) {
          toast('注册成功，快去登陆吧！', 2, () => {
            props.history.push('/user')
          })
        } else {
          toast(res.data.msg)
        }
      })
    })
  }

  const {
    getFieldProps
    // getFieldError
  } = props.form

  return (
    <div>
      <List renderHeader={() => '注册'}>
        <InputItem
          {...getFieldProps('username', {
            // initialValue: '',
            rules: [{ required: true, message: '请输入用户名' }]
          })}
          placeholder="用户名，首字为英文字母，总长度不少于4位"
          type="text"
        >
          用户名
        </InputItem>
        <InputItem
          {...getFieldProps('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })}
          type="password"
          placeholder="密码，总长度不少于6位"
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
          <Button type="primary" style={{ marginTop: '20px' }} onClick={submit}>
            提交
          </Button>
        </Flex.Item>
        <Flex.Item />
      </Flex>
    </div>
  )
}

const RegisterPage = createForm()(Register)

export default RegisterPage
