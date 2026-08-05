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
  /*
   * 아래 여백은 두지 않는다.
   * 카드 사이 간격은 기둥(.column)의 gap 이 정한다. 둘 다 있으면 화면마다
   * 간격이 달라 보인다 — 날씨만 유독 벌어져 있던 이유가 이것이었다.
   */
  border-radius: 18px;
  background: var(--panel);
  backdrop-filter: var(--panel-blur);
  -webkit-backdrop-filter: var(--panel-blur);
  box-shadow:
    0 1px 0 rgb(255 255 255 / 0.6) inset,
    0 10px 26px rgb(40 46 56 / 0.07);
}

/* 좁은 화면에서는 껍데기 여백부터 줄인다 — 안쪽 내용이 볼 자리를 더 갖도록 */
@media (max-width: 720px) {
  .base-dashboard-card {
    padding: 14px;
    border-radius: 16px;
  }
}
</style>