<script setup lang="ts">
import { ref } from 'vue'

interface BoardNodeProps {
  title: string
  type: string
  content: any
  coordinates: { x: number; y: number }
}

const { title, type, content, coordinates } = defineProps<BoardNodeProps>()

const x = ref(coordinates.x)
const y = ref(coordinates.y)

let offsetX = 0
let offsetY = 0

function startDrag(event: PointerEvent) {
  offsetX = event.clientX - x.value
  offsetY = event.clientY - y.value

  window.addEventListener('pointermove', onDrag)
  window.addEventListener('pointerup', stopDrag)
}

function onDrag(event: PointerEvent) {
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
      <span class="flex-1 truncate text-sm font-semibold text-slate-800"> {{ title }} </span>
    </div>

    <div>{{ content }}</div>
  </div>
</template>
