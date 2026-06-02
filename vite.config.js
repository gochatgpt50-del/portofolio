import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-paragon-static',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Intercept /paragon/ and /paragon/index.html
          if (req.url === '/paragon/' || req.url === '/paragon' || req.url === '/paragon/index.html') {
            const filePath = path.resolve(__dirname, 'public/paragon/index.html')
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8')
              res.end(fs.readFileSync(filePath, 'utf-8'))
              return
            }
          }
          next()
        })
      }
    }
  ],
})
