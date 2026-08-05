<script setup>
import { RouterView } from 'vue-router'

/**
 * 껍데기는 비워 둔다.
 *
 * 이 저장소는 결과물 하나만 담는다. 그래서 바깥에 헤더를 한 겹 더 두면
 * "브랜드 줄 + 메뉴 줄" 로 위계가 둘이 되고, 날씨 배경도 그 아래에서 잘린다.
 * 브랜드·메뉴·설정은 전부 final/index.vue 의 메뉴 하나가 맡고,
 * 여기서는 화면을 통째로 내어 준다.
 */
</script>

<template>
  <RouterView />
</template>
