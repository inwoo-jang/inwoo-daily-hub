import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  /*
   * 배포처마다 사는 자리가 다르다.
   *   GitHub Pages : https://inwoo-jang.github.io/inwoo-daily-hub/ → 하위 경로
   *   Vercel       : https://<프로젝트>.vercel.app/            → 루트
   *   개발 서버     : http://localhost:5173/                   → 루트
   *
   * Vercel 은 빌드할 때 VERCEL 환경변수를 넣어 주므로 그걸로 가른다.
   *
   * preview 는 command 가 'serve' 지만 빌드 결과물을 그대로 띄우는 것이라
   * 빌드와 같은 base 를 써야 한다. 아니면 자산 주소가 어긋나 빈 화면이 된다.
   */
  base: (command === 'build' || isPreview) && !process.env.VERCEL ? '/inwoo-daily-hub/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  /*
   * 개발 서버 프록시 — 운세 기록 Mock API(npm run api, 3001 포트)
   *
   * 화면은 그냥 /api/... 로 부르고, Vite 가 3001 로 넘겨 준다.
   * 이렇게 하면 좋은 점이 셋이다.
   *   ① 같은 출처가 되어 CORS 를 신경 쓸 필요가 없다
   *   ② 5173 이 이미 쓰이고 있어 5174 로 밀려도 그대로 동작한다
   *   ③ .env.local 이 없는 사람이 받아도 바로 돌아간다
   *
   * VITE_API_BASE 를 적어 두면 그 주소가 이기고 이 프록시는 쓰이지 않는다.
   * (예: 다른 컴퓨터에 띄운 API 를 볼 때)
   *
   */
  server: {
    proxy: {
      '^/api/(auth|fortune-records|admin|health|reset)': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
}))
