
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// GitHub Pages 배포를 위한 설정
export default defineConfig(({ mode }) => ({
  // 개발 환경에서는 base를 설정하지 않고, 프로덕션에서만 base 경로 설정
  base: mode === 'production' ? "/music-learn-connect/" : "/",
  build: {
    outDir: "dist",
    // 빌드 성능 개선을 위해 소스맵 비활성화
    sourcemap: false,
    emptyOutDir: true,
    // 최적화 설정
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
      compress: {
        drop_console: false, // 콘솔 로그 유지 (디버깅 목적)
      },
    },
    // 청크 사이즈 최적화
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui', 'class-variance-authority', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
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
}));
