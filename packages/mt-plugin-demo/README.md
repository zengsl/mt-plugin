# Demo容器插件 

参考Element-Plus的组件展示方案实现。

## 准备

与[mt-plugin-container](https://github.com/zengsl/mt-plugin/tree/main/packages/mt-plugin-container)一样，当前插件依赖于mt-plugin-container，需要配合使用。

在vite中增加配置别名`@d`，方便使用

```js
 alias: {
    '@d': path.resolve(__dirname, './src/docs'),
},
```

## 使用方式

### 安装

```shell
pnpm add @mt-plugin/@mt-plugin/mt-plugin-demo
```

### 配置


- 配置Demo容器

```js 
import path from 'node:path'
import Markdown from 'unplugin-vue-markdown/vite'

// import { demoContainer, presetContainer } from '../../src/docs/core/plugins/markdown-container'
import { presetContainer } from '@mt-plugin/mt-plugin-container'
import { demoContainer } from '@mt-plugin/mt-plugin-demo'
import type { MarkdownItDemoOptions } from '@mt-plugin/mt-plugin-demo'
//  计算根目录（根据当前插件配置文件所在位置实际情况调整）
const projectRoot = path.resolve(__dirname, '..', '..')

export default function createVueMarkdown() {
    return Markdown({
        headEnabled: true, // <--
        async markdownItSetup(md) {
            md.use(presetContainer)
            // 注册Demo容器插件
            md.use(demoContainer, { projectRoot } as MarkdownItDemoOptions)
        },
    })
}
```

- 配置组件

> 也可以自行封装一个Demo组件，参考[mt-plugin-demo-component](https://github.com/zengsl/mt-plugin/tree/main/packages/mt-plugin-demo-component)

mt-plugin-demo-component使用方式

```ts
// main.ts
// 文档插件
import docs from '@mt-plugin/mt-plugin-demo-component'

app.use(docs)
```


```js 
// 安装vite插件，markdown转换器
import { MarkdownDemoTransform } from '@mt-plugin/mt-plugin-demo-component'

vitePlugins.push(MarkdownDemoTransform())
```


### 使用

> 使用mt-plugin-demo-component的方式

1. 在src下创建一个docs目录，内部包含zh-CN、examples文件夹，zh-CN文件夹下包含文档说明文件，examples文件夹存放文档中需要使用的示例代码。

2. 两个目录之间的关系：zh-CN下创建一个query.md用于描述查询组件文档，examples下创建一个query文件夹，query文件夹下包含xxx.vue示例组件。

3. query.md中通过demo容器组件使用examples的示例代码，如：

```js

::: demo docsButton使用案例

query/docsButton

:::

```
docsButton使用案例为描述内容

query/docsButton为示例组件的相对路径，切上下方各有一个行空行


更多内容参考[mt-plugin-demo-component](https://github.com/zengsl/mt-plugin/tree/main/packages/mt-plugin-demo-component)