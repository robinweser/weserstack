'use server'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { createElement } from 'react'
import remarkGfm from 'remark-gfm'

import * as components from '@/components/markdown'
import getHeadings from '@/utils/getHeadings'

type Scope = {
  id: string
}

export default async function compileMarkdown<MetaData>(
  markdown: string,
  scope?: Scope,
  customComponents?: Record<string, React.ComponentType<any>>
) {
  const { content, frontmatter } = await compileMDX<MetaData>({
    source: markdown,

    // @ts-ignore
    components: {
      ...components,
      // @ts-ignore
      img: (props) => createElement(components.img, { ...props, ...scope }),
      ...customComponents,
    },
    options: {
      scope,
      parseFrontmatter: true,
      blockJS: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  })

  const parsed = matter(markdown)
  const headings = getHeadings(markdown)
  const words = parsed.content.match(/[a-z]{2,}/gi)?.length || 0
  const duration = Math.ceil(words / 200)

  return {
    content,
    words,
    duration,
    headings,
    meta: { ...frontmatter, words, duration },
  }
}
