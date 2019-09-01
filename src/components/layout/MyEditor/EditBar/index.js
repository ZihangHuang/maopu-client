import React from 'react'
import { Modal, InputItem } from 'antd-mobile'
import PropTypes from 'prop-types'
import BaseBtn from '../../../base/Btn'
import { fileToBase64, toast } from '../../../../utils/tools'
import { getQiniuToken } from '../../../../utils/proxy'
import { uploadBase64 } from '../../../../utils/qiniu-handle'
import './index.css'

const prompt = Modal.prompt

export default class EditBar extends React.Component {
  state = {
    isShowLinkModal: false,
    linkValue: '',
    linkText: '',
    imageValue: '',

    files: []
  }
  domain = '' //图片上传域名
  qiniuToken = '' //七牛云token

  componentDidMount() {
    let t = this
    getQiniuToken().then(res => {
      if (res.data.code === 1) {
        let data = res.data.data
        t.domain = data.domain
        t.qiniuToken = data.token
      }
    })
  }

  onLinkChange1 = value => {
    this.setState({
      linkValue: value
    })
  }
  onLinkChange2 = value => {
    this.setState({
      linkText: value
    })
  }
  onOpen = el => {
    this.setState({
      [el]: true
    })
  }
  onClose = el => {
    this.setState({
      [el]: false
    })
  }
  insertLink = () => {
    let { linkValue, linkText } = this.state

    this.props.insertLink(linkValue, linkText)

    // setTimeout(() => {
    this.onClose('isShowLinkModal')
    // }, 0)
  }

  insertImageUrl = imageUrl => {
    this.props.insertImage(imageUrl)
  }
  
  fileHandle = e => {
    let file = e.target.files[0]
    if (!/image\/\w+/.test(file.type)) {
      toast('文件必须为图片！')
      return
    }
    if (file.size > 1024 * 1024 * 5) {
      toast(file.name + '这个文件大于5M！请重新选择！')
      return
    }
    let t = this
    fileToBase64(file).then(base64Str => {
      uploadBase64(t.qiniuToken, base64Str, file.size).then(res => {
        if (res.data.key) {
          let imageUrl = t.domain + '/' + res.data.key
          this.props.insertImage(imageUrl)
        } else {
          toast('插入图片失败')
        }
      })
    })
  }

  render() {
    return (
      <div style={{overflow: 'hidden'}}>
        <div className="edit-bar">
          <BaseBtn
            btnName="icon-link"
            clickHandle={this.onOpen.bind(this, 'isShowLinkModal')}
            size="btn-m"
          />
          <label htmlFor="upload-img">
            <BaseBtn btnName="icon-upload-picture" size="btn-m" />
          </label>
          <input
            type="file"
            accept="image/*"
            id="upload-img"
            className="none"
            onChange={this.fileHandle}
            //ref={fileInput => (this.fileInput = fileInput)}
          />
          <BaseBtn
            btnName="icon-picture"
            size="btn-m"
            clickHandle={() => prompt('输入图片链接', '', this.insertImageUrl)}
          />
        </div>
        <Modal
          visible={this.state.isShowLinkModal}
          transparent
          closable={true}
          maskClosable={false}
          onClose={this.onClose.bind(this, 'isShowLinkModal')}
          title="输入链接"
          footer={[
            {
              text: '确定',
              onPress: this.insertLink
            }
          ]}
        >
          <InputItem
            placeholder="链接"
            value={this.state.linkValue}
            onChange={this.onLinkChange1}
          />
          <InputItem
            placeholder="标题"
            value={this.state.linkText}
            onChange={this.onLinkChange2}
          />
        </Modal>
      </div>
    )
  }
}

EditBar.propTypes = {
  insertLink: PropTypes.func.isRequired,
  insertImage: PropTypes.func.isRequired
}
