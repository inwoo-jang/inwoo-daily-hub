import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import { initTheme } from './utils/theme'

// 첫 화면이 그려지기 전에 테마를 적용해 색이 번쩍이는 것을 막는다
initTheme()

const app = createApp(App)

// 전역 상태 저장소. 이 줄이 없으면 useAuthStore() 를 부르는 순간 오류가 난다
app.use(createPinia())

/**
 * UI 라이브러리.
 * 조작 요소(입력창 · 알림 · 로딩)만 Element Plus 를 쓰고, 카드와 배경 연출은
 * 직접 만든 것을 그대로 둔다. CSS 를 assets/main.css 보다 먼저 불러야
 * 우리 디자인 토큰이 위에 덮인다.
 */
app.use(ElementPlus)

// 주소 ↔ 화면 연결
app.use(router)

app.mount('#app')

/**
 * 날씨를 미리 받아 둔다.
 *
 * 첫 화면이 곧 결과물이라 어차피 바로 필요하다. 그냥 두면
 * "컴포넌트 실행 → 그제서야 API 호출" 로 줄줄이 기다리게 된다.
 * 이미 신선한 값이 있으면 primeWeather() 가 아무 것도 하지 않는다.
 */
import('./components/weather/weatherApi').then((m) => m.primeWeather())
