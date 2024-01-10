// ref https://github.com/vuejs/vitepress/blob/main/src/node/markdown/plugins/highlight.ts
import escapeHtml from 'escape-html'
import prism from 'prismjs'

// prism is listed as actual dep so it's ok to require
// eslint-disable-next-line ts/no-require-imports, ts/no-var-requires
const loadLanguages = require('prismjs/components/index')

// required to make embedded highlighting work...
// https://prismjs.com/#basic-usage-node
// 载入所有支持的语言 https://prismjs.com/#supported-languages
loadLanguages()

function wrap(code: string, lang: string): string {
  if (lang === 'text') {
    code = escapeHtml(code)
  }
  return `<pre v-pre><code>${code}</code></pre>`
}

export function highlight(str: string, lang: string) {
  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase()
  const rawLang = lang
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (lang === 'ts') {
    lang = 'typescript'
  }
  if (lang === 'py') {
    lang = 'python'
  }
  /* if (!prism.languages[lang]) {
    try {
      loadLanguages([lang])
    }
    catch {
      consola.warn(
        chalk.yellow(
          `[vitepress] Syntax highlight for language "${lang}" is not supported.`,
        ),
      )
    }
  } */
  /* if (!prism.languages[lang]) {
    console.debug('no lang', lang)
  }
  else {
    console.debug('have lang', lang)
  } */
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}
