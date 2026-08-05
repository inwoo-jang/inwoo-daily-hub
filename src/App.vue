<script setup>
import { RouterLink, RouterView } from 'vue-router'

/**
 * 화면 전환은 라우터가 맡는다.
 * 예전에는 여기서 location.hash 를 직접 읽어 컴포넌트를 갈아끼웠는데,
 * 그 일(주소 감시 · 화면 선택 · 현재 메뉴 표시)을 전부 라우터가 대신한다.
 */
const MENU = [{ to: '/settings', label: '환경 설정' }]
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <RouterLink class="brand" to="/">
        <span class="brand-mark">D</span>
        <span>Daily Hub</span>
      </RouterLink>

      <nav class="main-nav" aria-label="주요 메뉴">
        <!-- RouterLink 는 현재 주소와 맞으면 router-link-active 를 알아서 붙여 준다 -->
        <RouterLink
          v-for="item in MENU"
          :key="item.to"
          :to="item.to"
          :class="{ exact: item.exact }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </header>

    <main class="page-container">
      <!-- 주소에 맞는 화면이 놓이는 자리 -->
      <RouterView />
    </main>
  </div>
</template>

<style>
.app-shell {
  min-height: 100vh;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px max(24px, calc((100vw - 1180px) / 2));
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--paper) 88%, transparent);
  backdrop-filter: saturate(1.4) blur(10px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.brand-mark {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 9px;
  color: var(--on-accent);
  background: var(--accent);
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}

.main-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
}

.main-nav a {
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--muted);
  font-size: 14px;
  font-weight: 700;
}

/* router-link-active 는 앞부분만 맞아도 켜진다(/project → /project/3).
   '/'는 모든 주소의 앞부분이라 홈만 exact-active 로 따로 본다. */
.main-nav a:hover,
.main-nav a.router-link-active:not(.exact),
.main-nav a.exact.router-link-exact-active {
  color: var(--ink);
  background: var(--accent-tint);
}

.page-container {
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: 48px 0 80px;
}

@media (max-width: 760px) {
  .app-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .main-nav {
    justify-content: flex-start;
  }

  .page-container {
    width: min(100% - 32px, 1180px);
    padding-top: 32px;
  }
}
</style>
