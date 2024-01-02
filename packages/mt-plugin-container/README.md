# 容器插件 

生成对应结构的Html容器，样式需要设置样式，可以参考[custom-block.scss](https://github.com/zengsl/mt-plugin/blob/main/packages/mt-plugin-demo-component/src/styles/content/custom-block.scss)

## 准备

> 通过`unplugin-vue-markdown`配置，需要提前安装

[unplugin-vue-markdown](https://github.com/unplugin/unplugin-vue-markdown)

```shell
npm i unplugin-vue-markdown
```

- Vite

```shell
// vite.config.ts
import Vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <-- allows Vue to compile Markdown files
    }),
    Markdown({ /* options */ }),
  ],
})
```


- Markdown中使用Vue组件

直接导入组件或者使用`vite-plugin-components`并配置md类型


- Frontmatter

- Document head and meta

## 使用方式

- 安装

```shell
pnpm add @mt-plugin/mt-plugin-container
```

- 配置

使用预设容器

```js {5}
Markdown({
    headEnabled: true, // <--
    async markdownItSetup(md) {
        // 使用预设的容器：warning、tip、danger
        md.use(presetContainer)
    )
    },
})
```

自定义容器

```js {5}
Markdown({
    headEnabled: true, // <--
    async markdownItSetup(md) {
        // 使用自定义容器，更多配置参考ContainerPluginOptions
        md.use(containerPlugin, { type: 'info' })
    )
    },
})
```