// https://github.com/vuepress/vuepress-next/blob/v2.0.0-rc.0/ecosystem/theme-default/src/node/defaultTheme.ts
import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import type { ContainerPluginOptions, RenderPlaceFunction } from './types'

export function containerPlugin(md: MarkdownIt, containerPluginOptions: ContainerPluginOptions) {
  if (!containerPluginOptions) {
    console.warn(`type option is required`)
    return
  }
  let { type, before, after, validate, marker, render }
        = containerPluginOptions
  // `type` option is required
  if (!type) {
    console.warn(`type option is required`)
    return
  }

  // if `render` option is not specified
  // use `before` and `after` to generate render function
  if (!render) {
    let renderBefore: RenderPlaceFunction
    let renderAfter: RenderPlaceFunction
    if (before !== undefined && after !== undefined) {
      // user defined
      renderBefore = before
      renderAfter = after
    }
    else {
      // fallback
      renderBefore = (info: string): string =>
                `<div class="custom-container ${type}">${
                    info ? `<p class="custom-container-title">${info}</p>` : ''
                }\n`
      renderAfter = (): string => '</div>\n'
    }

    // token info stack
    const infoStack: string[] = []
    render = function (tokens, idx) {
      const token = tokens[idx]
      if (tokens[idx].nesting === 1) {
        // `before` tag
        // resolve info (title)
        const info = token.info.trim().slice(type.length).trim()
        // push the info to stack
        infoStack.push(info)
        // render
        return renderBefore(info)
      }
      else {
        // closing tag
        // pop the info from stack
        const info = infoStack.pop() || ''
        // render
        return renderAfter(info)
      }
    }

    if (!validate) {
      validate = function (params: string) {
        return !!params.trim().match(new RegExp(`^${type}\\s*(.*)$`))
      }
    }
  }
  md.use(container, type, { render, validate, marker })
}

export function presetContainer(md: MarkdownIt) {
  containerPlugin(md, { type: 'warning' })
  containerPlugin(md, { type: 'danger' })
  containerPlugin(md, { type: 'tip' })
  containerPlugin(md, { type: 'info' })
  containerPlugin(md, {
    type: 'details',
    before: info =>
            `<details class="custom-container details">${
                info ? `<summary>${info}</summary>` : ''
            }\n`,
    after: () => '</details>\n',
  })
}
