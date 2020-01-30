import escapeHtml from 'escape-html'
import { Node, Text } from 'slate'

export const serialize = (node: Node): string => {
  if (Text.isText(node)) {
    return escapeHtml(node.text)
  }

  const children = node.children.map((n: Node) => serialize(n)).join('')

  switch (node.type) {
    case 'image':
      return `<div><img alt="img" src=${escapeHtml(
        node.url
      )} className="con-image" />${children}</div>`
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`
    case 'paragraph':
      return `<p>${children}</p>`
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    case 'code':
      return `<pre><code>${children}</code></pre>`
    case 'bulleted-list':
      return `<ul>${children}</ul>`
    case 'heading-one':
      return `<h1>${children}</h1>`
    case 'heading-two':
      return `<h2>${children}</h2>`
    case 'heading-three':
      return `<h3>${children}</h3>`
    case 'heading-four':
      return `<h4>${children}</h4>`
    case 'heading-five':
      return `<h5>${children}</h5>`
    case 'heading-six':
      return `<h6>${children}</h6>`
    case 'list-item':
      return `<li>${children}</li>`
    case 'numbered-list':
      return `<ol>${children}</ol>`
    default:
      return children
  }
}

export const serializer = function(nodes: Node[]): string {
  if (!Array.isArray(nodes)) return serialize(nodes)

  let str: string

  str = ''

  nodes.forEach(node => {
    str += serialize(node)
  })

  return str
}
