import React from 'react'
import slate, { Transforms } from 'slate'
import { RenderElementProps, ReactEditor } from 'slate-react'
import { isImageUrl } from './tool'

export const withImages = (editor: ReactEditor): ReactEditor => {
  const { insertData, isVoid } = editor

  editor.isVoid = (element: slate.Element): boolean => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = (data: DataTransfer): void => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url!)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

export const insertImage = (
  editor: ReactEditor,
  url: string | ArrayBuffer,
  isAppendText = true
): void => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)

  if (isAppendText) {
    Transforms.insertNodes(editor, { type: 'paragraph', children: [text] })
  }
}

export const ImageElement = ({
  attributes,
  children,
  element
}: RenderElementProps): React.ReactElement => {
  return (
    <div {...attributes}>
      <img alt="img" src={element.url} className="con-image" />
      {children}
    </div>
  )
}
