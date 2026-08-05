<script setup>
/**
 * 최종 결과물 — 껍데기
 * ------------------------------------------------------------------
 * 교안의 App.vue 자리다.
 *   내비게이션 : <RouterLink>
 *   본문       : <RouterView />
 *
 * 주소가 바뀌면 <RouterView /> 자리만 갈아끼워진다.
 * 어떤 주소가 어떤 화면인지는 옆의 routes.js 에 적혀 있다.
 *
 * 색·글꼴은 따로 선언하지 않는다. assets/main.css 의 토큰을 그대로 물려받아야
 * 환경 설정에서 테마를 바꿨을 때 이 화면도 같이 따라온다.
 */
import { computed, onMounted } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import CloverMark from './components/CloverMark.vue'
import UiIcon from '../components/weather/UiIcon.vue'
import WeatherBackdrop from '../components/weather/WeatherBackdrop.vue'
import { useAuthStore } from '../stores/authStore'
import { useRecordStore } from '../stores/recordStore'
import { backdropStatus } from './data/backdropState'
import { link } from './routes'

const route = useRoute()
const router = useRouter()

/** 상세 화면에서도 '날씨' 탭이 눌린 채로 남아야 한다 */
const isWeather = computed(() => route.name === 'final-weather' || route.name === 'final-detail')
const isTarot = computed(() => route.name === 'final-tarot')
/** 테스트 진행 화면에서도 '테스트' 탭이 눌린 채로 남아야 한다 */
const isTests = computed(() => route.name === 'final-tests' || route.name === 'final-test')
/** 게임 목록과 각 게임 화면에서 '게임' 탭이 눌린 채로 남는다 */
const isGames = computed(() =>
  ['final-games', 'final-roulette', 'final-lotto'].includes(route.name),
)
const isRecords = computed(() => route.name === 'final-records')
const isLogin = computed(() => route.name === 'final-login')
const isSettings = computed(() => route.name === 'final-settings')
const isAdminPage = computed(() => route.name === 'final-admin')
const isHome = computed(
  () =>
    !isWeather.value &&
    !isTarot.value &&
    !isTests.value &&
    !isGames.value &&
    !isRecords.value &&
    !isSettings.value &&
    !isAdminPage.value &&
    !isLogin.value,
)

/**
 * 로그인 상태는 내비게이션이 늘 보여 준다.
 * 지금 누구인지 모른 채로 '기록' 탭만 덩그러니 있으면,
 * 눌러 보고 나서야 로그인이 필요하다는 걸 알게 된다.
 */
const auth = useAuthStore()
const { isLoggedIn, isAdmin, displayName } = storeToRefs(auth)
const recordStore = useRecordStore()

// 새로고침해도 로그인이 유지되도록, 저장해 둔 토큰이 살아 있는지 한 번 확인한다
onMounted(() => auth.restore())

const logout = () => {
  auth.logout()
  // 내 기록이 다음 사람 화면에 남아 있으면 안 된다
  recordStore.clear()
  ElMessage.success({ message: '로그아웃했습니다.', duration: 1600 })
  // 기록 화면에 서 있었다면 그대로 둘 수 없다
  if (route.meta.requiresAuth) router.replace(link('home'))
}
</script>

