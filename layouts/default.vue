<template>
  <div class="w-screen min-h-screen flex flex-col gap-4">
    <AppHeader />
    <main class="flex-1 flex justify-center">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
<style scoped></style>
<script setup lang="ts">
import { useWechatForm } from '~/compasbles/useWechatForm'

const { model } = useWechatForm()
</script>
