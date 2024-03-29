import type { App } from 'vue'
import { globals } from './components'

/* import './styles/app.scss'
import './styles/css-vars.scss' */

export { default as MarkdownDemoTransform } from './plugins/markdown-transform'
export default {
  install: (app: App) => {
    // 在这里编写插件代码
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
}
