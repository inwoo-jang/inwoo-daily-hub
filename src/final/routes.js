/**
 * 최종 결과물 · 주소표
 * ------------------------------------------------------------------
 * 여기 적은 경로는 전부 /final 아래에 붙는다.
 *
 *   /final                  홈 — 오늘 한눈에
 *   /final/weather          날씨 — 전국 도시 오늘 현황
 *   /final/weather/:cityId  도시 상세 + 시간별 예보
 *   /final/tarot            운세 — 타로 세 장으로 보는 오늘
 *   /final/games            게임 — 정하기 어려울 때
 *   /final/games/roulette   룰렛 돌리기
 *   /final/games/lotto      로또 번호 뽑기
 *   /final/tests            테스트 — 룰 기반 심리테스트 목록
 *   /final/tests/:testId    테스트 진행 (animal · zombie)
 *   /final/login            로그인 — 운세 기록을 남기려면 필요하다
 *   /final/records          내 운세 기록 (로그인한 사람만)
 *
 * meta.requiresAuth 를 적어 두면 router/index.js 의 가드가 로그인을 확인한다.
 * 화면마다 "로그인했나?"를 따로 검사하지 않기 위해서다.
 *
 * 이름 앞에 'final-' 을 붙여 학습 페이지 쪽 이름과 섞이지 않게 한다.
 * 화면에서 부를 때는 규칙을 외우지 말고 아래 link() 를 쓴다.
 */

/** router.push(link('detail', { cityId: 'seoul' })) → /final/weather/seoul */
export const link = (name, params = {}, query = undefined) => ({
  name: `final-${name}`,
  params,
  ...(query ? { query } : {}),
})

export default [
  {
    // 기본 화면 — /final 로 들어오면 이게 뜬다
    path: '',
    name: 'final-home',
    component: () => import('./views/HomeView.vue'),
  },
  {
    path: 'weather',
    name: 'final-weather',
    component: () => import('./views/DashboardView.vue'),
  },
  {
    // :cityId 자리에 들어온 값을 useRoute() 로 읽는다
    path: 'weather/:cityId',
    name: 'final-detail',
    component: () => import('./views/DetailView.vue'),
  },
  {
    path: 'tarot',
    name: 'final-tarot',
    component: () => import('./views/TarotView.vue'),
  },
  {
    path: 'games',
    name: 'final-games',
    component: () => import('./views/GamesView.vue'),
  },
  {
    path: 'games/roulette',
    name: 'final-roulette',
    component: () => import('./views/RouletteView.vue'),
  },
  {
    path: 'games/lotto',
    name: 'final-lotto',
    component: () => import('./views/LottoView.vue'),
  },
  {
    path: 'tests',
    name: 'final-tests',
    component: () => import('./views/TestsView.vue'),
  },
  {
    // :testId 자리에 animal · zombie 가 들어온다
    path: 'tests/:testId',
    name: 'final-test',
    component: () => import('./views/TestPlayView.vue'),
  },
  {
    path: 'login',
    name: 'final-login',
    component: () => import('./views/LoginView.vue'),
  },
  {
    path: 'records',
    name: 'final-records',
    component: () => import('./views/RecordsView.vue'),
    // 로그인하지 않았다면 가드가 로그인 화면으로 보낸다
    meta: { requiresAuth: true },
  },
  {
    // 이 영역 안에서만 도는 Catch-all. 반드시 형제들 뒤에 와야 한다
    path: ':pathMatch(.*)*',
    name: 'final-missing',
    component: () => import('./views/NotFoundView.vue'),
  },
]
