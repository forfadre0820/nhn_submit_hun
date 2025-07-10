import { build } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages용 정적 빌드 설정
const config = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  base: "./", // 상대 경로로 설정
  build: {
    outDir: path.resolve(__dirname, "docs"),
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});

// 빌드 실행
async function buildStatic() {
  try {
    console.log('GitHub Pages용 정적 빌드를 시작합니다...');
    await build(config);
    console.log('빌드가 완료되었습니다. docs/ 폴더를 확인하세요.');
  } catch (error) {
    console.error('빌드 실패:', error);
    process.exit(1);
  }
}

buildStatic();