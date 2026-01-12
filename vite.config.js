import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable fast refresh for better development experience with animations
      fastRefresh: true,
    }),
    tailwindcss(),
  ],
  optimizeDeps: {
    // Pre-bundle animation libraries for better performance
    include: [
      'gsap',
      'gsap/ScrollTrigger',
      'gsap/TextPlugin',
      'framer-motion',
      'lottie-react',
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ],
  },
  build: {
    // Optimize for animation assets
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate animation libraries into their own chunks
          'animation-libs': ['gsap', 'framer-motion', 'lottie-react'],
          'three-libs': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
  server: {
    // Enable hot reloading for better animation development
    hmr: {
      overlay: true,
    },
  },
})
