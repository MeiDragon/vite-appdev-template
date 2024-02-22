# vite-appdev-template
基于 Vite 的应用开发模板
## 快 🚀
- 开发阶段利用 `esbuild` 预构建，处理第三方依赖；遵循 `esm` 模块规范，源码不打包直接交给浏览器处理，将这部分工作交给浏览器；
- 按需加载代码，不是一次性打包所有模块；
- 文件缓存+浏览器强缓存，减少重复打包、请求；
- 第三方依赖内多模块合并，减少 `http` 并发请求数，不拖慢页面加载；
- 
## 上手成本低 🎯
- 内置支持 `CSS` 预处理器，只需安装相应处理器依赖；
- 内置支持 `PostCSS`，只需安装相应插件，相关配置配好，自动搜寻`postcss.config.js`并应用；
- `build` 产物自带压缩 `js`、`css`
## Vue
## React
## postcss 后处理 css
### postcss-preset-env
- 允许开发时使用最新现代CSS语法编写，该插件将根据(`browserslist`)配置转换为兼容语法
- 内置`autoprefixer`，可移除该插件
### postcss-pxtorem
将`css`样式文件中的`px`按需转化为`rem`，作移动端兼容
# Reference
[Vite下一代的前端工具链，从入门到项目最佳实践](https://www.arryblog.com/vip/vue/vite.html)   
[postcss-pxtorem](https://www.npmjs.com/package/postcss-pxtorem)   
[postcss-preset-env](https://www.npmjs.com/package/postcss-preset-env)   
