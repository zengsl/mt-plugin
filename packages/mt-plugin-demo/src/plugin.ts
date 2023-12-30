import * as path from 'node:path'
import * as fs from 'node:fs'
import MarkdownIt from 'markdown-it'
import { containerPlugin } from '@mt-plugin/mt-plugin-container'
import type Token from 'markdown-it/lib/token'
import { highlight } from './utils/highlight'
import type { MarkdownItDemoOptions } from './types'

const localMd = MarkdownIt()

export function demoContainer(md: MarkdownIt, markdownItDemoOptions: MarkdownItDemoOptions) {
  if (!markdownItDemoOptions || !markdownItDemoOptions.projectRoot) {
    console.warn(`projectRoot option is required`)
    return
  }
  let docsDir = markdownItDemoOptions.docsDir
  const projectRoot = markdownItDemoOptions.projectRoot
  if (!docsDir) {
    docsDir = 'src/docs'
  }
  const docRoot = path.resolve(projectRoot, docsDir)

  containerPlugin(md, {
    type: 'demo',
    render: (tokens: Token[], idx: number) => {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        if (sourceFileToken.type === 'inline') {
          const vuePath = path.resolve(docRoot, 'examples', `${sourceFile}.vue`)
          source = fs.readFileSync(
            vuePath,
            'utf-8',
          )
        }
        if (!source)
          throw new Error(`Incorrect source file: ${sourceFile}`)
        return `<Demo :demos="demos" source="${encodeURIComponent(
                    highlight(source, 'vue'),
                )}" path="${sourceFile}" raw-source="${encodeURIComponent(
                    source,
                )}" description="${encodeURIComponent(localMd.render(description))}">`
      }
      else {
        return '</Demo>'
      }
    },
  })
}
