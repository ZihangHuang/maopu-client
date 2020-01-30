import React, { useState, useEffect } from 'react'
import { Modal, InputItem } from 'antd-mobile'
import BaseBtn from '../../../base/Btn'
import { fileToBase64, toast } from '../../../../utils/tools'
import { getQiniuToken } from '../../../../utils/proxy'
import { uploadBase64 } from '../../../../utils/qiniu-handle'
import './index.css'

const prompt = Modal.prompt

interface IProps {
  insertLink(linkValue: string, linkText: string): void
  insertImage(imageUrl: string): void
}

let domain: string // 图片上传域名
let qiniuToken: string // 七牛云token

const EditBar: React.FC<IProps> = function(props) {
  const [isShowLinkModal, setIsShowLinkModal] = useState<boolean>(false)

  const [linkValue, setLinkValue] = useState<string>('')

  const [linkText, setLinkText] = useState<string>('')

  useEffect(() => {
    getQiniuToken().then(res => {
      if (res.data.code === 1) {
        let data = res.data.data
        domain = data.domain
        qiniuToken = data.token
      }
    })
  }, [])

  function insertLink(): void {
    props.insertLink(linkValue, linkText)

    setIsShowLinkModal(false)
  }

  function fileHandle(e: React.ChangeEvent<HTMLInputElement>): void {
    let target = e.target
    if (target.files!.length < 1) {
      return
    }
    let file = target.files![0]
    if (!/image\/\w+/.test(file.type)) {
      toast('文件必须为图片！')
      return
    }
    if (file.size > 1024 * 1024 * 5) {
      toast(file.name + '这个文件大于5M！请重新选择！')
      return
    }

    fileToBase64(file).then(base64Str => {
      if (base64Str) {
        uploadBase64(qiniuToken, base64Str, file.size)
          .then(res => {
            if (res.data.key) {
              let imageUrl = domain + '/' + res.data.key
              props.insertImage(imageUrl)
            } else {
              toast('上传图片失败')
              target.value = ''
            }
          })
          .catch(() => {
            target.value = ''
            // console.log('上传发生错误：', err)
          })
      }
    })
  }

  function showLinkModal(): void {
    setIsShowLinkModal(true)
  }
  function hideLinkModal(): void {
    setIsShowLinkModal(false)
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <div className="edit-bar">
        <BaseBtn
          btnName="icon-link"
          // triggerHandle={showLinkModal}
          triggerHandle={showLinkModal}
          size="btn-m"
        />
        <label htmlFor="upload-img">
          <BaseBtn btnName="icon-upload-picture" size="btn-m" />
        </label>
        <input
          type="file"
          name="upload-img"
          accept="image/*"
          id="upload-img"
          className="none"
          onChange={fileHandle}
        />
        <BaseBtn
          triggerType="mouseDown"
          btnName="icon-picture"
          size="btn-m"
          triggerHandle={() => prompt('输入图片链接', '', props.insertImage)}
        />
      </div>
      <Modal
        visible={isShowLinkModal}
        transparent
        closable={true}
        maskClosable={false}
        onClose={hideLinkModal}
        title="输入链接"
        footer={[
          {
            text: '确定',
            onPress: insertLink
          }
        ]}
      >
        <InputItem
          placeholder="链接"
          value={linkValue}
          onChange={setLinkValue}
        />
        <InputItem placeholder="标题" value={linkText} onChange={setLinkText} />
      </Modal>
    </div>
  )
}

export default EditBar
