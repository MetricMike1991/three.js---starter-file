import restart from 'vite-plugin-restart'
import fs from 'fs'
import path from 'path'

// Build counter logic
const buildCounterPath = path.resolve(__dirname, 'build-counter.txt')
let buildNumber = 1
if (fs.existsSync(buildCounterPath)) {
    buildNumber = parseInt(fs.readFileSync(buildCounterPath, 'utf8')) + 1
}
fs.writeFileSync(buildCounterPath, buildNumber.toString())

export default {
    root: 'src/', // Sources files (typically where index.html is)
    publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
    define: {
        '__BUILD_TIMESTAMP__': JSON.stringify(new Date().toISOString()),
        '__BUILD_NUMBER__': JSON.stringify(buildNumber)
    },
    plugins:
    [
        restart({ restart: [ '../static/**', ] }) // Restart server on static file change
    ],
}