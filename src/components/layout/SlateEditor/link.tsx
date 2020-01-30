import isUrl from 'is-url'
import { ReactEditor } from 'slate-react'
import slate, { Transforms, Editor } from 'slate'

export const withLinks = (editor: ReactEditor): ReactEditor => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element: slate.Element): boolean => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = (text: string): void => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data: DataTransfer): void => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

export const insertLink = (
  editor: ReactEditor,
  url: string,
  text: string
): void => {
  wrapLink(editor, url, text)
}

export const isLinkActive = (editor: ReactEditor): boolean => {
  const [link] = Editor.nodes(editor, { match: n => n.type === 'link' })
  return !!link
}

export const unwrapLink = (editor: ReactEditor): void => {
  Transforms.unwrapNodes(editor, { match: n => n.type === 'link' })
}

export const wrapLink = (
  editor: ReactEditor,
  url: string,
  text?: string
): void => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const link = {
    type: 'link',
    url,
    children: [{ text: text || url }]
  }

  Transforms.insertNodes(editor, link)
  Transforms.collapse(editor, { edge: 'end' })
}
