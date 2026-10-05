import { ref, watch } from 'vue'

const STORAGE_KEY = 'sidebar:width'
const DEFAULT_WIDTH = 256
const MIN_WIDTH = 200
const MAX_WIDTH = 400

const stored = Number(localStorage.getItem(STORAGE_KEY))
export const sidebarWidth = ref(stored || DEFAULT_WIDTH)

watch(sidebarWidth, (newWidth) => {
  localStorage.setItem(STORAGE_KEY, String(newWidth))
})

export function clampWidth(value: number) {
  return Math.min(MAX_WIDTH, Math.max(value, MIN_WIDTH))
}
