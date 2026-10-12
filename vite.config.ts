import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFile, stat } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import { componentTagger } from "lovable-tagger";
import { getLegacyVeneersPath } from "./src/constants/legacyVeneers";

const legacyVeneersDocumentsPlugin = (): Plugin => {
  let publicDirectory: string;
  let outputDirectory: string;

  const serveDocument = (directory: string) => async (request: IncomingMessage, response: ServerResponse, next: () => void) => {
    if (!request.url || (request.method !== 'GET' && request.method !== 'HEAD')) return next();
    const requestUrl = new URL(request.url, 'http://localhost');
    const archivePath = getLegacyVeneersPath(requestUrl.pathname);
    if (!archivePath) {
      const isArchiveFile = requestUrl.pathname.startsWith('/veneers/') &&
        (requestUrl.pathname.startsWith('/veneers/assets/') || /\.[^/]+$/.test(requestUrl.pathname));
      if (!isArchiveFile) return next();

      try {
        const filePath = path.resolve(directory, decodeURIComponent(requestUrl.pathname).slice(1));
        const archiveDirectory = path.join(directory, 'veneers');
        const relativePath = path.relative(archiveDirectory, filePath);
        if (!relativePath.startsWith('..') && !path.isAbsolute(relativePath) && (await stat(filePath)).isFile()) {
          // Vite still serves existing archive assets with its normal MIME
          // types, headers and streaming. Only its SPA fallback is bypassed.
          return next();
        }
      } catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        if (!(error instanceof URIError) && code !== 'ENOENT' && code !== 'ENOTDIR') {
          response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          response.end(request.method === 'HEAD' ? undefined : 'Archived veneers file could not be loaded.');
          return;
        }
      }

      response.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      });
      response.end(request.method === 'HEAD' ? undefined : 'Archived veneers file not found.');
      return;
    }

    // Match the production trailing-slash canonical convention, including
    // /veneers itself. Query parameters survive the document redirect.
    if (requestUrl.pathname !== archivePath) {
      response.writeHead(308, { Location: `${archivePath}${requestUrl.search}` });
      response.end();
      return;
    }

    try {
      const html = await readFile(path.join(directory, archivePath.slice(1), 'index.html'));
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      });
      response.end(request.method === 'HEAD' ? undefined : html);
    } catch (error) {
      // An incomplete archive must be visible during QA, never silently served
      // as the modern main-site document by Vite's SPA fallback.
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end(request.method === 'HEAD' ? undefined : 'Archived veneers page not found.');
      } else {
        response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end(request.method === 'HEAD' ? undefined : 'Archived veneers page could not be loaded.');
      }
    }
  };

  return {
    name: 'legacy-veneers-documents',
    configResolved(config) {
      publicDirectory = config.publicDir;
      outputDirectory = path.resolve(config.root, config.build.outDir);
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (!request.url || new URL(request.url, 'http://localhost').pathname !== '/veneers/measurement-entry.js') return next();
        if (request.method !== 'GET' && request.method !== 'HEAD') return next();
        response.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-cache' });
        response.end(request.method === 'HEAD' ? undefined : `
import '/@vite/client';
import RefreshRuntime from '/@react-refresh';
RefreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;
window.__vite_plugin_react_preamble_installed__ = true;
await import('/src/legacy/veneersMeasurement.tsx');
`);
      });
      server.middlewares.use(serveDocument(publicDirectory));
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveDocument(outputDirectory));
    },
  };
};

const googleSiteVerificationPlugin = (rawToken?: string): Plugin => {
  const token = rawToken?.trim();
  const validToken = token && /^[A-Za-z0-9_-]+$/.test(token) ? token : undefined;

  return {
    name: "conditional-google-site-verification",
    transformIndexHtml: validToken
      ? {
          order: "pre",
          handler: () => [{
            tag: "meta",
            attrs: {
              name: "google-site-verification",
              content: validToken,
            },
            injectTo: "head",
          }],
        }
      : () => [],
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  if (env.VERCEL_ENV === 'production'
    && !/^[a-zA-Z0-9_-]{1,128}$/.test(env.VITE_OPENAI_ADS_PIXEL_ID?.trim() ?? '')) {
    throw new Error('Production requires a valid VITE_OPENAI_ADS_PIXEL_ID for campaign measurement.');
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      legacyVeneersDocumentsPlugin(),
      react(),
      googleSiteVerificationPlugin(env.VITE_GSC_VERIFICATION),
      mode === 'development' && componentTagger(),
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
        input: {
          main: path.resolve(__dirname, 'index.html'),
          veneersMeasurement: path.resolve(__dirname, 'src/legacy/veneersMeasurement.tsx'),
        },
        output: {
          entryFileNames: (chunk) => chunk.name === 'veneersMeasurement'
            ? 'veneers/measurement-entry.js'
            : 'assets/[name]-[hash].js',
          manualChunks: {
            // Only essential vendor chunks
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['lucide-react']
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
  };
});
