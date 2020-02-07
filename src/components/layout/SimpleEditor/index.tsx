import React, { useEffect, useRef } from 'react'
import './index.css'
import { fileToBase64, toast } from '../../../utils/tools'
import { getQiniuToken } from '../../../utils/proxy'
import { uploadBase64 } from '../../../utils/qiniu-handle'

let domain: string // 图片上传域名
let qiniuToken: string // 七牛云token

interface IProps {
  getContent(content: string): void
}

const MyEditor: React.FC<IProps> = function(props) {
  const editorRef = useRef<null | HTMLDivElement>(null)
  const uploadInputRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    getQiniuToken().then(res => {
      if (res.data.code === 1) {
        let data = res.data.data
        domain = data.domain
        qiniuToken = data.token
      }
    })
  }, [])

  function formatDoc(sCmd: string, sValue: string): void {
    document.execCommand(sCmd, false, sValue)
  }

  function insertLink(): void {
    let link = prompt('请输入链接')
    if (link) {
      formatDoc('createlink', link)
    }
  }

  function insertImage(imageUrl?: string): void {
    if (imageUrl) {
      formatDoc('insertImage', imageUrl)
    } else {
      const link = prompt('请输入图片地址')
      if (link) {
        formatDoc('insertImage', link)
      }
    }
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
              insertImage(imageUrl)
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

  function getContent() {
    props.getContent(editorRef.current!.innerHTML)
  }

  return (
    <div className="editor-wrap">
      <div className="editor-bar">
        <button onClick={insertLink} className="editor-btn">
          LINK
        </button>
        <button onClick={() => insertImage()} className="editor-btn">
          IMAGE-URL
        </button>
        <button
          className="editor-btn"
          onClick={() => {
            uploadInputRef.current!.click()
          }}
        >
          IMAGE-UPLOAD
        </button>
        <input
          type="file"
          name="upload-img"
          accept="image/*"
          id="upload-img"
          className="none"
          ref={uploadInputRef}
          onChange={fileHandle}
        />
      </div>
      <div
        contentEditable="true"
        className="editor-box"
        ref={editorRef}
        suppressContentEditableWarning={true}
        onBlur={getContent}
      >
        {props.children}
      </div>
    </div>
  )
}

export default MyEditor
