<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import { ApiError } from '@/services/api/errors'
import { useAuthStore } from '@/services/stores/auth.store'
import { ref } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import { useRoute, useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const login = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value })

    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (error) {
    if (error instanceof ApiError) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Login failed due to an unexpected error.'
    }
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-muted/40">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>Entre com seu email e senha para fazer login.</CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="login" class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <Label for="email">Email:</Label>
            <Input type="email" id="email" name="email" required v-model="email" />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="password">Senha:</Label>
            <Input type="password" id="password" name="password" required v-model="password" />
          </div>

          <Button type="submit" class="w-full" :disabled="authStore.isLoading">{{
            authStore.isLoading ? 'Entrando...' : 'Login'
          }}</Button>

          <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>
          <p class="text-center text-sm text-muted-foreground">
            Ainda não tem uma conta?
            <RouterLink to="/register" class="text-primary underline underline-offset-4">
              Registrar
            </RouterLink>
          </p>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
