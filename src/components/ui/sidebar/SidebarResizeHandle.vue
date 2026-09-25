<script setup lang="ts">
import { sidebarWidth, clampWidth } from '@/composables/useSidebarWidth'

let startX = 0
let startWidth = 0

const onPointerDown = (event: PointerEvent) => {
  startX = event.clientX
  startWidth = sidebarWidth.value
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
}

const onPointerMove = (event: PointerEvent) => {
  const delta = event.clientX - startX
  sidebarWidth.value = clampWidth(startWidth + delta)
}

const onPointerUp = () => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
}
</script>

<template>
  <div
    class="absolute right-0 top-0 z-20 h-full w-1 cursor-col-resize select-none hover:bg-sidebar-border active:bg-sidebar-border transition-colors"
    @pointerdown="onPointerDown"
  ></div>
</template>