<template>
  <div class="final">
    <!-- 보고 있는 도시의 날씨가 배경이 된다 -->
    <WeatherBackdrop :status="backdropStatus" />

    <!--
      맨 윗줄. 배경 위에 그대로 얹혀 투명하다.
      로고는 화면 왼쪽 끝, 로그인과 톱니는 오른쪽 끝에 붙는다.
      메뉴는 그 아래 줄에서 본문과 같은 폭을 쓴다.
    -->
    <header class="topbar">
      <!--
        마크와 글자를 따로 둔다.
        하나의 그림으로 두면 사이 간격도 글자 크기도 손댈 수 없다.
      -->
      <RouterLink class="brand" :to="link('home')">
        <CloverMark :size="30" />
        <span>Daily Hub</span>
      </RouterLink>

      <!-- 오른쪽 끝 — 로그인 상태와 환경 설정 -->
      <div class="side">
        <!-- 지금 관리자로 보고 있다는 것을 늘 알려 준다 -->
        <span v-if="isAdmin" class="admin-badge">ADMIN MODE</span>

        <span v-if="isLoggedIn" class="who">
          <b>{{ displayName }}</b>
          <button type="button" @click="logout">로그아웃</button>
        </span>
        <RouterLink v-else :to="link('login')" class="sign tint-cta" :class="{ on: isLogin }">
          로그인
        </RouterLink>

        <RouterLink class="gear" :to="link('settings')" :class="{ on: isSettings }" title="환경 설정">
          <UiIcon name="gear" :size="18" />
          <span class="sr-only">환경 설정</span>
        </RouterLink>
      </div>
    </header>

    <!-- 메뉴는 아래 본문과 같은 폭을 쓴다. 창을 줄이면 같이 줄어든다 -->
    <div class="navbar">
      <nav class="nav">
        <RouterLink :to="link('home')" :class="{ on: isHome }">홈</RouterLink>
        <RouterLink :to="link('weather')" :class="{ on: isWeather }">날씨</RouterLink>
        <RouterLink :to="link('tarot')" :class="{ on: isTarot }">운세</RouterLink>
        <RouterLink :to="link('tests')" :class="{ on: isTests }">테스트</RouterLink>
        <RouterLink :to="link('games')" :class="{ on: isGames }">게임</RouterLink>
        <RouterLink :to="link('records')" :class="{ on: isRecords }">My</RouterLink>

        <!-- 관리자에게만 보인다. 화면을 막는 일은 가드와 서버가 따로 한다 -->
        <RouterLink v-if="isAdmin" :to="link('admin')" class="admin-tab" :class="{ on: isAdminPage }">
          관리
        </RouterLink>
      </nav>
    </div>

    <!-- 홈 · 날씨 · 운세가 전부 같은 폭을 쓰도록 한 기둥 안에 넣는다 -->
    <div class="column">
      <!-- 주소에 맞는 화면이 여기 놓인다 -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
/*
 * 화면을 통째로 쓴다.
 * 바깥에 헤더가 없으므로 날씨 배경이 맨 위부터 맨 아래까지 이어진다.
 * 둥근 모서리와 여백을 두면 "페이지 안의 상자" 처럼 보여서 뺐다.
 */
/*
 * 화면 한 판.
 *
 * 위에서부터 [로고 줄] [메뉴 줄] [본문] 세 칸으로 나누고, 본문만 남는 높이를
 * 전부 가져간다. 그래야 내용이 적은 화면(게임·테스트)과 많은 화면(날씨)의
 * 판 크기가 같아진다 — 탭을 옮길 때 판이 늘었다 줄었다 하지 않는다.
 *
 * dvh 를 쓰는 이유 — 모바일은 주소창이 접혔다 펴지며 100vh 가 흔들린다.
 */
.final {
  /*
   * 메뉴·본문이 함께 쓰는 폭.
   *
   * 안쪽 화면들은 원래 660px 안에서 만든 것이라 폭을 넓히면 카드가 늘어지고
   * 글줄이 길어져 헐거워 보인다. 그 폭에서 조금만 여유를 준 값으로 둔다.
   */
  --shell: min(720px, 100% - 28px);

  position: relative;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
  overflow: hidden;
  height: 100vh;
  height: 100dvh;
  background: var(--paper);
}

/* 배경(z-index 0) 위에 내용이 오도록 */
.final > *:not(.backdrop) {
  position: relative;
  z-index: 1;
}

/*
 * 화면의 폭을 여기 한 곳에서 정한다.
 * 안에 들어오는 화면은 자기 너비를 신경 쓰지 않아도 되고,
 * 그래서 홈에서 날씨로 넘어가도 판이 흔들리지 않는다.
 */
/*
 * 맨 윗줄 — 셋을 1fr auto 1fr 로 나눠 메뉴가 화면 한가운데에 오게 한다.
 * space-between 으로는 이름표와 톱니의 폭이 달라 메뉴가 한쪽으로 밀린다.
 */
/* 로고와 오른쪽 묶음은 화면 양 끝에 붙는다 */
.topbar {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px 12px;
}

/*
 * 메뉴 줄과 본문은 같은 폭(--shell)을 쓴다.
 * 값을 한 곳에 두어야 한쪽만 고쳐 줄이 어긋나는 일이 없다.
 */
.navbar,
.column {
  width: var(--shell);
  margin: 0 auto;
}

.navbar .nav {
  display: flex;
  width: 100%;
}

/* 탭이 남는 폭을 똑같이 나눠 가진다 */
.navbar .nav > a:not(.sign) {
  flex: 1;
  text-align: center;
}

.side {
  display: flex;
  gap: 6px;
  align-items: center;
}

