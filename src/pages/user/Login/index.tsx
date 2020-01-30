import React, { useContext } from 'react'
import { List, InputItem, Button, Flex } from 'antd-mobile'
import { toast } from '../../../utils/tools'
import { createForm } from 'rc-form'
import { Context } from '../../../store'

interface IProps {
  form: any
}

const LoginInput: React.FC<IProps> = function LoginInput(props) {
  const store = useContext(Context)
  const userStore = store!.userStore

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

      userStore.login(value)
    })
  }

  const { getFieldProps } = props.form
  // let errors = getFieldError('username') //获取验证错误信息

  return (
    <div>
      <List renderHeader={() => '登录'}>
        <InputItem
          {...getFieldProps('username', {
            // initialValue: '',
            rules: [{ required: true, message: '请输入用户名' }]
          })}
          placeholder="username"
          type="text"
        >
          用户名
        </InputItem>
        <InputItem
          {...getFieldProps('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })}
          type="password"
          placeholder="password"
        >
          密码
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

const LoginPage = createForm()(LoginInput)

export default LoginPage
