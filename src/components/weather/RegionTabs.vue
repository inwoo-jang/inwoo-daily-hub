<script setup>
/**
 * 지역 선택 탭.
 * 어느 지역이 선택됐는지는 부모가 알고 있고(props),
 * 이 컴포넌트는 "눌렸다"고 알리기만 한다(emits).
 */
defineProps({
  regions: { type: Array, required: true },
  current: { type: String, default: '전체' },
  counts: { type: Object, default: () => ({}) },
})

defineEmits(['select-region'])
</script>

<template>
  <div class="tabs" role="tablist">
    <button
      v-for="region in ['전체', ...regions]"
      :key="region"
      type="button"
      role="tab"
      class="tab"
      :class="{ active: region === current }"
      :aria-selected="region === current"
      @click="$emit('select-region', region)"
    >
      {{ region }}
      <span v-if="counts[region]" class="count">{{ counts[region] }}</span>
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}

.tab {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  background: var(--panel-strong);
  cursor: pointer;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  transition:
    border-color 0.15s ease,
    color 0.15s ease,
    background 0.15s ease;
}

.tab:hover {
  border-color: var(--accent-line);
  color: var(--accent);
}

.tab.active {
  border-color: var(--accent);
  color: var(--on-accent);
  background: var(--accent);
}

.count {
  padding: 1px 6px;
  border-radius: 999px;
  background: var(--paper);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 700;
}

.tab.active .count {
  background: rgb(255 255 255 / 25%);
  color: var(--on-accent);
}

/*
 * 좁은 화면에서는 지역 칩이 네 줄까지 쌓여 화면 절반을 먹는다.
 * 한 줄로 두고 옆으로 굴리게 한다 — 목록을 보러 온 사람에게는
 * 지역 고르는 칸보다 목록이 먼저 보여야 한다.
 */
@media (max-width: 720px) {
  .tabs {
    /* 옆으로 굴릴 때는 폭을 못박아 둬야 부모를 밀어내지 않는다 */
    max-width: 100%;
    min-width: 0;
    flex-wrap: nowrap;
    overflow-x: auto;
    margin-bottom: 10px;
    padding-bottom: 2px;
    scrollbar-width: none;
  }

  .tabs::-webkit-scrollbar {
    display: none;
  }

  .tab {
    flex: none;
    padding: 6px 11px;
    font-size: 12.5px;
  }
}
</style>