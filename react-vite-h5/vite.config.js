import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换为 target 的值
        target: 'http://localhost:5173',
        changeOrigin: true,
        pathRewrite: {
          '^/api':''
        }
      }
    }
  },
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // src路径
      'utils': resolve(__dirname, 'src/utils') // src 路径
    }
  }
})
