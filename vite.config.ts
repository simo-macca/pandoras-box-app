import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function serveRulesPlugin(): Plugin {
  const copyRulesToDist = () => {
    const srcDir = path.resolve(__dirname, 'rules');
    const destDir = path.resolve(__dirname, 'dist', 'rules');
    if (fs.existsSync(srcDir)) {
      fs.mkdirSync(destDir, { recursive: true });
      for (const file of fs.readdirSync(srcDir)) {
        const srcFile = path.join(srcDir, file);
        const destFile = path.join(destDir, file);
        if (fs.statSync(srcFile).isFile()) {
          fs.copyFileSync(srcFile, destFile);
        }
      }
    }
  };

  return {
    name: 'serve-rules-plugin',
    configureServer(server) {
      server.middlewares.use('/rules', (req, res, next) => {
        const rawUrl = req.url?.split('?')[0] || '';
        const safeUrl = decodeURIComponent(rawUrl).replace(/^\//, '');
        const filePath = path.resolve(__dirname, 'rules', safeUrl);

        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'inline');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/rules', (req, res, next) => {
        const rawUrl = req.url?.split('?')[0] || '';
        const safeUrl = decodeURIComponent(rawUrl).replace(/^\//, '');
        const distPath = path.resolve(__dirname, 'dist', 'rules', safeUrl);
        const rootPath = path.resolve(__dirname, 'rules', safeUrl);
        const filePath = fs.existsSync(distPath) ? distPath : rootPath;

        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'inline');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        next();
      });
    },
    closeBundle() {
      copyRulesToDist();
    },
  };
}

export default defineConfig({
  plugins: [react(), serveRulesPlugin()],
});
