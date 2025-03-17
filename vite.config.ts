
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// GitHub Pages 배포를 위한 설정
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/music-learn-connect/' : '/', // 슬래시(/) 추가
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
