<script setup>
import BoardNode from './BoardNode.vue'
</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden bg-[#eef1f5]">
    <div
      class="relative h-full w-full"
      style="
        background-image: radial-gradient(circle, #c9d0da 1px, transparent 1px);
        background-size: 24px 24px;
      "
    >
      <BoardNode />
    </div>
  </div>
</template>
