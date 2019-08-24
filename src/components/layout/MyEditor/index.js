import React from 'react'
import { Editor, getEventTransfer } from 'slate-react'
// import { Value } from 'slate'
import EditBar from './EditBar'
import Html from 'slate-html-serializer'
import isUrl from 'is-url'
import rules from './rules'
import plugins from './plugins'
import { wrapLink, unwrapLink } from './link'
import { isImage, insertImage, schema } from './image'
import './index.css'

const html = new Html({ rules })

class MyEditor extends React.Component {
  // Set the initial value when the app is first constructed.
  state = {
    value: html.deserialize(''),
  }

  //保存editor的引用
  ref = editor => {
    this.editor = editor
  }

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    if (value.document != this.state.value.document) {
      const string = html.serialize(value)
      this.props.getContent(string)
    }

    this.setState({ value })
  }

  //块级
  renderNode = (props, editor, next) => {
    const { attributes, node } = props

    switch (props.node.type) {
      case 'image': {
        const src = node.data.get('src')
        return (
          <img
            {...attributes}
            src={src}
            className='con-image'
          />
        )
      }
      case 'code':
        return (
          <pre {...props.attributes}>
            <code>{props.children}</code>
          </pre>
        )
      case 'paragraph':
        return (
          <p {...props.attributes} className={props.node.data.get('className')}>
            {props.children}
          </p>
        )
      case 'quote':
        return <blockquote {...props.attributes}>{props.children}</blockquote>
      default:
        return next()
    }
  }

  //样式
  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <strong>{props.children}</strong>
      // Add our new mark renderers...
      case 'code':
        return <code>{props.children}</code>
      case 'italic':
        return <em>{props.children}</em>
      case 'strikethrough':
        return <del>{props.children}</del>
      case 'underline':
        return <u>{props.children}</u>
      default:
        return next()
    }
  }
  
  //内联
  renderInline = (props, editor, next) => {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'link': {
        const { data } = node
        const href = data.get('href')
        return (
          <a {...attributes} href={href}>
            {children}
          </a>
        )
      }

      default: {
        return next()
      }
    }
  }


  hasLinks = () => {
    const { value } = this.state
    return value.inlines.some(inline => inline.type === 'link')
  }
  //插入链接
  insertLink = (linkValue, linkText) => {
    const { editor } = this
    const hasLinks = this.hasLinks()

    if (hasLinks) {
      editor.command(unwrapLink)
    } else {
      if (!linkValue || !linkText) return
      editor
        .insertText(linkText)
        .moveFocusBackward(linkText.length)
        .command(wrapLink, linkValue)
    }
  }

  //插入图片
  insertImage = imageUrl => {
    if(!imageUrl) return 
    this.editor.command(insertImage, imageUrl)
  }
  /**
   * 在光标处粘贴图片
   * @param {Event} event
   * @param {Editor} editor
   * @param {Function} next
   */
  onDropOrPaste = (event, editor, next) => {
    const target = editor.findEventRange(event)
    if (!target && event.type === 'drop') return next()

    const transfer = getEventTransfer(event)
    const { type, text, files } = transfer

    if (type === 'files') {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')
        if (mime !== 'image') continue

        reader.addEventListener('load', () => {
          editor.command(insertImage, reader.result, target)
        })

        reader.readAsDataURL(file)
      }
      return
    }

    if (type === 'text') {
      if (!isUrl(text)) return next()
      if (!isImage(text)) return next()
      editor.command(insertImage, text, target)
      return
    }

    next()
  }

  
  render() {
    return (
      <div style={{background: '#e6e6e6'}}>
        <EditBar insertLink={this.insertLink} insertImage={this.insertImage}/>
        <Editor
          style={{background: '#fff', overflow: 'hidden', padding: '15px 0 15px 15px '}}
          plugins={plugins}
          ref={this.ref}
          value={this.state.value}
          onChange={this.onChange}
          renderBlock={this.renderNode}
          renderMark={this.renderMark}
          renderInline={this.renderInline}
          schema={schema}
          onDrop={this.onDropOrPaste}
          onPaste={this.onDropOrPaste}
        />
      </div>
    )
  }
}

export default MyEditor
