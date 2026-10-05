<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BoardNode from './components/BoardNode.vue'
import { boardService } from '@/services/boards/board.service'
import type { BoardWithNodes } from '@/services/boards/boards.types'

const route = useRoute()
const board = ref<BoardWithNodes | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const fetchBoard = async () => {
  isLoading.value = true
  error.value = null

  try {
    board.value = await boardService.find(route.params.id as string)
  } catch {
    error.value = 'Não foi possível carregar o board.'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchBoard)
</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden bg-[#eef1f5]">
    <div v-if="isLoading" class="flex h-full items-center justify-center">Carregando...</div>

    <div v-else-if="error" class="flex h-full items-center justify-center text-destructive">
      {{ error }}
    </div>

    <div
      v-else
      class="relative h-full w-full"
      style="
        background-image: radial-gradient(circle, #c9d0da 1px, transparent 1px);
        background-size: 24px 24px;
      "
    >
      <BoardNode
        v-for="node in board?.nodes"
        :key="node.id"
        :title="node.title"
        :type="node.type"
        :content="node.content"
        :coordinates="node.coordinates"
      />
    </div>
  </div>
</template>
