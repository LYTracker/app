<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'
import { useAuthStore } from '@/services/stores/auth.store'
import { boardService } from '@/services/boards/board.service'

const emit = defineEmits<{ created: [] }>()

const open = ref(false)
const name = ref('')
const authStore = useAuthStore()
const isLoading = ref(false)

const handleSubmit = async () => {
  if (!name.value.trim()) return

  isLoading.value = true
  try {
    await boardService.create({ title: name.value, ownerId: authStore.user?.id! })
    name.value = ''
    open.value = false
    emit('created')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="ghost" size="sm">+</Button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Criar novo quadro</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <Label for="board-name">Nome</Label>
          <Input id="board-name" v-model="name" autofocus />
        </div>

        <DialogFooter>
          <Button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Criando...' : 'Criar' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
