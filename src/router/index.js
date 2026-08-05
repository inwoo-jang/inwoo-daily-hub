import { createRouter, createWebHistory } from 'vue-router'
import finalRoutes from '../final/routes'

/**
 * 주소표
 * ------------------------------------------------------------------
 * 이 저장소는 최종 결과물 하나만 담는다. 그래서 결과물이 곧 첫 화면이다.
 *
 *   /   결과물 (껍데기 final/index.vue + 그 안의 화면들)
 *
 * 안쪽 주소(/weather · /tarot · /games · /settings …)는 final/routes.js 가 정한다.
 * 환경 설정도 그 안에 둔다 — 바깥에 두면 그 화면만 메뉴가 사라진다.
 * 그쪽 이름은 'final-' 로 시작하는 그대로 두었다 — 두 저장소를 오갈 때
 * 이름이 달라지면 링크를 전부 고쳐야 하기 때문이다.
 */
const routes = [
  {
    path: '/',
    component: () => import('../final/index.vue'),
    children: finalRoutes,
  },
  {
    // 어디에도 걸리지 않은 주소를 전부 받는다. 반드시 맨 마지막이어야 한다.
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  // BASE_URL 을 넣어야 GitHub Pages 의 하위 경로에서도 링크가 맞는다
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  /** 페이지를 옮길 때 스크롤을 어디로 둘지 */
  scrollBehavior(to, from, saved) {
    if (saved) return saved // 뒤로가기 — 보던 자리로 되돌린다
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    if (to.name === from.name) return false
    return { top: 0 }
  },
})

/**
 * 로그인 가드
 * ------------------------------------------------------------------
 * meta.requiresAuth 가 붙은 화면(지금은 My)은 로그인해야 들어간다.
 *
 * 새로고침 직후에는 토큰만 있고 "내가 누구인지"는 아직 모른다.
 * 그래서 들어가기 전에 restore() 로 한 번 물어본다.
 *
 * 막을 때는 그냥 돌려보내지 않고 ?redirect= 에 가려던 주소를 적어 둔다.
 */
router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true

  const { useAuthStore } = await import('../stores/authStore')
  const auth = useAuthStore()
  await auth.restore()

  if (auth.isLoggedIn) return true
  return { name: 'final-login', query: { redirect: to.fullPath } }
})

export default router
