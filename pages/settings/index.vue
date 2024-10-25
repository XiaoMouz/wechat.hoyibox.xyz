<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

useHead({
  title: '设置',
  meta: [
    {
      name: 'description',
      content: '这里什么也没有',
    },
  ],
})

preloadRouteComponents('/manage')
preloadRouteComponents('/login')
preloadRouteComponents('/logout')
</script>
<template>
  <div class="my-auto text-center">
    <Icon mode="svg" name="mdi:run-fast" class="mx-auto h-14 w-14" />
    <h1 class="text-2xl">
      这里什么也没有，因为海猫没有告诉我要设置什么于是乎我决定内设海猫
    </h1>
  </div>
</template>
