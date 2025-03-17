
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
    sourcemap: true,
    emptyOutDir: true,
    // SSR 문제 방지를 위한 설정 추가
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
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
