import { Block } from 'slate'

const imageExtensions = ['jpeg', 'jpg', 'png', 'gif']

/**
 * A function to determine whether a URL has an image extension.
 *
 * @param {String} url
 * @return {Boolean}
 */

export function isImage(url) {
  return imageExtensions.includes(getExtension(url))
}

/**
 * Get the extension of the URL, using the URL API.
 *
 * @param {String} url
 * @return {String}
 */

function getExtension(url) {
  return new URL(url).pathname.split('.').pop()
}

/**
 * A change function to standardize inserting images.
 *
 * @param {Editor} editor
 * @param {String} src
 * @param {Range} target
 */

export function insertImage(editor, src, target) {
  if (target) {
    editor.select(target)
  }

  editor.insertBlock({
    type: 'image',
    data: { src, className: 'con-image' },
  })
}

export const schema = {
  document: {
    last: { type: 'paragraph' },
    normalize: (editor, { code, node, child }) => {
      switch (code) {
        case 'last_child_type_invalid': {
          const paragraph = Block.create('paragraph')
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
      }
    },
  },
  blocks: {
    image: {
      isVoid: true,
    },
  },
}
//http://img3.imgtn.bdimg.com/it/u=208295833,373079534&fm=26&gp=0.jpg