/* 관리자 표시 — 지금 어떤 권한으로 보고 있는지 */
.admin-badge {
  padding: 5px 10px;
  border: 1px solid rgb(255 255 255 / 0.5);
  border-radius: 999px;
  background: rgb(214 96 84 / 0.85);
  color: #fff;
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

/* 관리 탭도 색으로 구분해 둔다 — 다른 탭과 성격이 다르다 */
.navbar .nav > a.admin-tab {
  color: var(--danger);
}

.navbar .nav > a.admin-tab.on {
  background: var(--danger);
  color: #fff;
}

/*
 * 알약 밖으로 나왔으니 자기 몫의 자리를 직접 잡는다.
 *
 * 하늘 배경 위에서는 옅은 청회색 글자가 잘 안 보인다. 흰 글자에 흰 테를
 * 두르고 안쪽만 살짝 비치게 두면, 맑은 날에도 흐린 날에도 또렷하다.
 */
.side .sign {
  padding: 8px 22px;
  border: 1px solid rgb(255 255 255 / 0.55);
  border-radius: 999px;
  background: rgb(255 255 255 / 0.18);
  color: #fff;
  font-size: 13px;
  text-decoration: none;
  text-shadow: 0 1px 3px rgb(20 30 45 / 0.35);
}

.side .sign:hover {
  border-color: rgb(255 255 255 / 0.8);
  background: rgb(255 255 255 / 0.3);
  color: #fff;
}

.side .who {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 5px 5px 5px 12px;
  border-radius: 999px;
  background: var(--panel);
  backdrop-filter: blur(10px);
}

/* 배경만 전체를 쓰고, 읽는 것들은 가운데로 모은다 */
/*
 * 본문. 높이는 남는 만큼으로 고정하고, 넘칠 때만 이 안에서 스크롤한다.
 * 페이지 전체가 늘어나면 메뉴가 위로 밀려 올라가 자리가 흔들린다.
 */
.column {
  overflow-y: auto;
  overscroll-behavior: contain;
  /* 배경 날씨가 판 위아래로 보이도록 숨 쉴 자리를 둔다 */
  padding: 12px 0 16px;

  /*
   * 위아래 끝을 옅게 지운다.
   *
   * 굴리면 카드가 메뉴 알약 바로 밑까지 올라와 잘린 채로 걸려 있었다.
   * 선을 하나 긋는 방법도 있지만, 그러면 이 화면에 없던 칸막이가 생긴다.
   * 대신 끝에서 서서히 사라지게 두면 "여기서부터 접힌다"가 저절로 읽힌다.
   */
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    #000 18px,
    #000 calc(100% - 14px),
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0,
    #000 18px,
    #000 calc(100% - 14px),
    transparent 100%
  );
  display: grid;
  /*
   * minmax(0, 1fr) 이 없으면 안 되는 이유 —
   * grid 칸은 기본이 min-width: auto 라, 시간별 예보처럼 가로로 긴 내용이
   * 들어오면 칸이 그만큼 벌어져 max-width 를 넘어가 버린다.
   * 0 을 최소로 못박아야 넘치는 대신 그 안에서 스크롤된다.
   */
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  gap: 12px;
}

/*
 * 스크롤 막대는 평소엔 숨고, 마우스를 올리면 흰 막대가 뜬다.
 *
 * 폭은 늘 잡아 두고 색만 투명 ↔ 흰색으로 바꾼다. 폭을 0 에서 키우면
 * 그때마다 안쪽 내용이 밀려 글자가 흔들린다.
 */
.column {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 0.25s ease;
}

.column:hover,
.column:focus-within {
  scrollbar-color: rgb(255 255 255 / 0.55) transparent;
}

.column::-webkit-scrollbar {
  width: 10px;
}

.column::-webkit-scrollbar-track {
  background: transparent;
}

.column::-webkit-scrollbar-thumb {
  border: 3px solid transparent;
  border-radius: 99px;
  background: transparent;
  background-clip: content-box;
  transition: background 0.25s ease;
}

.column:hover::-webkit-scrollbar-thumb {
  background: rgb(255 255 255 / 0.6);
  background-clip: content-box;
}

.column:hover::-webkit-scrollbar-thumb:hover {
  background: rgb(255 255 255 / 0.85);
  background-clip: content-box;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  align-items: center;
  padding: 2px;
  border-radius: 999px;
  background: var(--panel);
  backdrop-filter: blur(10px);
}

.nav a {
  padding: 8px 16px;
  border-radius: 999px;
  color: var(--muted);
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  transition:
    color 0.2s ease,
    background 0.2s ease;
}

.nav a:hover {
  color: var(--ink);
}

/* 채워 넣는 것은 '어디에 있는지'를 알리는 섹션 탭뿐. 로그인은 유리 버튼이라 뺀다 */
.nav a.on:not(.sign) {
  color: var(--on-accent);
  background: var(--accent);
}

/* 주소가 접혔을 때도 로그인 버튼은 오른쪽 끝에 붙어 있어야 한다 */
.url-gap {
  margin-left: auto;
}

