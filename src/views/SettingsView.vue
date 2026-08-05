<script setup>
import BaseDashboardCard from '../components/weather/BaseDashboardCard.vue'
import CloverMark from '../final/components/CloverMark.vue'
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
            <!--
              색 조각을 늘어놓으면 보고서처럼 보인다.
              그 테마에서 이 앱이 어떤 공기인지 — 하늘 위에 카드 한 장이 떠 있는
              장면으로 보여 준다. 클로버는 그 테마의 강조색을 그대로 쓴다.
            -->
            <span
              class="preview"
              :style="{ background: `linear-gradient(160deg, ${theme.sky[0]}, ${theme.sky[1]})` }"
              aria-hidden="true"
            >
              <span class="p-sun" :style="{ background: theme.swatches[1] }" />

              <span class="p-card" :style="{ background: theme.swatches[1] }">
                <CloverMark :size="17" :style="{ color: theme.swatches[2] }" />
                <span class="p-lines">
                  <i :style="{ background: theme.swatches[3], opacity: 0.75 }" />
                  <i class="short" :style="{ background: theme.swatches[3], opacity: 0.28 }" />
                </span>
              </span>

              <span class="p-pill" :style="{ background: theme.swatches[2] }" />
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

/* ── 미리보기 (하늘 위에 뜬 카드 한 장면) ── */
.preview {
  position: relative;
  display: block;
  overflow: hidden;
  height: 92px;
  border-radius: 14px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.06);
}

/* 구름인지 해인지는 굳이 말하지 않는다. 밝은 기운 하나면 충분하다 */
.p-sun {
  position: absolute;
  top: -14px;
  right: -10px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  opacity: 0.55;
  filter: blur(6px);
}

.p-card {
  position: absolute;
  right: 14px;
  bottom: 16px;
  left: 14px;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 9px 11px;
  border-radius: 11px;
  box-shadow: 0 6px 14px rgb(20 30 45 / 0.16);
}

.p-lines {
  display: grid;
  gap: 4px;
  flex: 1;
}

.p-lines i {
  display: block;
  height: 5px;
  border-radius: 99px;
}

.p-lines i.short {
  width: 56%;
}

.p-pill {
  position: absolute;
  top: 12px;
  left: 14px;
  width: 34px;
  height: 9px;
  border-radius: 99px;
  opacity: 0.9;
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
