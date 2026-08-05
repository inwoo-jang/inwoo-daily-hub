<script setup>
import { currentTheme, setTheme, THEMES } from '../utils/theme'
</script>

<template>
  <section class="page-intro">
    <p class="eyebrow">SETTINGS</p>
    <h1>환경 설정</h1>
    <p>
      화면 테마를 고를 수 있습니다. 고른 테마는 <strong>이 브라우저에 저장</strong>되어 다음에
      열어도 그대로 유지됩니다.
    </p>
  </section>

  <section class="block">
    <div class="block-head">
      <p class="eyebrow">APPEARANCE</p>
      <h2>테마</h2>
      <p class="block-desc">누르면 바로 적용됩니다. 실습 화면의 색은 각 실습 코드가 정한 대로 유지됩니다.</p>
    </div>

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
        <!-- 실제 색을 그대로 보여주는 미리보기 -->
        <span
          class="preview"
          :style="{ background: theme.swatches[0], borderColor: theme.swatches[3] + '22' }"
        >
          <i class="bar" :style="{ background: theme.swatches[1] }">
            <em :style="{ background: theme.swatches[2] }"></em>
          </i>
          <i class="line long" :style="{ background: theme.swatches[3], opacity: 0.85 }"></i>
          <i class="line" :style="{ background: theme.swatches[3], opacity: 0.35 }"></i>
          <i class="line mid" :style="{ background: theme.swatches[3], opacity: 0.35 }"></i>
          <i class="chip" :style="{ background: theme.swatches[2] }"></i>
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
    <div class="block-head">
      <p class="eyebrow">ABOUT</p>
      <h2>이 사이트</h2>
    </div>
    <dl class="facts">
      <dt>구성</dt>
      <dd>학습 &amp; 코드 챌린지 · 제출 과제 · 단계별 결과물 · 최종 결과물</dd>
      <dt>내용 출처</dt>
      <dd>Full-stack Engineering · Frontend Framework (Vue.js) 교안 276쪽</dd>
      <dt>내용 추가</dt>
      <dd><code>src/data/curriculum.js</code> 한 파일만 고치면 모든 화면에 반영됩니다</dd>
      <dt>가이드</dt>
      <dd><code>docs/CONTENT_GUIDE.md</code></dd>
    </dl>
  </section>
</template>

<style scoped>
.block {
  margin-bottom: 44px;
}

.block-head {
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 20px;
}

h2 {
  margin: 0;
  color: var(--ink);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.block-desc {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.7;
}

/* 테마 카드 */
.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 14px;
}

.theme-card {
  display: grid;
  gap: 14px;
  padding: 14px;
  border: var(--card-border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow);
  cursor: pointer;
  text-align: left;
}

.theme-card:hover {
  border-color: var(--accent);
}

.theme-card.active {
  border-color: var(--accent);
  box-shadow:
    var(--shadow),
    inset 0 0 0 1px var(--accent);
}

/* 미리보기 — 각 테마의 실제 색으로 미니 화면을 그린다 */
.preview {
  display: block;
  height: 108px;
  padding: 10px;
  overflow: hidden;
  border: 1px solid;
  border-radius: var(--radius);
}

.preview .bar {
  display: flex;
  align-items: center;
  height: 20px;
  margin-bottom: 12px;
  padding: 0 7px;
  border-radius: calc(var(--radius) - 2px);
}

.preview .bar em {
  display: block;
  width: 22px;
  height: 6px;
  border-radius: 3px;
}

.preview .line {
  display: block;
  height: 6px;
  margin-bottom: 7px;
  border-radius: 3px;
}

.preview .line.long {
  width: 78%;
  height: 9px;
}

.preview .line.mid {
  width: 55%;
}

.preview .chip {
  display: block;
  width: 42px;
  height: 14px;
  border-radius: calc(var(--radius) - 1px);
}

/* 설명 */
.meta {
  display: grid;
  gap: 6px;
}

.name-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.name-row b {
  color: var(--ink);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.name-row small {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 11px;
}

.badge {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 20px;
  color: var(--on-accent);
  background: var(--accent);
  font-size: 10.5px;
  font-weight: 800;
  white-space: nowrap;
}

.desc {
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.7;
}

/* 정보 목록 */
.facts {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 10px 22px;
  margin: 0;
}

dt {
  color: var(--faint);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

dd {
  margin: 0;
  color: var(--ink-soft);
  font-size: 13.5px;
  line-height: 1.6;
}

code {
  padding: 1px 6px;
  border: 1px solid var(--line);
  border-radius: 3px;
  color: var(--accent);
  background: var(--surface);
  font-family: var(--font-mono);
  font-size: 12px;
}

@media (max-width: 520px) {
  .facts {
    grid-template-columns: 1fr;
    gap: 3px 0;
  }

  dd {
    margin-bottom: 12px;
  }
}
</style>
