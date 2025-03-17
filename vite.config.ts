
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// GitHub Pages 배포를 위한 설정
export default defineConfig(({ mode }) => ({
  // GitHub Pages 레포지토리 경로 설정
  base: "/music-learn-connect/",
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
        // 모든 에셋에 상대 경로 사용 (GitHub Pages 호환성 개선)
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
      // 경고 무시 설정
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
    // MIME 타입 문제 해결을 위한 headers 설정
    headers: {
      'Content-Type': 'application/javascript',
      'X-Content-Type-Options': 'nosniff'
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
  // 모듈 해석 문제 해결을 위한 추가 설정
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    // 에셋 로드 문제 해결을 위한 추가 설정
    esbuildOptions: {
      target: 'es2020',
      // 정적 자산 처리 개선
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
        '.png': 'file',
        '.jpg': 'file',
        '.svg': 'file',
      }
    }
  },
}));
