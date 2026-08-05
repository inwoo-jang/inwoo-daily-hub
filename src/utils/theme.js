/**
 * 테마 전환
 * ------------------------------------------------------------------
 * 색은 전부 CSS 변수(assets/main.css)에 정의되어 있고,
 * 여기서는 <html>에 data-theme 속성만 바꿔 끼운다.
 * 고른 테마는 localStorage에 남아 새로고침해도 유지된다.
 */
import { ref } from 'vue'

export const THEMES = [
  /*
   * id 는 그대로 둔다 — 이미 저장해 둔 값이 있는 사람의 설정이 풀리지 않도록.
   * 보이는 이름과 색만 이 앱에 맞게 고쳤다.
   */
  {
    id: 'blueprint',
    name: '스카이',
    tagline: '기본',
    description: '맑은 한낮의 하늘빛. 날씨 배경과 가장 잘 어울리는 기본 화면입니다.',
    swatches: ['#eff4fa', '#fdfeff', '#3f74a8', '#1b2a3d'],
    sky: ['#a8c8e6', '#dfeaf6'],
  },
  {
    id: 'terminal',
    name: '나이트',
    tagline: '어두운 화면',
    description: '밤에 보기 편한 짙은 화면. 달빛에 가까운 남보라로 눌러야 할 곳만 밝힙니다.',
    swatches: ['#171a23', '#212632', '#8c9cf0', '#eef1f5'],
    sky: ['#1d2333', '#2b3350'],
  },
  {
    id: 'editorial',
    name: '데이라이트',
    tagline: '따뜻한 종이',
    description: '따뜻한 종이 위의 초록. 색을 아끼고 여백으로 읽는 화면입니다.',
    swatches: ['#f6f4ef', '#fffefb', '#0f7a4e', '#16191c'],
    // 미리보기 하늘 — 그 테마에서 이 앱이 어떤 공기인지 한눈에 보이도록
    sky: ['#cfe2f5', '#eef4fb'],
  },
]

const STORAGE_KEY = 'inwoo-vue-theme'
const DEFAULT_THEME = 'blueprint'

const isKnown = (id) => THEMES.some((t) => t.id === id)

/** 현재 테마 id. 화면 어디서든 import해서 읽고 쓸 수 있다. */
export const currentTheme = ref(DEFAULT_THEME)

export const setTheme = (id) => {
  if (!isKnown(id)) return
  currentTheme.value = id
  document.documentElement.dataset.theme = id
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // 시크릿 모드 등 저장이 막힌 환경에서는 이번 세션에만 적용한다
  }
}

/** 앱이 뜰 때 한 번 호출한다. */
export const initTheme = () => {
  // 읽기가 막히면 null 인 채로 남고, 아래에서 기본 테마로 넘어간다
  let saved = null
  try {
    saved = localStorage.getItem(STORAGE_KEY)
  } catch {
    // 시크릿 모드 등 저장소 접근이 막힌 환경
  }
  setTheme(isKnown(saved) ? saved : DEFAULT_THEME)
}
