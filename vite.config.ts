
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
      external: [], // 외부 모듈을 명시적으로 지정하지 않음
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['class-variance-authority', 'clsx', 'tailwind-merge'],
        },
        // 모든 에셋에 상대 경로 사용
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
      // @radix-ui 문제 해결을 위한 추가 설정
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || 
            warning.message.includes('Use of eval') ||
            warning.message.includes('BatchedMesh')) {
          return;
        }
        warn(warning);
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
  // 모듈 해석 문제 해결을 위한 추가 설정
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: []
  },
}));
