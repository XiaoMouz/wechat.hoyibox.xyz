<script setup lang="ts">
definePageMeta({
  title: '后台',
  middleware: 'auth',
})
</script>
<template>
  <div class="flex gap-6">
    <WechatTables />
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline"> Edit Profile </Button>
      </DialogTrigger>
      <DialogContent class="md:min-w-[645px]">
        <WechatGroupForm />
      </DialogContent>
    </Dialog>
  </div>
</template>
