<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardContent from '@/components/ui/card/CardContent.vue'

import { ref } from 'vue'
import { useAuthStore } from '@/services/stores/auth.store'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const name = ref('')
const errorMessage = ref('')

const router = useRouter()
const authStore = useAuthStore()

const register = async () => {
  errorMessage.value = ''

  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
    })

    router.push('/boards')
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Failed to register. Please try again.'
    }
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-muted/40">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Registrar</CardTitle>
        <CardDescription>Por favor, preencha o formulário para criar uma conta.</CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="register" class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <Label for="name">Nome:</Label>
            <Input type="text" id="name" name="name" v-model="name" required />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="email">Email:</Label>
            <Input type="email" id="email" name="email" v-model="email" required />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="password">Senha:</Label>
            <Input type="password" id="password" name="password" v-model="password" required />
          </div>
          <Button type="submit" class="w-full" :disabled="authStore.isLoading">
            {{ authStore.isLoading ? 'Criando conta...' : 'Criar conta' }}
          </Button>

          <p class="text-center text-sm text-muted-foreground">
            Já tem uma conta?
            <RouterLink to="/login" class="text-primary underline underline-offset-4">
              Entrar
            </RouterLink>
          </p>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
