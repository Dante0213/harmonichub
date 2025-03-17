
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// GitHub Pages 배포를 위한 설정
export default defineConfig(({ mode }) => ({
  // 개발 환경에서는 base를 설정하지 않음
  base: mode === 'production' ? "/music-learn-connect/" : "/",
  build: {
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true,
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
