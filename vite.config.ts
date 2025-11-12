
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { generateXmlSitemap } from "./src/utils/sitemapGenerator";

const createSitemapPlugin = (): Plugin => {
  return {
    name: "generate-sitemap",
    apply: "build",
    async closeBundle() {
      const sitemapXml = generateXmlSitemap();
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const publicPath = path.resolve(__dirname, "public", "sitemap.xml");
      const distPath = path.resolve(__dirname, "dist", "sitemap.xml");

      await Promise.all([
        fs.mkdir(path.dirname(publicPath), { recursive: true }),
        fs.mkdir(path.dirname(distPath), { recursive: true })
      ]);

      await Promise.all([
        fs.writeFile(publicPath, sitemapXml, "utf8"),
        fs.writeFile(distPath, sitemapXml, "utf8")
      ]);
    }
  };
};

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
    mode !== 'development' && createSitemapPlugin(),
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
          'ui-vendor': ['lucide-react', 'framer-motion'],
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
