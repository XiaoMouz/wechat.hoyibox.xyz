<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'

const useIdFunction = () => useId()
const loading = ref(false)

useHead({
  script: [
    `(function () {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const setting = localStorage.getItem('color-schema') || 'auto'
      if (setting === 'dark' || (prefersDark && setting !== 'light'))
        document.documentElement.classList.toggle('dark', true)
    })()`,
  ],
})
useDark()

onMounted(() => {
  loading.value = true
})
</script>
<template>
  <ConfigProvider :use-id="useIdFunction">
    <Toaster />
    <div v-show="loading">
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <div v-show="!loading">
      <div
        class="flex items-center justify-center h-screen bg-white dark:bg-black"
      >
        <LoadingCycle
          class="border-gray-800 dark:border-gray-200"
          :size-class="`w-10 h-10`"
        />
      </div>
    </div>
  </ConfigProvider>
</template>
<style>
@import '@/assets/css/shadcn.css';
body {
  overflow-x: hidden;
} 
</style>
