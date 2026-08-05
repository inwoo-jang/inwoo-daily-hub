<script setup>
import BaseDashboardCard from '../components/weather/BaseDashboardCard.vue'
import { currentTheme, setTheme, THEMES } from '../utils/theme'

/**
 * 환경 설정 — /settings
 *
 * 고를 것은 테마 하나뿐이다. 그래서 설명을 길게 쓰기보다,
 * 고르면 어떤 화면이 되는지 작은 그림으로 바로 보여 준다.
 * 미리보기는 이 앱의 실제 모습(메뉴 알약 + 카드)을 그대로 축소한 것이다.
 */
</script>

<template>
  <BaseDashboardCard>
    <div class="settings">
      <header class="head">
        <p class="eyebrow">SETTINGS</p>
        <h3>환경 설정</h3>
        <p class="lead">
          고른 테마는 <b>이 브라우저에 저장</b>되어 다음에 열어도 그대로 유지됩니다.
        </p>
      </header>

      <section class="block">
        <p class="section-label">화면 테마</p>

        <div class="theme-grid">
          <button
            v-for="theme in THEMES"
            :key="theme.id"
            type="button"
            class="theme-card"
            :class="{ active: currentTheme === theme.id }"
            :aria-pressed="currentTheme === theme.id"
            @click="setTheme(theme.id)"
          >
            <!-- 그 테마의 색으로 이 앱 화면을 작게 그려 둔다 -->
            <span class="preview" :style="{ background: theme.swatches[0] }" aria-hidden="true">
              <span class="p-nav" :style="{ background: theme.swatches[1] }">
                <i class="p-tab on" :style="{ background: theme.swatches[2] }" />
                <i class="p-tab" :style="{ background: theme.swatches[3], opacity: 0.22 }" />
                <i class="p-tab" :style="{ background: theme.swatches[3], opacity: 0.22 }" />
              </span>

              <span class="p-card" :style="{ background: theme.swatches[1] }">
                <i class="p-line" :style="{ background: theme.swatches[3], opacity: 0.8 }" />
                <i class="p-line short" :style="{ background: theme.swatches[3], opacity: 0.32 }" />
                <i class="p-dot" :style="{ background: theme.swatches[2] }" />
              </span>
            </span>

            <span class="meta">
              <span class="name-row">
                <b>{{ theme.name }}</b>
                <small>{{ theme.tagline }}</small>
                <span v-if="currentTheme === theme.id" class="badge">사용 중</span>
              </span>
              <span class="desc">{{ theme.description }}</span>
            </span>
          </button>
        </div>
      </section>

      <section class="block">
        <p class="section-label">이 사이트</p>
        <dl class="facts">
          <dt>이름</dt>
          <dd>Daily Hub — 오늘 하루를 가볍게 시작하는 대시보드</dd>
          <dt>담긴 것</dt>
          <dd>날씨 · 운세 · 심리테스트 · 게임 · 내 기록</dd>
          <dt>만든 것</dt>
          <dd>Vue 3 · Vue Router · Pinia · Axios · Element Plus</dd>
          <dt>기록</dt>
          <dd>로그인한 브라우저에만 남고 서버로 나가지 않습니다</dd>
        </dl>
      </section>
    </div>
  </BaseDashboardCard>
</template>

<style scoped>
.settings {
  display: grid;
  gap: 20px;
}

.eyebrow {
  margin: 0 0 4px;
  color: var(--slate);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
}

h3 {
  margin: 0;
  color: var(--ink);
  font-size: 20px;
}

.lead {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}

.lead b {
  color: var(--ink-soft);
}

.section-label {
  margin: 0 0 10px;
  color: var(--faint);
  font-size: 12px;
  font-weight: 700;
}

/* ── 테마 고르기 ── */
.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.theme-card {
  display: grid;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--panel-strong);
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.theme-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgb(40 46 56 / 0.1);
}

.theme-card.active {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent);
}

/* ── 미리보기 (이 앱 화면을 축소한 그림) ── */
.preview {
  display: grid;
  gap: 7px;
  padding: 9px;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.06);
}

.p-nav {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 99px;
}

.p-tab {
  flex: 1;
  height: 9px;
  border-radius: 99px;
}

.p-card {
  display: grid;
  gap: 6px;
  padding: 10px;
  border-radius: 10px;
}

.p-line {
  width: 100%;
  height: 6px;
  border-radius: 99px;
}

.p-line.short {
  width: 58%;
}

.p-dot {
  width: 22px;
  height: 8px;
  border-radius: 99px;
}

/* ── 설명 ── */
.meta {
  display: grid;
  gap: 4px;
}

.name-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: baseline;
}

.name-row b {
  color: var(--ink);
  font-size: 14.5px;
  font-weight: 700;
}

.name-row small {
  color: var(--faint);
  font-size: 11.5px;
}

.badge {
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--accent-tint);
  color: var(--accent);
  font-size: 10.5px;
  font-weight: 700;
}

.desc {
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.6;
}

/* ── 이 사이트 ── */
.facts {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 8px 16px;
  margin: 0;
}

.facts dt {
  color: var(--faint);
  font-size: 12.5px;
  font-weight: 700;
}

.facts dd {
  margin: 0;
  color: var(--ink-soft);
  font-size: 13px;
  line-height: 1.6;
}

@media (prefers-reduced-motion: reduce) {
  .theme-card:hover {
    transform: none;
  }
}
</style>
