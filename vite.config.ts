
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// GitHub Pages 배포를 위한 설정
export default defineConfig(({ mode }) => ({
  // 개발 환경에서는 상대 경로, 프로덕션에서는 GitHub Pages 경로 사용
  base: mode === 'production' ? '/music-learn-connect/' : '/',
  build: {
    outDir: "dist",
    sourcemap: true, // 디버깅을 위해 소스맵 활성화
    emptyOutDir: true,
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: {
      compress: {
        drop_console: false, // 디버깅을 위해 콘솔 로그 유지
      },
    },
    // 최적화된 청크 설정
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
        // GitHub Pages 호환성을 위한 상대 경로 사용
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
    headers: {
      // 모든 JavaScript 파일에 적절한 MIME 타입 설정
      "Content-Type": "application/javascript; charset=utf-8"
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@react-three/fiber', '@react-three/drei'],
  },
}));
