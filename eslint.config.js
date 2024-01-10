import antfu from '@antfu/eslint-config'

// package.json可以配置成
//    "lint": "eslint .",
//     "lint:fix": "eslint . --fix",
/* 可以配置成保存自动fix */
export default antfu({}, {
  rules: {
    'curly': 'off',
    'no-console': 'off',
  },
})
