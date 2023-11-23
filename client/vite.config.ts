import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ react() ],
    resolve: {
        alias: {
            '$assets': path.resolve(__dirname, './src/assets'),
            '$components': path.resolve(__dirname, './src/components'),
            '$constants': path.resolve(__dirname, './src/constants'),
            '$contexts': path.resolve(__dirname, './src/contexts'),
            '$features': path.resolve(__dirname, './src/features'),
            '$hooks': path.resolve(__dirname, './src/hooks'),
            '$layout': path.resolve(__dirname, './src/layout'),
            '$skeletons': path.resolve(__dirname, './src/layout/skeletons'),
            '$lib': path.resolve(__dirname, './src/lib'),
            '$api': path.resolve(__dirname, './src/lib/api'),
            '$pages': path.resolve(__dirname, './src/pages'),
            '$styles': path.resolve(__dirname, './src/styles'),
            '$themes': path.resolve(__dirname, './src/themes'),
            '$types': path.resolve(__dirname, './src/types'),
            '$store': path.resolve(__dirname, './src/store'),
            '$utils': path.resolve(__dirname, './src/utils')
        }
    }
})
