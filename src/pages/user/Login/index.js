import React from 'react'
import { List, InputItem, Button, Flex, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import { inject, observer } from 'mobx-react'

@inject('rootStore')
@observer
class LoginInput extends React.Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  submit = () => {
    this.props.form.validateFields((error, value) => {
      //console.log(error, value)
      if (error) {
        let errKeys = Object.keys(error)
        if (errKeys.length > 0) {
          Toast.info(error[errKeys[0]].errors[0].message)
          return
        }
      }
      let { userStore } = this.props.rootStore
      userStore.login(value)

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

const LoginPage = createForm()(LoginInput)

export default LoginPage

//  <InputItem
//   {...getFieldProps('phone')}
//   type="phone"
//   placeholder="186 1234 1234"
// >手机号码</InputItem>
// <InputItem
//   {...getFieldProps('number')}
//   type="number"
//   placeholder="click to show number keyboard"
// >数字键盘</InputItem>
// <InputItem
//   {...getFieldProps('digit')}
//   type="digit"
//   placeholder="click to show native number keyboard"
// >数字键盘</InputItem>
