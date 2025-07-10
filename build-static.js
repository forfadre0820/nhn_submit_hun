import { build } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function buildStatic() {
  try {
    // Build the client
    await build({
      root: resolve(__dirname, 'client'),
      build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
          input: resolve(__dirname, 'client/index.html')
        }
      }
    })

    // Copy static assets if they exist
    try {
      await fs.cp(
        resolve(__dirname, 'attached_assets'),
        resolve(__dirname, 'dist/attached_assets'),
        { recursive: true }
      )
      console.log('✓ Static assets copied')
    } catch (error) {
      console.log('No static assets to copy')
    }

    console.log('✓ Static build completed!')
    console.log('✓ Files ready for GitHub Pages deployment')
    
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

buildStatic()