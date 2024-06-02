import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   commonjsOptions: {
//     esmExternals: true,
//  },
// })
// export default defineConfig(({mode}) => {
//   const env = loadEnv(mode, process.cwd());
//   console.log('env', env)

//   return {
//     plugins: [react()],
//     build: {
//       outDir: "./wwwroot/app/",
//       sourcemap: true,
//     },
//     server: {
//       port: env.VITE_PORT,
//     },
//   };
// });


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API_URL = `${env.VITE_API_URL ?? 'http://localhost:3025'}`;
  //or leave it empty const API_URL = `${env.VITE_API_URL ?? ''}`;

  return {
    server: {
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [react()],
  };
});