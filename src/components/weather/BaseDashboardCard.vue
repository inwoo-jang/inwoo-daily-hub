<template>
  <div class="base-dashboard-card">
    <slot></slot>
  </div>
</template>

<style scoped>
/*
 * 껍데기는 색을 거의 쓰지 않는다. 안에 들어올 내용이 주인공이기 때문.
 * 바탕은 화면 공통 판(--panel)을 쓴다 — 홈·운세와 같은 유리 느낌으로 맞춘다.
 */
.base-dashboard-card {
  padding: 22px;
  margin-bottom: 14px;
  border-radius: 18px;
  background: var(--panel);
  backdrop-filter: var(--panel-blur);
  -webkit-backdrop-filter: var(--panel-blur);
  box-shadow:
    0 1px 0 rgb(255 255 255 / 0.6) inset,
    0 10px 26px rgb(40 46 56 / 0.07);
}
</style>
