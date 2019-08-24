/**
 * 解析输入内容,转化为HTML
 */
import React from 'react'

const BLOCK_TAGS = {
  blockquote: 'quote',
  p: 'paragraph',
  pre: 'code',
  img: 'image'
}

const INLINE_TAGS = {
  a: 'link'
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline',
  code: 'code'
}

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'block',
          type: type,
          data: {
            className: el.getAttribute('class')
          },
          nodes: next(el.childNodes)
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'block') {
        switch (obj.type) {
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            )
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>
          case 'quote':
            return <blockquote>{children}</blockquote>
          case 'image': {
            const src = obj.data.get('src')
            const className = obj.data.get('className')
            return (
              <img
                src={src}
                className={className}
              />
            )
          }
        }
      }
    }
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes)
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>
          case 'italic':
            return <em>{children}</em>
          case 'underline':
            return <u>{children}</u>
          case 'code':
            return <code>{children}</code>
        }
      }
    }
  },
  {
    deserialize: function(el, next) {
      const type = INLINE_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'inline',
          type: type,
          nodes: next(el.childNodes),
          data: {
            href: el.attrs.find(({ name }) => name == 'href').value
          }
        }
      }
    },
    serialize: function(obj, children) {
      if (obj.object == 'inline') {
        switch (obj.type) {
          case 'link':
            return <a href={obj.data.get('href')}>{children}</a>
        }
      }
    }
  }
]

export default rules
