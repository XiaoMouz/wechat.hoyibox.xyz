<script setup lang="ts">
import { boolean } from 'zod'
import { useWechatForm } from '~/compasbles/useWechatForm'
import { ScrollArea } from '~/components/ui/scroll-area'
import { useToast } from '~/components/ui/toast'
import { columns } from '~/components/wechat/Tables/columns'
import { useWechatStore } from '~/store/group'
import type { WechatGroup } from '~/types/wechat-group.type'

preloadComponents('WechatDialogForm')

definePageMeta({
  title: '后台',
  middleware: 'auth',
})

useHead({
  title: '后台',
  meta: [
    {
      name: 'description',
      content: '后台管理',
    },
  ],
})
const { toast } = useToast()

const { createGroup, fetchGroups, deleteGroup, updateGroup } = useWechatStore()
const store = useWechatStore()
const res = await fetchGroups()
if (!res) {
  toast({
    title: '获取数据失败',
    description: '请刷新页面',
    variant: 'destructive',
  })
}
const { create, edit, model } = useWechatForm()

const groups = computed(() => store.groups)
</script>
<template>
  <div class="flex flex-col gap-6 max-w-[90dvw]">
    <Alert>
      <AlertTitle class="flex flex-row gap-2 items-center">
        <Icon
          name="mdi:alert-octagon-outline"
          class="size-5"
        />提请注意</AlertTitle
      >
      <AlertDescription>
        因微信机制原因，所有群组邀请只能通过扫码加入，不支持直接跳转，因此无感模式对于微信无效
      </AlertDescription>
    </Alert>

    <WechatDialogForm v-model="model" />
    <ScrollArea>
      <WechatTablesDataTable :columns="columns" :data="groups"
    /></ScrollArea>
  </div>
</template>
