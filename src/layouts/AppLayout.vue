<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/ui/sidebar/AppSidebar.vue'
import { sidebarWidth } from '@/composables/useSidebarWidth'
</script>

<template>
  <SidebarProvider :style="{ '--sidebar-width': `${sidebarWidth}px` }">
    <AppSidebar />
    <main>
      <RouterView />
    </main>
  </SidebarProvider>
</template>
