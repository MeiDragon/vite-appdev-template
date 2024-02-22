import PluginLegacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  /**
   * Dep optimization options
   */
  optimizeDeps: {
    /**
     * By default, Vite will crawl your `index.html` to detect dependencies that
     * need to be pre-bundled. If `build.rollupOptions.input` is specified, Vite
     * will crawl those entry points instead.
     *
     * If neither of these fit your needs, you can specify custom entries using
     * this option - the value should be a fast-glob pattern or array of patterns
     * (https://github.com/mrmlnc/fast-glob#basic-syntax) that are relative from
     * vite project root. This will overwrite default entries inference.
     * 默认行为不符合要求时，比如入口文件为 .vue，可自定入口
     */
    entries: [],
    /**
     * Force optimize listed dependencies (must be resolvable import paths,
     * cannot be globs).
     * 指定强制预构建的依赖，Vite自身扫描检测依赖不可靠
     * 场景一：动态import会导致二次预构建=重走预构建+刷新页面+重新请求，Vite天然按需加载的特性使得某些依赖只在运行时才识别到
     * 场景二：某些包被exclude（不常用）
     */
    include: [],
    /**
     * Do not optimize these dependencies (must be resolvable import paths,
     * cannot be globs).
     */
    exclude: [],
    /**
     * Options to pass to esbuild during the dep scanning and optimization
     *
     * Certain options are omitted since changing them would not be compatible
     * with Vite's dep optimization.
     *
     * - `external` is also omitted, use Vite's `optimizeDeps.exclude` option
     * - `plugins` are merged with Vite's dep plugin
     *
     * https://esbuild.github.io/api
     * 自定 esbuild 配置
     */
    esbuildOptions: {
      plugins: []
    },
    /**
     * Force dep pre-optimization regardless of whether deps have changed.
     * 手动强制开启预构建
     * @experimental
     */
    force: true
  },
  // CSS related options (preprocessors and CSS modules)
  css: {
    // https://github.com/css-modules/postcss-modules
    modules: {
      generateScopedName: '[name]-[local]-[hash:base64:5]'
    },
    preprocessorOptions: {

    },
    // 优先级高于postcss.config.js
    // postcss: {
    //   plugins: []
    // }
  },
  // 模块解析，和`webpack`一样
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/'),
      '@utils': resolve(__dirname, 'src/utils/'),
      '@styles': resolve(__dirname, 'src/styles/'),
    }
  },
  // 配置开发服务
  server: {
    port: 5173,
    open: true,
    hmr: true,
    /**
     * Configure custom proxy rules for the dev server. Expects an object
     * of `{ key: options }` pairs.
     * Uses [`http-proxy`](https://github.com/http-party/node-http-proxy).
     * Full options [here](https://github.com/http-party/node-http-proxy#options).
     *
     * Example `vite.config.js`:
     * ``` js
     * module.exports = {
     *   proxy: {
     *     // string shorthand
     *     '/foo': 'http://localhost:4567/foo',
     *     // with options
     *     '/api': {
     *       target: 'http://jsonplaceholder.typicode.com',
     *       changeOrigin: true,
     *       rewrite: path => path.replace(/^\/api/, '')
     *     }
     *   }
     * }
     * ```
     */
    proxy: {
      // /foo 是字符串 http://localhost:5173/foo 的简写法
      '/foo': 'http://localhost:4567/foo',
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  // 配置打包服务
  build: {
    /**
     * Directory relative from `outDir` where the built js/css/image assets will
     * be placed.
     * @default 'assets'
     */
    assetsDir: 'assets',
    /**
     * Static asset files smaller than this number (in bytes) will be inlined as
     * base64 strings. Default limit is `4096` (4 KiB). Set to `0` to disable.
     * @default 4096
     */
    assetsInlineLimit: 5 * 1024,
    /**
     * Will be merged with internal rollup options.
     * https://rollupjs.org/configuration-options/
     */
    rollupOptions: {
      // 生产环境多入口配置，开发环境默认支持
      input: {
        index: './index.html',
        list: './list.html',
      },
      output: {
        // 入口chunk
        entryFileNames: 'assets/js/[name]-[hash:8].js',
        // 非入口chunk
        chunkFileNames: 'assets/chunk/[name]-[hash:8].js',
        // 资源出口路径(如：图片、css等)
        assetFileNames: chunkInfo => {
          const { name = '', source, type } = chunkInfo
          if (/\.css$/i.test(name)) {
            return "assets/css/[name]-[hash:8][extname]"
          } else if (/\.[jpe?g|png|gif]$/i.test(name)) {
            return "assets/images/[name]-[hash:8][extname]"
          } else {
            return `assets/[ext]/[name]-[hash:8][extname]`
          }
        },
        sourcemap: false,
      },
      // 指定依赖外部化
      external: []
    }
  },
  // 插件
  plugins:[ PluginLegacy() ]
})