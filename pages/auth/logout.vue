<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

definePageMeta({
  layout: 'auth',
  title: 'Log out',
})

useHead({
  title: '下海咯',
  meta: [
    {
      name: 'description',
      content: '登出',
    },
  ],
})

const { logUserOut } = useAuthStore()
const router = useRouter()
const countDown = ref(3)
onMounted(async () => {
  logUserOut()
  const token = useCookie('auth.token')
  token.value = null
  const timer = setInterval(() => {
    countDown.value--
    if (countDown.value === 0) {
      clearInterval(timer)
    }
  }, 1000)
  setTimeout(() => {
    router.push('/auth/login')
  }, 3000)
})
</script>
<template>
  <div class="my-auto text-center">
    <Icon mode="svg" name="mdi:run-fast" class="mx-auto h-14 w-14" />
    <h1 class="text-2xl">咕噜咕噜咕噜</h1>
    <span>你已经下海啦，距离回到登陆地还有 {{ countDown }} 秒</span>
  </div>
</template>
