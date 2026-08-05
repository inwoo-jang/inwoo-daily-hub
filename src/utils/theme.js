/**
 * 테마 전환
 * ------------------------------------------------------------------
 * 색은 전부 CSS 변수(assets/main.css)에 정의되어 있고,
 * 여기서는 <html>에 data-theme 속성만 바꿔 끼운다.
 * 고른 테마는 localStorage에 남아 새로고침해도 유지된다.
 */
import { ref } from 'vue'

export const THEMES = [
  {
    id: 'editorial',
    name: 'Editorial',
    tagline: '기술 문서',
    description: '따뜻한 종이 위에 근접 블랙으로 찍은 인쇄물. 색을 아끼고 여백으로 읽힙니다.',
    swatches: ['#f6f4ef', '#fffefb', '#0f7a4e', '#16191c'],
  },
  {
    id: 'terminal',
    name: 'Terminal',
    tagline: '다크 IDE',
    description: '코드를 오래 보는 화면. 저조도 배경에 형광 민트로 눌러야 할 곳만 밝힙니다.',
    swatches: ['#14181f', '#1b212b', '#3ddc97', '#e8edf4'],
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    tagline: '설계도',
    description: '모눈종이 위의 도면. 차가운 청색과 각진 모서리로 구조를 드러냅니다.',
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
