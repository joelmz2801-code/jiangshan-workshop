import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  // 使用相对路径，便于部署到 GitHub Pages 子路径与 Cloudflare Pages 根路径
  base: './',
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    tsconfigPaths()
  ],
  // 多页面入口：主页 + 真实案例页
  build: {
    sourcemap: 'hidden',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cases: resolve(__dirname, 'cases.html'),
      },
    },
  },
})
