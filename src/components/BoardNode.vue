<script setup>
import { ref } from 'vue'

const x = ref(120)
const y = ref(120)

let offsetX = 0
let offsetY = 0

function startDrag(event) {
  offsetX = event.clientX - x.value
  offsetY = event.clientY - y.value

  window.addEventListener('pointermove', onDrag)
  window.addEventListener('pointerup', stopDrag)
}

function onDrag(event) {
  x.value = event.clientX - offsetX
  y.value = event.clientY - offsetY
}

function stopDrag() {
  window.removeEventListener('pointermove', onDrag)
  window.removeEventListener('pointerup', stopDrag)
}
</script>

<template>
  <div
    class="absolute flex flex-col rounded-xl bg-white shadow-md ring-1 ring-slate-900/5"
    :style="`top: ${y}px; left: ${x}px; width: 260px`"
  >
    <div
      class="flex cursor-grab items-center gap-2 rounded-t-xl px-3 py-2 active:cursor-grabbing"
      style="border-top: 3px solid #6366f1"
      @pointerdown="startDrag"
    >
      <span class="flex-1 truncate text-sm font-semibold text-slate-800"> Board Node Title </span>
    </div>

    <div class="flex flex-col gap-1 px-3 pb-3 pt-1 text-sm text-slate-700">
      <div>Item 1</div>
      <div>Item 2</div>
    </div>
  </div>
</template>
