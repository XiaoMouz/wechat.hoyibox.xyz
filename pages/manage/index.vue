<script setup lang="ts">
definePageMeta({
  title: '后台',
  middleware: 'auth',
})
</script>
<template>
  <div class="flex gap-6">
    <WechatGroupForm />
  </div>
</template>
