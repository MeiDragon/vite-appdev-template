import PluginLegacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';

export default defineConfig({
  // 模块解析，和`webpack`一样
  resolve: {
    alias: {
      '@': '/src/',
      '@utils': '/src/utils/',
      '@styles': '/src/styles/',
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
        }
      }
    }
  },
  // 插件
  plugins:[ PluginLegacy() ]
})