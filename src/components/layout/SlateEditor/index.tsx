import React, { useState, useCallback, useMemo } from 'react'
import { createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, withReact } from 'slate-react'
import { withHtml, Element, Leaf } from './parse'
import EditBar from './EditBar'
import { insertImage, withImages } from './image'
import { insertLink, withLinks } from './link'
import { serializer } from './serialize'
import './index.css'

const initialValue: Node[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: ''
      }
    ]
  }
]

interface IProps {
  getContent(content: string): void
}

const SlateEditor: React.FC<IProps> = props => {
  const [value, setValue] = useState<Node[]>(initialValue)
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(
    () =>
      withHtml(withImages(withLinks(withReact(withHistory(createEditor()))))),
    []
  )

  function insertLinkFn(linkValue: string, linkText: string): void {
    insertLink(editor, linkValue, linkText)
  }

  function insertImageFn(imageUrl: string): void {
    insertImage(editor, imageUrl)
  }

  function onChangeHandle(value: Node[]): void {
    setValue(value)
    props.getContent(serializer(value))
  }

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={onChangeHandle}
      className="my-editor"
    >
      <EditBar insertLink={insertLinkFn} insertImage={insertImageFn} />
      <Editable
        className="editor"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="写点什么..."
      />
    </Slate>
  )
}

export default SlateEditor
