import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
  build: {
    // Optimize build output
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
        unused: true
      },
      mangle: {
        safari10: true
      }
    },
    // Simplified chunking strategy
    rollupOptions: {
      output: {
        manualChunks: {
          // Only essential vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'motion-vendor': ['framer-motion'],
          'sentry': ['@sentry/react']
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Disable source maps for production to reduce bundle size
    sourcemap: mode === 'development',
    // CSS code splitting
    cssCodeSplit: true,
    // CSS minification
    cssMinify: true
  },
  optimizeDeps: {
    // Pre-bundle dependencies for faster dev server startup
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@vite/client', '@vite/env']
  }
}));
