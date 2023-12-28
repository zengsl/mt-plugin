import type { UserConfig } from '@commitlint/types'

// 在IDEA中安装Git Commit Template插件，辅助生成规范的提交消息的编写格式。插件地址：https://github.com/MobileTribe/commit-template-idea-plugin
// 消息的标准格式：
// <type>(<scope>): <subject>
// <BLANK LINE>
// <body>
// <BLANK LINE>
// <footer>
// 大致分为三个部分(使用空行分割):
// - 标题行: 必填, 描述主要修改类型和内容
// - 主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等
// - 页脚注释: 放 Breaking Changes 或 Closed Issues
// type部分包含：
//     feat("Features", "A new feature"),
//     fix("Bug Fixes", "A bug fix"),
//     docs("Documentation", "Documentation only changes"),
//     style("Styles", "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)"),
//     refactor("Code Refactoring", "A code change that neither fixes a bug nor adds a feature"),
//     perf("Performance Improvements", "A code change that improves performance"),
//     test("Tests", "Adding missing tests or correcting existing tests"),
//     build("Builds", "Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)"),
//     ci("Continuous Integrations", "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)"),
//     chore("Chores", "Other changes that don't modify src or test files"),
//     revert("Reverts", "Reverts a previous commit");
// scope: commit 影响的范围, 比如: route, component, utils, build...
// subject: commit 的概述, 建议符合 50/72 formatting https://stackoverflow.com/questions/2290016/git-commit-messages-50-72-formatting
// body: commit 具体修改内容, 可以分为多行, 建议符合 50/72 formatting
// footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

// <type>(<scope>): <subject>是必须的，<body>部分我们也建议适当描述。
const Configuration: UserConfig = {
  // 继承常规的设置
  extends: ['@commitlint/config-conventional'],
  // 本地规则 https://commitlint.js.org/#/reference-rules 会覆盖 @commitlint/config-conventional中的内容
  rules: {
    'body-max-line-length': [2, 'always', 300],
    'header-max-length': [2, 'always', 100],
  },
}

module.exports = Configuration
