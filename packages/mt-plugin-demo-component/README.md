# Demo容器插件

参考Element-Plus的组件展示方案实现,配合[mt-plugin-demo](https://github.com/zengsl/mt-plugin/tree/main/packages/mt-plugin-demo)使用，提供默认组件、样式。

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
pnpm add @mt-plugin/@mt-plugin/mt-plugin-demo-component
```

### 配置

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


#### 创建文档

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




#### 创建展示容器组件

创建一个用于展示的vue组件，并导入默认样式

```vue
<script setup lang="ts">
import '@mt-plugin/mt-plugin-demo-component/dist/index.css'
import componentDocs from '@d/zh-CN/component/query.md'
</script>

<template>
  <div class="doc-content-wrapper">
    <div class="doc-content-container">
      <componentDocs />
    </div>
  </div>
</template>

<style lang="scss" scoped>
//   外层如果有设置overflow属性，可能会影响代码内容打开后，收缩按钮在下方粘滞的效果。需要自行调整。
/*.doc-content-wrapper {
  height: calc(100vh - 84px);
  overflow: auto;
}
:deep{
  .mt-example-float-control {
    bottom: -42px
  }
}*/
</style>
```