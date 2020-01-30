import React, { useState, useEffect, useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { List, InputItem, Button, Flex, ImagePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import { Context } from '../../../store'
import { updateUser, getQiniuToken } from '../../../utils/proxy'
import { toast } from '../../../utils/tools'
import { uploadBase64 } from '../../../utils/qiniu-handle'
import { IUpdateUserData } from '../../../types'

const Item = List.Item

interface IProps extends RouteComponentProps {
  form: any
}

const UserEdit: React.FC<IProps> = function(props) {
  const [files, setFiles] = useState<AnyObject[]>([])

  const [avatar, setAvatar] = useState<string>('')

  const [selectable, setSelectable] = useState(true) // 是否可以上传图片

  const [disableDelete] = useState(false) // 是否隐藏删除按钮

  const store = useContext(Context)
  const userStore = store!.userStore

  useEffect(() => {
    setAvatar(userStore.userInfo.avatar!)
  }, [userStore.userInfo.avatar])

  function submit(): void {
    props.form.validateFields((error: any, value: IUpdateUserData) => {
      // console.log(error, value)
      if (error) {
        let errKeys = Object.keys(error)
        if (errKeys.length > 0) {
          toast(error[errKeys[0]].errors[0].message)
          return
        }
      }

      value.avatar = avatar

      updateUser(value).then(res => {
        if (res.data.code === 1) {
          userStore.setUserInfo(value)

          toast('修改个人信息成功！', 2, () => {
            props.history.push('/user')
          })
        } else {
          toast(res.data.msg)
        }
      })
    })
  }

  // 上传图片组件句柄
  function onChange(
    files: AnyObject[],
    operationType: string,
    index?: number
  ): void {
    // console.log(files, operationType, index)
    setFiles(files)
    setSelectable(operationType === 'remove' ? true : false)
  }

  // 上传图片
  function uploadAvatar() {
    if (files.length < 1) {
      return toast('请先选择图片')
    }
    let img = files[0]
    // let key = img.file.name
    let size = img.file.size

    getQiniuToken().then(res => {
      if (res.data.code === 1) {
        let data = res.data.data

        uploadBase64(data.token, img.url, size).then(res2 => {
          // console.log(res2)
          if (res2.data.key) {
            setAvatar(data.domain + '/' + res2.data.key)
            setFiles([])
            setSelectable(true)

            toast('上传成功')
          }
        })
      }
    })
  }

  const {
    getFieldProps
    // getFieldError
  } = props.form

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
          头像: <img src={avatar} alt="" className="avatar" />
        </Item>
        <Item>
          修改头像：
          <ImagePicker
            files={files}
            onChange={onChange}
            multiple={false}
            selectable={selectable}
            disableDelete={disableDelete}
          />
          <Button
            size="small"
            style={{ margin: '0 auto', width: '100px' }}
            type="primary"
            onClick={uploadAvatar}
          >
            确定上传
          </Button>
        </Item>
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

const UserEditPage = createForm()(observer(UserEdit))

export default UserEditPage
