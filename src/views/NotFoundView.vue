<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section class="not-found">
    <p class="eyebrow">404</p>
    <h1>그런 페이지는 없습니다</h1>
    <p class="path">
      찾으신 주소 <code>{{ route.fullPath }}</code>
    </p>
    <p class="copy">주소를 잘못 입력했거나, 아직 만들지 않은 화면입니다.</p>

    <nav class="links">
      <RouterLink class="primary" to="/">홈으로</RouterLink>
      <RouterLink to="/learning">학습 &amp; 챌린지</RouterLink>
      <RouterLink to="/final">최종 결과물</RouterLink>
    </nav>
  </section>
</template>

<style scoped>
.not-found {
  padding: 80px 24px;
  text-align: center;
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--faint);
  font-family: var(--font-mono);
  font-size: 42px;
  font-weight: 800;
  letter-spacing: 0.04em;
}

h1 {
  margin: 0 0 14px;
  color: var(--ink);
  font-size: 26px;
  letter-spacing: -0.02em;
}

.path {
  margin: 0 0 6px;
  color: var(--muted);
  font-size: 13px;
}

.path code {
  padding: 2px 8px;
  border: 1px solid var(--line);
  border-radius: 5px;
  background: var(--surface);
  font-family: var(--font-mono);
  font-size: 12.5px;
}

.copy {
  margin: 0 0 26px;
  color: var(--muted);
  font-size: 13.5px;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.links a {
  padding: 9px 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  background: var(--surface);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}

.links a:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.links .primary {
  border-color: var(--accent);
  color: var(--on-accent);
  background: var(--accent);
}
</style>
