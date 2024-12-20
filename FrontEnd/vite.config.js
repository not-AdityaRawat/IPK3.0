import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Enable access via your local IP
    port: 5173, // Optional: specify a port
    proxy:{
      // '/contribute':{
      //   target:'https://ipk3-0-backend.onrender.com',
      //   changeOrigin: true,
      // },
      // '/units':{
      //   target:'https://ipk3-0-backend.onrender.com',
      //   changeOrigin: true,
      // },
      // '/Leaderboard':{
      //   target:'',
      //   changeOrigin: true,
      // }
    },
  },
});
