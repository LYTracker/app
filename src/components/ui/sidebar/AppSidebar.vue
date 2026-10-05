<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/services/stores/auth.store'
import { useRouter, useRoute } from 'vue-router'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Logout03Icon } from '@hugeicons/core-free-icons'
import { boardService } from '@/services/boards/board.service'
import { onMounted, ref } from 'vue'
import type { Board } from '@/services/boards/boards.types'
import SidebarResizeHandle from './SidebarResizeHandle.vue'
import NewBoardDialog from '@/components/boards/NewBoardDialog.vue'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const { state } = useSidebar()

const boards = ref<Board[]>([])

const fetchBoards = async () => {
  try {
    boards.value = await boardService.list()
  } catch (error) {
    console.error('Failed to fetch boards:', error)
  }
}

onMounted(fetchBoards)

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <Sidebar collapsible="icon" class="relative">
    <SidebarHeader class="flex-row items-center justify-between">
      <span class="px-2 text-lg font-semibold group-data-[collapsed=icon]:hidden">
        Life Planner
      </span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel class="flex items-center justify-between">
          Meus Boards
          <NewBoardDialog @created="fetchBoards" />
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="board in boards" :key="board.id">
              <SidebarMenuButton as-child :is-active="route.path === `/boards/${board.id}`">
                <RouterLink :to="`/boards/${board.id}`">
                  <span>{{ board.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton @click="handleLogout" tooltip="Sair">
            <HugeiconsIcon :icon="Logout03Icon" :size="18" />
            <span>Sair</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>

    <SidebarResizeHandle v-if="state === 'expanded'" />
  </Sidebar>
</template>
