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
    id: 'editorial',
    name: '데이라이트',
    tagline: '기본',
    description: '따뜻한 종이 위의 초록. 날씨 배경이 가장 잘 비치는 기본 화면입니다.',
    swatches: ['#f6f4ef', '#fffefb', '#0f7a4e', '#16191c'],
  },
  {
    id: 'terminal',
    name: '나이트',
    tagline: '어두운 화면',
    description: '밤에 보기 편한 짙은 화면. 같은 초록을 밝기만 올려 낮과 같은 얼굴을 유지합니다.',
    swatches: ['#1a1f27', '#242b35', '#4fae7e', '#eef1f5'],
  },
  {
    id: 'blueprint',
    name: '스카이',
    tagline: '맑은 하늘',
    description: '차갑고 맑은 청색. 하늘 배경과 같은 결로 화면 전체를 파랗게 맞춥니다.',
    swatches: ['#eef1f6', '#ffffff', '#1d4ed8', '#12213a'],
  },
]

const STORAGE_KEY = 'inwoo-vue-theme'
const DEFAULT_THEME = 'editorial'

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
