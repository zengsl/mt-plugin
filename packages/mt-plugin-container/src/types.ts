import type Token from 'markdown-it/lib/token'
import type Renderer from 'markdown-it/lib/renderer'

interface MarkdownItEnv {
  /**
   * The raw Markdown content without frontmatter
   */
  content?: string
  /**
   * The excerpt that extracted by `@mdit-vue/plugin-frontmatter`
   *
   * - Would be the rendered HTML when `renderExcerpt` is enabled
   * - Would be the raw Markdown when `renderExcerpt` is disabled
   */
  excerpt?: string
  /**
   * The frontmatter that extracted by `@mdit-vue/plugin-frontmatter`
   */
  frontmatter?: Record<string, unknown>
}

export interface MarkdownEnv extends MarkdownItEnv {
  id: string
}

export type MarkdownItContainerRenderFunction = (
  tokens: Token[],
  index: number,
  options: any,
  env: MarkdownEnv,
  self: Renderer,
) => string

/**
 * Options for markdown-it-container
 */
export interface MarkdownItContainerOptions {
  /**
   * The marker of the container syntax
   *
   * @default ':'
   * @see https://github.com/markdown-it/markdown-it-container#api
   */
  marker?: string

  /**
   * Renderer function for opening / closing tokens
   *
   * @see https://github.com/markdown-it/markdown-it-container#api
   */
  render?: MarkdownItContainerRenderFunction

  /**
   * Function to validate tail after opening marker, should return `true` on success
   */
  validate?: (params: string) => boolean
}

export type RenderPlaceFunction = (info: string) => string
/**
 * Options for @vuepress/plugin-container
 */
export interface ContainerPluginOptions extends MarkdownItContainerOptions {
  /**
   * The type of the container
   *
   * It would be used as the `name` of the container
   *
   * @see https://github.com/markdown-it/markdown-it-container#api
   */
  type: string

  /**
   * A function to render the starting tag of the container.
   *
   * This option will not take effect if you don't specify the `after` option.
   */
  before?: RenderPlaceFunction

  /**
   * A function to render the ending tag of the container.
   *
   * This option will not take effect if you don't specify the `before` option.
   */
  after?: RenderPlaceFunction
}
