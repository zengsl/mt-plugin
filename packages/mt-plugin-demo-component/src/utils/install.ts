import type { App } from 'vue'
import type { SFCWithInstall } from './typescript'

export function withInstall<T>(main: T) {
  ;(main as SFCWithInstall<T>).install = (app: App): void => {
    // 注册组件
    app.component((main as any).name, main as any)
  }

  return main as SFCWithInstall<T>
}