/*
 * 로고는 흰색이다. 맑은 하늘 배경에서는 잘 보이지만 옅은 하늘·흐린 날에는
 * 묻히므로, 아주 옅은 그림자를 깔아 어떤 배경에서도 가장자리가 살게 한다.
 */
/*
 * 흰 로고다. 맑은 하늘에서는 잘 보이지만 옅은 하늘·흐린 날에는 묻히므로
 * 아주 옅은 그림자를 깔아 어떤 배경에서도 가장자리가 살게 한다.
 */
.brand {
  display: inline-flex;
  gap: 9px;
  align-items: center;
  color: #fff;
  text-decoration: none;
}

/* 마크는 글자와 같은 색(흰색)을 물려받는다 */
.brand :deep(.clover) {
  filter: drop-shadow(0 1px 3px rgb(20 30 45 / 0.38));
}

.brand span {
  font-family: var(--font-brand);
  font-size: 23px;
  font-weight: 600;
  letter-spacing: -0.005em;
  text-shadow: 0 1px 3px rgb(20 30 45 / 0.4);
}

/* 톱니는 화면 오른쪽 끝 */
.gear {
  display: grid;
  justify-self: end;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--muted);
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.gear:hover {
  background: var(--panel);
  color: var(--ink);
}

.gear.on {
  color: var(--slate-deep);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}

.url {
  margin-left: auto;
  padding: 0 12px;
  color: var(--faint);
  font-family: var(--font-mono);
  font-size: 11.5px;
  overflow-wrap: anywhere;
}

/* ── 로그인 자리 ── */
.who {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding-right: 6px;
  white-space: nowrap;
}

.who b {
  color: var(--ink-soft);
  font-size: 12.5px;
}

.who button {
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--panel-strong);
  color: var(--muted);
  cursor: pointer;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
}

.who button:hover {
  border-color: var(--danger);
  color: var(--danger);
}

/*
 * 로그인은 '어디에 있는지'가 아니라 '할 일'이라, 홈·날씨·운세처럼 꽉 채우지 않는다.
 * 테두리만 두른 채 옆의 로그아웃 버튼과 같은 모양을 쓴다.
 *
 * .on 까지 함께 적어 두는 이유 —
 * 로그인 화면에 서 있으면 위의 .nav a.on 이 배경을 초록으로 칠한다.
 * 여기서 글자색만 바꾸면 초록 글자에 초록 배경이 되어 글자가 사라진다.
 * (실제로 그렇게 만들어 메뉴에 구멍이 뚫린 것처럼 보였다.)
 * 그래서 배경·글자색을 한 벌로 같이 정한다.
 */
/*
 * 로그인은 main.css 의 .tint-cta 를 쓴다 — 늘 떠 있는 자리라 조용해야 한다.
 * 여기서는 자리와 크기만 잡고 색은 건드리지 않는다 — 두 곳이 어긋나지 않도록.
 */
.nav a.sign {
  padding: 8px 18px;
  /* .nav a 의 회색이 .tint-cta 를 덮으므로 여기서 다시 잡아 준다 */
  color: var(--slate);
}

.nav a.sign:hover {
  color: var(--slate-deep);
}

/*
 * 지금 로그인 화면에 있으면 조금 더 진하게.
 *
 * 예전에는 translateY 로 눌린 것처럼 보였는데, 그러면 이 버튼만 아래로
 * 내려가 메뉴 줄의 위아래가 어긋나 보였다. 자리는 그대로 두고 색만 바꾼다.
 */
.nav a.sign.on {
  border-color: color-mix(in srgb, var(--slate) 44%, transparent);
  background: color-mix(in srgb, var(--slate) 20%, transparent);
  color: var(--slate-deep);
}

/* ── 좁은 화면 ── */
@media (max-width: 720px) {
  .final {
    --shell: calc(100% - 20px);
  }

  .topbar {
    padding: 10px 12px 8px;
  }

  .brand :deep(.clover) {
    width: 25px;
    height: 25px;
  }

  .brand span {
    font-size: 19px;
  }

  /* 탭 여섯 개가 한 줄에 들어와야 하므로 글자와 여백을 줄인다 */
  .navbar .nav > a:not(.sign) {
    padding: 9px 2px;
    font-size: 12.5px;
  }

  .column {
    padding-bottom: 20px;
  }

  /* 이름을 접고 버튼만 남긴다 */
  .who b {
    display: none;
  }

  .side .sign {
    padding: 7px 13px;
    font-size: 12.5px;
  }
}

@media (max-width: 380px) {
  .navbar .nav > a:not(.sign) {
    padding: 9px 0;
    font-size: 11.5px;
  }
}
</style>
