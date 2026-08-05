<script setup>
/**
 * 네잎클로버 마크 — 이름표 옆에 붙는 그림.
 *
 * 사진을 쓰지 않고 도형으로 그린다. 작게 줄여도 뭉개지지 않고, 색을 글자와
 * 함께 바꿀 수 있기 때문이다(fill: currentColor).
 *
 * 잎 하나를 하트로 그린 뒤 90도씩 돌려 넷을 만든다. 그냥 겹치면 가운데가
 * 붙어 한 덩어리로 보여서, 잎마다 바깥으로 2 만큼 밀어 틈을 냈다.
 */
defineProps({
  size: { type: Number, default: 34 },
})

const LEAF =
  'M50 48 C 38 42 28 32 30 22 C 31 14 41 12 46 19 C 48 22 49 25 50 29 ' +
  'C 51 25 52 22 54 19 C 59 12 69 14 70 22 C 72 32 62 42 50 48 Z'

const ANGLES = [0, 90, 180, 270]
</script>

<template>
  <svg
    class="clover"
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    fill="currentColor"
    aria-hidden="true"
  >
    <!-- 줄기를 먼저 그려 잎 뒤로 보낸다 -->
    <path
      d="M52 52 C 57 66 63 74 74 80"
      fill="none"
      stroke="currentColor"
      stroke-width="5"
      stroke-linecap="round"
    />
    <path v-for="angle in ANGLES" :key="angle" :d="LEAF" :transform="`rotate(${angle} 50 50) translate(0 -2)`" />
  </svg>
</template>

<style scoped>
.clover {
  display: block;
  flex: none;
}
</style>
