import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})



// Installed dependencies:
// - React
// - Tailwind CSS
// - Axios (for HTTP requests)
// - Moment.js (for date formatting)
// - Lucide-React (for icons)
// - Animate.css
// - react-router-dom  (for routeing)