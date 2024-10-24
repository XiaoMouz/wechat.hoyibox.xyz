<template>
  <div class="w-screen min-h-screen flex flex-col">
    <main
      class="mx-auto my-auto flex flex-col items-center gap-4 justify-center"
    >
      <div>下次一定，非常抱歉</div>
      <div>发生了一些问题，有点糟糕</div>
      <Button
        class="flex flex-row justify-center gap-1"
        @click="$router.push('/')"
        ><Icon name="mdi:home-circle-outline" class="size-5" />回到主页</Button
      >
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '啊哦',
})
</script>

<style scoped lang="css"></style>
