import { createElement } from 'react'

export default function createStyleNode(
  id: string,
  css: string,
  nonce?: string
) {
  return createElement('style', {
    dangerouslySetInnerHTML: { __html: css },
    precedence: 'low',
    href: id,
    key: id,
    nonce,
  })
}
