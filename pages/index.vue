<script setup lang="ts">
definePageMeta({
  title: 'Wechat QRCode',
  middleware: 'auth',
  layout: 'blank',
})
</script>
<template>
  <div
    class="w-screen min-h-screen flex flex-col relative bg-[#0000003b] h-full"
  >
    <AppHeader />
    <main class="flex-1 flex justify-center">
      <div class="bg-inner"></div>
      <div class="flex flex-col justify-center items-center gap-2 text-white">
        <span class="text-2xl">> _ <</span>
        <span>这里什么也没有</span>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
<style lang="css" scoped>
.bg-inner {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(/background.jpg) no-repeat center center;
  background-size: cover;
  z-index: -1;
}
</style>
