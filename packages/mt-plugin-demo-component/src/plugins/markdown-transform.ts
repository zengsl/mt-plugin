import * as path from 'node:path'
import type { Plugin } from 'vite'

type Append = Record<'headers' | 'footers' | 'scriptSetups', string[]>

// ref element-plus-md-transform
export default function MarkdownDemoTransform(): Plugin {
  return {
    name: 'md-demo-transform',
    enforce: 'pre',
    async buildStart() {
      /* const pattern = `{${[...languages, languages[0]].join(',')}}/component`
      compPaths = await glob(pattern, {
        cwd: docRoot,
        absolute: true,
        onlyDirectories: true,
      }) */
    },

    async transform(code, id) {
      if (!id.endsWith('.md'))
        return
      console.log('transform id', id)
      const componentId = path.basename(id, '.md')
      const append: Append = {
        headers: [],
        footers: [],
        scriptSetups: [
          `const demos = import.meta.glob('../../examples/${componentId}/*.vue', { eager: true })`,
        ],
      }

      return combineMarkdown(
        code,
        [combineScriptSetup(append.scriptSetups), ...append.headers],
        append.footers,
      )
    },
  }
}

function combineMarkdown(code: string, headers: string[], footers: string[]) {
  const frontmatterEnds = code.indexOf('---\n\n')
  const firstHeader = code.search(/\n#{1,6}\s.+/)
  const sliceIndex
      = firstHeader < 0
        ? frontmatterEnds < 0
          ? 0
          : frontmatterEnds + 4
        : firstHeader

  if (headers.length > 0)
    code
        = code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex)
  code += footers.join('\n')

  return `${code}\n`
}

function combineScriptSetup(codes: string[]) {
  return `\n<script setup>
${codes.join('\n')}
</script>
`
}
