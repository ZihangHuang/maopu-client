import isUrl from 'is-url'

const imageExtensions = ['jpeg', 'jpg', 'png', 'gif']

/**
 * A function to determine whether a URL has an image extension.
 *
 * @param {String} url
 * @return {Boolean}
 */

export function isImageUrl(url: string): boolean {
  if (!url) return false
  if (!isUrl(url)) return false
  return imageExtensions.includes(getExtension(url))
}

/**
 * Get the extension of the URL, using the URL API.
 *
 * @param {String} url
 * @return {String}
 */

function getExtension(url: string): string {
  return new URL(url).pathname.split('.').pop() as string
}
